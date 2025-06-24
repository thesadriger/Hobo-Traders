// MainSectionGraphic.js
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Spin } from 'antd';
import styled, { keyframes, css } from 'styled-components';
import Graphic from './Graphic';
import { useSelector, useDispatch } from 'react-redux';
import { updateTotalWinnings } from '@/store/slices/totalWinningsSlice';
import { addUSDT } from '@/store/slices/balanceSlice';
import {
  decreaseHealth,
  decreaseFun,
  decreaseFood,
  resetIndicators, // Импортируем действие сброса индикаторов
} from '@/store/slices/indicatorsSlice';
import { increaseLevel } from '@/store/slices/levelSlice'; // Для увеличения уровня
import TradeButton from '@/components/Pages/Elements/TradeButton';
import { setCoinPrice, setDailyPrice } from '@/store/slices/coinPricesSlice';
import { fetchCoinHistory } from './coinGeckoService';
import { setCoinHistory, addCoinHistoryPoint } from '@/store/slices/coinHistorySlice';

// Контейнер для всей информации сверху
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Левая часть информации
const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// Правая часть информации
const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    align-items: flex-start;
    margin-top: 10px;
  }
`;

// Название монеты
const CoinName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.primaryText};
`;

// Подзаголовок "Цена последней сделки"
const LastPriceLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-top: 5px;
`;

// Новый компонент для плавной анимации цены
const PriceText = React.memo(function PriceText({ coinId }) {
  const price = useSelector(state => state.coinPrices[coinId]);
  const [displayPrice, setDisplayPrice] = useState(price);
  const rafRef = useRef();

  useEffect(() => {
    if (typeof price !== 'number') return;
    let start;
    let prev = displayPrice;
    const duration = 400; // мс, длительность анимации
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const next = prev + (price - prev) * progress;
      setDisplayPrice(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayPrice(price);
      }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line
  }, [price]);

  return (
    <span style={{marginLeft: 16, fontWeight: 500, color: '#4caf50'}}>
      ${Number(displayPrice).toFixed(2)}
    </span>
  );
});

// Стиль для правой части информации
const InfoText = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.extraSmall};
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 5px;
`;

const InfoValue = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.sizes.extraSmall};
`;

// Контейнер для графика и кнопки
const MainGraphicContainer = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 420px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.5rem 1rem;
  box-shadow: ${({ theme }) => theme.shadows.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
  @media (max-width: 600px) {
    min-width: 90vw;
    max-width: 90vw;
    padding: 0.5rem 0.5rem;
    margin-bottom: 8px;
  }
`;

const CHART_HEIGHT = 220;

// Новый ChartFlexWrapper для графика (фиксированная высота)
const ChartFlexWrapper = styled.div`
  width: 100%;
  height: ${CHART_HEIGHT}px;
  display: flex;
  margin-bottom: 8px;
`;

// Стили для контейнера графика
const GraphContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    aspect-ratio: auto;
    height: 200px;
  }
`;

// Анимация пульсации кнопки
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${({ theme }) => theme.colors.pulseShadow};
  }
  70% {
    box-shadow: 0 0 0 10px rgba(64, 169, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(64, 169, 255, 0);
  }
`;


// Стили для текста с выигрышем
const RandomText = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${({ theme }) => theme.fonts.sizes.extraLarge};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.priceText};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    font-size: 32px;
  }
