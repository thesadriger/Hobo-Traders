const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

let cache = null;
let cacheTime = 0;
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 часа

// Кеш для истории монет
const historyCache = {};
const HISTORY_CACHE_DURATION = 30 * 60 * 1000; // 30 минут
let lastCoinsRequest = 0;
const MIN_REQUEST_INTERVAL = 10 * 1000; // 10 секунд

// Моковые данные для монет (пример)
const MOCK_COINS = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 105000,
    price_change_percentage_24h: 1.23,
    market_cap: 2000000000000,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 2500,
    price_change_percentage_24h: -0.45,
    market_cap: 400000000000,
  },
  {
    id: 'xrp',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 2.17,
    price_change_percentage_24h: 0.12,
    market_cap: 100000000000,
  },
];
// Моковые данные для истории (пример: 200 точек)
const MOCK_HISTORY = {
  prices: Array.from({length: 200}, (_, i) => [Date.now() - (200 - i) * 60 * 1000, 105000 + Math.sin(i / 10) * 1000 + Math.random() * 200]),
};

// Инициализация кеша монет при старте backend
async function initCoinCache() {
  // Если есть хоть какой-то кеш — не делаем запрос
  if (cache) {
    console.log('Кеш монет уже есть, не инициализируем заново');
    return;
  }
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      cache = data;
      cacheTime = Date.now();
      console.log('Кеш монет успешно инициализирован при старте backend');
    } else {
      console.warn('Не удалось инициализировать кеш монет при старте backend:', data);
    }
  } catch (e) {
    console.warn('Ошибка инициализации кеша монет при старте backend:', e);
  }
}

app.get('/api/coins', async (req, res) => {
  const now = Date.now();
  // Если кеш есть и не устарел — отдаём его
  if (cache && now - cacheTime < CACHE_DURATION) {
    return res.json(cache);
  }
  // Если с последнего запроса прошло меньше 10 секунд — отдаём даже устаревший кеш
  if (cache && now - lastCoinsRequest < MIN_REQUEST_INTERVAL) {
    return res.json(cache);
  }
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await response.json();
    cache = data;
    cacheTime = now;
    lastCoinsRequest = now;
    res.json(data);
  } catch (e) {
    console.error('CoinGecko error:', e);
    if (cache) {
      // Если есть старый кеш — возвращаем его даже если он устарел
      return res.json(cache);
    }
    // Если нет кеша — отдаём моковые данные
    return res.json(MOCK_COINS);
  }
});

app.get('/api/coin-history/:id', async (req, res) => {
  const { id } = req.params;
  let { days = 7, interval } = req.query;
  days = Number(days);
  // Автоматически подбираем корректный interval
  if (days <= 1) interval = 'minute';
  else if (days <= 90) interval = 'hourly';
  else interval = 'daily';
  let url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  if (interval) url += `&interval=${interval}`;
  const now = Date.now();
  if (
    historyCache[id] &&
    now - historyCache[id].cacheTime < HISTORY_CACHE_DURATION &&
    historyCache[id].data &&
    historyCache[id].days == days &&
    historyCache[id].interval == interval
  ) {
    return res.json(historyCache[id].data);
  }
  // Если с последнего запроса по этой монете прошло меньше 10 секунд — отдаём даже устаревший кеш
  if (historyCache[id] && now - historyCache[id].cacheTime < MIN_REQUEST_INTERVAL && historyCache[id].data && historyCache[id].days == days && historyCache[id].interval == interval) {
    return res.json(historyCache[id].data);
  }
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await response.json();
    if (data && Array.isArray(data.prices)) {
      historyCache[id] = { data, cacheTime: now, days, interval };
      res.json(data);
    } else {
      // Если CoinGecko вернул ошибку, но есть старый кеш — отдаём его
      if (historyCache[id] && historyCache[id].data) {
        return res.json(historyCache[id].data);
      }
      // Если нет кеша — отдаём моковые данные
      return res.json(MOCK_HISTORY);
    }
  } catch (e) {
    console.error('CoinGecko history error:', e);
    if (historyCache[id] && historyCache[id].data) {
      return res.json(historyCache[id].data);
    }
    // Если нет кеша — отдаём моковые данные
    return res.json(MOCK_HISTORY);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend запущен на http://localhost:${PORT}`);
  initCoinCache();
}); 