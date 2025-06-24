const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const LOCAL_API = 'http://localhost:3001/api';

// Получить топ-20 монет по капитализации
export async function fetchTopCoins() {
  const url = `${LOCAL_API}/coins`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Ошибка загрузки топ-20 монет');
  return res.json();
}

// Получить исторические данные для графика (например, за 7 дней)
export async function fetchCoinHistory(coinId, days = 7, interval) {
  let url = `${LOCAL_API}/coin-history/${coinId}?days=${days}`;
  if (interval) url += `&interval=${interval}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Ошибка загрузки истории монеты');
  return res.json();
} 