`;

// Скелетон shimmer для графика
const Shimmer = styled.div`
  width: 100%;
  height: ${CHART_HEIGHT}px;
  border-radius: 16px;
  background: linear-gradient(90deg, #23242a 25%, #2c2e36 50%, #23242a 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite linear;
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// Fade-in для плавного появления графика
const FadeIn = styled.div`
  opacity: 0;
  transition: opacity 0.5s;
  ${({ $visible }) => $visible && css`opacity: 1;`}
`;

// Функция для форматирования баланса с суффиксами
const formatBalance = (number) => {
  if (number >= 1_000_000_000_000) {
    return `${(number / 1_000_000_000_000).toFixed(2)}КB$`;
  } else if (number >= 1_000_000_000) {
    return `${(number / 1_000_000_000).toFixed(2)}B$`;
  } else if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(2)}M$`;
  } else if (number >= 1_000) {
    return `${(number / 1_000).toFixed(2)}K$`;
  } else {
    return `${number}$`;
  }
};

// Функция для генерации случайного уменьшения с заданными вероятностями
const getRandomDeduction = () => {
  const rand = Math.random();
  if (rand < 0.6) {
    // 60% шанс отнять 1-3 единицы
    return Math.floor(Math.random() * 3) + 1;
  } else if (rand < 0.9) {
    // 30% шанс отнять 4-6 единиц
    return Math.floor(Math.random() * 3) + 4;
  } else {
    // 10% шанс отнять 7-10 единиц
    return Math.floor(Math.random() * 4) + 7;
  }
};

// Преобразование истории CoinGecko в формат для графика
function formatHistoryData(apiData) {
  if (!apiData || !Array.isArray(apiData.prices)) return [];
  return apiData.prices.map(([timestamp, price]) => ({
    time: timestamp,
    price: Number(price)
  }));
}

const N = 200;
const ANIMATION_STEPS = 20; // сколько точек за секунду (чем больше — тем плавнее)
const ANIMATION_INTERVAL = 1000 / ANIMATION_STEPS; // мс между точками

const EMPTY_ARRAY = [];
const MainSectionGraphic = ({ coinId, coinName, coinSymbol, coinImage, index }) => {
  const dispatch = useDispatch();
  const price = useSelector(state => state.coinPrices[coinId]);
  const history = useSelector(state => state.coinHistory?.[coinId] || EMPTY_ARRAY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tradeResult, setTradeResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showGraphic, setShowGraphic] = useState(false);
  const [chartDataForRender, setChartDataForRender] = useState([]);
  const lastCoinId = useRef();
  const lastPriceRef = useRef();

  // Получаем исторические данные только при смене coinId
  useEffect(() => {
    if (lastCoinId.current === coinId && history.length > 0) return;
    lastCoinId.current = coinId;
    setLoading(true);
    fetchCoinHistory(coinId, 1)
      .then(data => {
        const formatted = formatHistoryData(data);
        dispatch(setCoinHistory({ coinId, history: formatted.length > N ? formatted.slice(-N) : formatted }));
        lastPriceRef.current = formatted.length ? formatted[formatted.length - 1].price : price;
      })
      .catch(e => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [coinId, dispatch]);

  // При каждом обновлении цены добавляем новую точку (раз в секунду)
  useEffect(() => {
    if (!history.length || typeof price !== 'number') return;
    if (lastCoinId.current !== coinId) return;
    const lastPoint = history.length > 0 ? history[history.length - 1] : null;
    if (lastPoint && Math.abs(lastPoint.price - price) < 1e-8) return;
    if (!lastPoint) return; // не добавлять точку если нет истории
    const newPoint = { ...lastPoint, time: Date.now(), price };
    dispatch(addCoinHistoryPoint({ coinId, point: newPoint, maxLength: N }));
    lastPriceRef.current = price;
    // eslint-disable-next-line
  }, [price, coinId, dispatch, history]);

  // Плавное движение графика: сдвиг time у всех точек
  useEffect(() => {
    let frame;
    function animate() {
      const now = Date.now();
      const base = history;
      if (!base || base.length === 0) {
        setChartDataForRender([]);
        frame = requestAnimationFrame(animate);
        return;
      }
      const lastTime = base[base.length - 1].time;
      const delta = now - lastTime;
      const shifted = base.map(pt => ({ ...pt, time: pt.time - delta }));
      setChartDataForRender(shifted);
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [coinId, history]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowGraphic(true), 200 + (index || 0) * 100);
    return () => clearTimeout(timeout);
  }, [index]);

  if (loading || !chartDataForRender || chartDataForRender.length === 0) {
    return <MainGraphicContainer>Загрузка графика...</MainGraphicContainer>;
  }
  if (error) return <MainGraphicContainer>Ошибка: {error}</MainGraphicContainer>;

  // Логика торговли
  const handleTrade = () => {
    let profit = 0;
    let risk = 0;
    let message = '';
    if (coinSymbol === 'btc') {
      risk = 0.1;
      if (Math.random() < risk) {
        profit = -Math.round(price * 0.01);
        message = `-${Math.abs(profit)} USDT`;
      } else {
        profit = Math.round(price * 0.015);
        message = `+${profit} USDT`;
      }
    } else if (coinSymbol === 'eth') {
      risk = 0.2;
      if (Math.random() < risk) {
        profit = -Math.round(price * 0.015);
        message = `-${Math.abs(profit)} USDT`;
      } else {
        profit = Math.round(price * 0.02);
        message = `+${profit} USDT`;
      }
    } else {
      const cap = 1;
      const minCap = 1e9, maxCap = 2e12;
      const norm = Math.max(0, Math.min(1, 1 - (cap - minCap) / (maxCap - minCap)));
      risk = 0.25 + norm * 0.45;
      if (Math.random() < risk) {
        profit = -Math.round(price * (0.01 + norm * 0.09));
        message = `-${Math.abs(profit)} USDT`;
      } else {
        profit = Math.round(price * (0.02 + norm * 0.18));
        message = `+${profit} USDT`;
      }
    }
    setTradeResult({ profit, message });
    setShowResult(true);
    setTimeout(() => setShowResult(false), 2000);
  };

  return (
    <MainGraphicContainer>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: 8, width: '100%'}}>
        <img src={coinImage} alt={coinSymbol} style={{width: 28, marginRight: 10}}/>
        <b>{coinName} ({coinSymbol.toUpperCase()})</b>
        <PriceText coinId={coinId} />
      </div>
      {/* <div style={{fontSize: 12, color: '#888', width: '100%', marginBottom: 2}}>Данные для графика: {history.length} точек</div> */}
      {/* График курса монеты */}
      <ChartFlexWrapper>
        {!showGraphic || loading ? (
          <Shimmer />
        ) : chartDataForRender.length > 0 ? (
          <Graphic data={chartDataForRender} visible={showGraphic && !loading && chartDataForRender.length > 0} />
        ) : (
          <div style={{textAlign: 'center', color: '#aaa'}}>Нет данных для графика</div>
        )}
        {/* Анимация результата торговли */}
        {showResult && tradeResult && (
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: tradeResult.profit >= 0 ? 'rgba(76, 175, 80, 0.95)' : 'rgba(229, 57, 53, 0.95)',
            color: '#fff',
            padding: '18px 32px',
            borderRadius: 16,
            fontSize: 28,
            fontWeight: 700,
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
            zIndex: 10,
            opacity: showResult ? 1 : 0,
            transition: 'opacity 0.5s',
            pointerEvents: 'none',
          }}>
            {tradeResult.message}
          </div>
        )}
      </ChartFlexWrapper>
      {/* Кнопка Торговать */}
      {coinSymbol !== 'usdt' && (
        <TradeButton style={{width: '100%', marginTop: 8, marginBottom: 0}} onClick={handleTrade}>
          Торговать
        </TradeButton>
      )}
    </MainGraphicContainer>
  );
};

function areEqual(prevProps, nextProps) {
  // Перерисовывать только если coinId, coinName, coinSymbol, coinImage, index изменились
  return prevProps.coinId === nextProps.coinId &&
    prevProps.coinName === nextProps.coinName &&
    prevProps.coinSymbol === nextProps.coinSymbol &&
    prevProps.coinImage === nextProps.coinImage &&
    prevProps.index === nextProps.index;
}

export { PriceText };
export default React.memo(MainSectionGraphic, areEqual);
