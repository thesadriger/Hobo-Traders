// MainSectionGraphic.jsx
import React, { useState } from 'react';
import { Row, Col, Button } from 'antd'; // Компоненты Ant Design
import styled, { keyframes, css } from 'styled-components';
import Graphic from './Graphic'; // Импортируем компонент графика

// Стили для обёртки заголовка и цены
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
`;

// Стили для текста цены
const PriceText = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #389e0d;
`;

// Стили для заголовка
const TitleText = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #181818;
`;

// Анимация змейки на бордере
const snakeAnimation = keyframes`
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
`;

// Стили для кнопки "Торговать" с анимацией змейки на бордере
const TradeButton = styled(Button)`
  position: relative;
  overflow: hidden;
  z-index: 0;
  margin-top: 20px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  background-color: #40a9ff;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #1890ff;
  }
  &:disabled {
    background-color: #d9d9d9;
    color: #bfbfbf;
  }
  ${({ isAnimating }) =>
    isAnimating &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(
          to right,
          #52c41a,
          #40a9ff,
          #52c41a,
          #40a9ff,
          #52c41a
        );
        background-size: 200% auto;
        z-index: -1;
        animation: ${snakeAnimation} 4s linear infinite;
      }
    `}
`;

// Стили для текста с выигрышем
const RandomText = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  font-weight: bold;
  color: #389e0d;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

// Основной компонент
const MainSectionGraphic = () => {
  const [currentPrice, setCurrentPrice] = useState(1.0); // Текущая цена
  const [intervalSpeed, setIntervalSpeed] = useState(1000); // Скорость обновления графика
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Состояние кнопки
  const [isTradeActive, setIsTradeActive] = useState(false); // Активность анимации на графике
  const [randomValue, setRandomValue] = useState(null); // Случайное число выигрыша
  const [isTextVisible, setIsTextVisible] = useState(false); // Видимость текста с выигрышем

  // Функция обработки нажатия на кнопку "Торговать"
  const handleTradeClick = () => {
    setIsButtonDisabled(true); // Отключаем кнопку
    setIsTradeActive(true); // Запускаем анимацию
    setIntervalSpeed(200); // Ускоряем график

    // Показываем случайное число через 1 секунду
    setTimeout(() => {
      const randomNum = (Math.random() * 100 + 1).toFixed(0); // Генерируем случайное число от 1 до 100
      setRandomValue(`${randomNum} $`);
      setIsTextVisible(true); // Показываем число
    }, 1000);

    // Через 3 секунды возвращаем всё в исходное состояние
    setTimeout(() => {
      setIntervalSpeed(1000); // Возвращаем скорость графика
      setIsTradeActive(false); // Останавливаем анимацию
      setIsButtonDisabled(false); // Активируем кнопку
      setIsTextVisible(false); // Скрываем текст с выигрышем
    }, 3000);
  };

  return (
    <Row justify="center" gutter={[16, 16]}>
      <Col xs={24} sm={18} md={16} lg={12}>
        <TitleWrapper>
          <TitleText>HBTRD Цена</TitleText>
          <PriceText>{`$${parseFloat(currentPrice).toFixed(2)}`}</PriceText>
        </TitleWrapper>
        <div
          style={{
            position: 'relative',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <Graphic
            setCurrentPrice={setCurrentPrice}
            intervalSpeed={intervalSpeed}
            isTradeActive={isTradeActive}
          />
          {/* Текст с выигрышем */}
          {randomValue && (
            <RandomText isVisible={isTextVisible}>+{randomValue}</RandomText>
          )}
        </div>
      </Col>

      <Col xs={24} sm={18} md={16} lg={12}>
        <TradeButton
          type="primary"
          onClick={handleTradeClick}
          disabled={isButtonDisabled}
          isAnimating={isTradeActive} // Анимация бордера при активной торговле
        >
          Торговать
        </TradeButton>
      </Col>
    </Row>
  );
};

export default MainSectionGraphic;
