// MainSectionGraphic.js
import React, { useState, useEffect } from 'react';
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

// Контейнер для всей информации сверху
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    align-items: flex-start;
    margin-top: 10px;
  }
`;

// Название монеты
const CoinName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #181818;
`;

// Подзаголовок "Цена последней сделки"
const LastPriceLabel = styled.span`
  font-size: 14px;
  color: #999;
  margin-top: 5px;
`;

// Цена
const PriceText = styled.span`
  font-size: 40px;
  font-weight: bold;
  color: #4096ff;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

// Стиль для правой части информации
const InfoText = styled.span`
  font-size: 12px;
  color: #181818;
  margin-bottom: 5px;
`;

const InfoValue = styled.span`
  font-weight: bold;
  font-size: 12px;
`;

// Контейнер для графика и кнопки
const MainGraphicContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Стили для контейнера графика
const GraphContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    aspect-ratio: auto;
    height: 200px;
  }
`;

// Анимация пульсации кнопки
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(64, 169, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(64, 169, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(64, 169, 255, 0);
  }
`;

// Стили для кнопки "Торговать"
const TradeButton = styled(Button)`
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  transition: all 0.5s ease-in-out;

  ${({ isAnimating }) =>
    isAnimating &&
    css`
      animation: ${pulseAnimation} 2s infinite;
    `}

  @media (max-width: 768px) {
    height: 45px;
    font-size: 14px;
  }
`;

// Стили для текста с выигрышем
const RandomText = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  font-weight: bold;
  color: #4096ff;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 32px;
  }
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

// Основной компонент
const MainSectionGraphic = ({ coinKey, coinData }) => {
  const { title, range, initialPrice, maxWin } = coinData;

  const dispatch = useDispatch();
  const level = useSelector((state) => state.level.level);
  const totalWinnings = useSelector(
    (state) => state.totalWinnings.totalWinningsPerCoin[coinKey] || 0
  );

  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [intervalSpeed, setIntervalSpeed] = useState(1000);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isTradeActive, setIsTradeActive] = useState(false);
  const [randomValue, setRandomValue] = useState(null);
  const [isTextVisible, setIsTextVisible] = useState(false);

  // Для максимальной и минимальной цены
  const [maxPrice, setMaxPrice] = useState(initialPrice);
  const [minPrice, setMinPrice] = useState(initialPrice);

  useEffect(() => {
    setCurrentPrice(initialPrice);
    setMaxPrice(initialPrice);
    setMinPrice(initialPrice);
  }, [initialPrice]);

  const handleTradeClick = () => {
    setIsButtonDisabled(true);
    setIsTradeActive(true);
    setIntervalSpeed(200);

    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * maxWin) + 1;
      setRandomValue(`+${randomNum} $`);
      dispatch(updateTotalWinnings({ coinKey, amount: randomNum }));
      dispatch(addUSDT(randomNum)); // Обновляем баланс USDT
      setIsTextVisible(true);

      // Уменьшаем индикаторы
      const healthDeduction = getRandomDeduction();
      const funDeduction = getRandomDeduction();
      const foodDeduction = getRandomDeduction();

      dispatch(decreaseHealth(healthDeduction));
      dispatch(decreaseFun(funDeduction));
      dispatch(decreaseFood(foodDeduction));

      // Получаем предыдущее значение уровня
      const previousLevel = level;

      const increment = 0.05;
      dispatch(increaseLevel(increment));
    
      // Получаем новое значение уровня с учётом округления
      const newLevel = parseFloat((previousLevel + increment).toFixed(2));
    
      // Проверяем, перешёл ли уровень на новое целое число
      if (Math.floor(newLevel + 0.0001) > Math.floor(previousLevel + 0.0001)) {
        dispatch(resetIndicators());
      }
    }, 1000);

    setTimeout(() => {
      setIntervalSpeed(1000);
      setIsTradeActive(false);
      setIsButtonDisabled(false);
      setIsTextVisible(false);
    }, 3000);
  };

  // Функция для обновления максимальной и минимальной цены
  const updatePriceExtremes = (price) => {
    setMaxPrice((prevMax) => (price > prevMax ? price : prevMax));
    setMinPrice((prevMin) => (price < prevMin ? price : prevMin));
  };

  // Получаем отформатированные значения
  const formattedTotalWinnings = formatBalance(totalWinnings);
  const formattedRandomValue = randomValue
    ? `+${formatBalance(parseFloat(randomValue.replace('+', '').replace('$', '')))}`
    : '';

  return (
    <MainGraphicContainer>
      <InfoContainer>
        <LeftInfo>
          <CoinName>{title}</CoinName>
          <LastPriceLabel>Цена последней сделки:</LastPriceLabel>
          <PriceText>{`$${parseFloat(currentPrice).toFixed(2)}`}</PriceText>
        </LeftInfo>
        <RightInfo>
          <InfoText>
            Максимальная цена:{' '}
            <InfoValue>{`$${parseFloat(maxPrice).toFixed(2)}`}</InfoValue>
          </InfoText>
          <InfoText>
            Минимальная цена:{' '}
            <InfoValue>{`$${parseFloat(minPrice).toFixed(2)}`}</InfoValue>
          </InfoText>
          <InfoText>
            Оборот торговли:{' '}
            <InfoValue>{formattedTotalWinnings}</InfoValue>
          </InfoText>
        </RightInfo>
      </InfoContainer>
      <GraphContainer>
        <Graphic
          setCurrentPrice={(price) => {
            setCurrentPrice(price);
            updatePriceExtremes(price);
          }}
          intervalSpeed={intervalSpeed}
          isTradeActive={isTradeActive}
          initialPrice={initialPrice}
          range={range}
        />
        {randomValue && (
          <RandomText isVisible={isTextVisible}>{formattedRandomValue}</RandomText>
        )}
      </GraphContainer>
      <TradeButton
        type="primary"
        onClick={handleTradeClick}
        disabled={isButtonDisabled}
        isAnimating={isTradeActive}
      >
        {isTradeActive ? <Spin /> : 'Торговать'}
      </TradeButton>
    </MainGraphicContainer>
  );
};

export default MainSectionGraphic;
