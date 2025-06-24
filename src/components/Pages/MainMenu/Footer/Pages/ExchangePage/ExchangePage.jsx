// ExchangePage.js
import React, { useEffect, useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import MainSectionGraphic, { PriceText } from './MainSectionGraphic';
import { CoinsList } from './CoinList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopCoins } from './coinGeckoService';
import { FixedSizeList as List } from 'react-window';
import { setMultipleCoinPrices } from '@/store/slices/coinPricesSlice';

// Стили для страницы
const PageWrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.pageBackground};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 110px;
  @media (max-width: 600px) {
    padding-bottom: 95px;
  }
`;

// Обертка для графиков
const GraphicWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.large};
  gap: 0.1rem;
  padding: ${({ theme }) => theme.sizes.paddingSmall};
  padding-bottom: 110px;
  @media (max-width: 600px) {
    padding-bottom: 95px;
  }
`;

// Новый компонент бегущей строки
const MarqueeWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.indicatorBackground || '#e0eafc'};
  color: ${({ theme }) => theme.colors.primaryText || '#333'};
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  margin-bottom: 18px;
  box-shadow: 0 2px 8px rgba(80, 120, 200, 0.08);
  position: relative;
  height: 2.2em;
  display: flex;
  align-items: center;
`;

const MarqueeInner = styled.div`
  display: inline-block;
  padding-left: 100%;
  animation: marquee 32s linear infinite;
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
`;

const Marquee = ({ coins }) => {
  return (
    <MarqueeWrapper>
      <MarqueeInner>
        {coins.map((coin) => {
          const percent = coin.price_change_percentage_24h;
          const isUp = percent >= 0;
          return (
            <span key={coin.id} style={{ marginRight: 40 }}>
              <img src={coin.image} alt={coin.symbol} style={{width: 18, verticalAlign: 'middle', marginRight: 6}}/>
              {coin.name} ({coin.symbol.toUpperCase()}): <b>{Number(coin.current_price).toFixed(2)}</b>
              <span style={{
                color: isUp ? '#4caf50' : '#e53935',
                marginLeft: 8,
                fontWeight: 500
              }}>
                {isUp ? '+' : ''}{percent ? percent.toFixed(2) : '0.00'}%
              </span>
            </span>
          );
        })}
      </MarqueeInner>
    </MarqueeWrapper>
  );
};

const HIDDEN_COINS = [
  'tether', // USDT
  'usdc',   // USDC
  'staked-ether', // Lido Staked Ether (STETH)
  'wrapped-bitcoin', // WBTC
  'wrapped-steth', // WSTETH
  'bitcoin-cash', // BCH
];

const ExchangePage = () => {
  const dispatch = useDispatch();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const stableCoinsRef = useRef([]); // для стабильных объектов
  const historiesRef = useRef({}); // для хранения истории по coinId

  // Получаем реальные данные раз в минуту
  useEffect(() => {
    fetchTopCoins()
      .then(data => {
        if (Array.isArray(data)) {
          setCoins(data);
          // Сохраняем цены в coinPricesSlice
          const prices = {};
          data.forEach(coin => { prices[coin.id] = coin.current_price; });
          dispatch(setMultipleCoinPrices(prices));
        } else {
          setError('Ошибка загрузки монет');
        }
      })
      .catch(e => setError('Ошибка загрузки монет'))
      .finally(() => setLoading(false));
    const interval = setInterval(() => {
      fetchTopCoins().then(data => {
        if (Array.isArray(data)) {
          setCoins(data);
          const prices = {};
          data.forEach(coin => { prices[coin.id] = coin.current_price; });
          dispatch(setMultipleCoinPrices(prices));
        } else {
          setError('Ошибка загрузки монет');
        }
      });
    }, 60000); // 1 минута
    return () => clearInterval(interval);
  }, [dispatch]);

  // Анимация изменения цен каждую секунду (только на фронте)
  useEffect(() => {
    if (!Array.isArray(coins) || coins.length === 0) return;
    const interval = setInterval(() => {
      const prices = {};
      coins.forEach((coin, idx) => {
        const base = coin.current_price;
        const delta = (Math.random() - 0.5) * base * 0.002; // до ±0.2%
        const newPrice = Math.max(0, base + delta);
        prices[coin.id] = newPrice;
      });
      dispatch(setMultipleCoinPrices(prices));
    }, 1000);
    return () => clearInterval(interval);
  }, [coins, dispatch]);

  // Стабилизируем объекты монет по coinId
  const filteredCoins = useMemo(() => {
    const prevMap = Object.fromEntries((stableCoinsRef.current || []).map(c => [c.id, c]));
    const next = coins.filter(coin => !HIDDEN_COINS.includes(coin.id)).map(coin => {
      if (prevMap[coin.id]) {
        return { ...prevMap[coin.id], ...coin };
      }
      return coin;
    });
    stableCoinsRef.current = next;
    return next;
  }, [coins]);

  if (loading) return <PageWrapper>Загрузка...</PageWrapper>;
  if (error) return <PageWrapper>Ошибка: {error}</PageWrapper>;
  if (!Array.isArray(filteredCoins)) return <PageWrapper>Ошибка загрузки монет</PageWrapper>;

  // Высота одной карточки (можно скорректировать под твой дизайн)
  const CARD_HEIGHT = 420;

  return (
    <PageWrapper>
      <Marquee coins={filteredCoins} />
      <GraphicWrapper style={{height: `${Math.min(filteredCoins.length, 4) * CARD_HEIGHT}px`, width: '100%'}}>
        <List
          height={Math.min(filteredCoins.length, 4) * CARD_HEIGHT}
          itemCount={filteredCoins.length}
          itemSize={CARD_HEIGHT}
          width={'100%'}
          itemKey={index => filteredCoins[index].id}
        >
          {({ index, style }) => (
            <div style={style}>
              <MainSectionGraphic
                coinId={filteredCoins[index].id}
                coinName={filteredCoins[index].name}
                coinSymbol={filteredCoins[index].symbol}
                coinImage={filteredCoins[index].image}
                index={index}
                historiesRef={historiesRef}
              />
            </div>
          )}
        </List>
      </GraphicWrapper>
    </PageWrapper>
  );
};

export default ExchangePage;
