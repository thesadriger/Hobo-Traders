import React, { useState } from 'react';
import { Row, Col, Button, Spin } from 'antd'; // Ант дизайн компоненты
import styled, { keyframes, css } from 'styled-components';
import Graphic from './Graphic'; // Импортируем компонент графика

// Стили для страницы и карточек
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
`;

const PriceText = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #389e0d;
`;

const TitleText = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #181818;
`;

const TradeButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  background-color: ${({ disabled }) => (disabled ? '#d9d9d9' : '#40a9ff')};
  border-color: ${({ disabled }) => (disabled ? '#d9d9d9' : '#40a9ff')};
  color: ${({ disabled }) => (disabled ? '#bfbfbf' : 'white')};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#d9d9d9' : '#1890ff')};
    border-color: ${({ disabled }) => (disabled ? '#d9d9d9' : '#1890ff')};
  }
`;

// Анимация зелёного слоя
const slideAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

// Стили для анимации зелёного слоя
const AnimationOverlay = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  background-color: rgba(82, 196, 26, 0.7); /* Менее прозрачный зелёный слой */
  overflow: hidden; /* Убедимся, что анимация остаётся внутри */
  ${({ isAnimating }) =>
    isAnimating &&
    css`
      animation: ${slideAnimation} 3s linear;
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
  color: #fff;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const MainSectionGraphic = () => {
  const [currentPrice, setCurrentPrice] = useState(1.00); // Текущая цена
  const [intervalSpeed, setIntervalSpeed] = useState(1000); // Скорость обновления
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Состояние для отслеживания активности кнопки
  const [isTradeActive, setIsTradeActive] = useState(false); // Активность для анимации на графике
  const [randomValue, setRandomValue] = useState(null); // Случайное число
  const [isTextVisible, setIsTextVisible] = useState(false); // Видимость текста с выигрышем

  // Функция ускорения графика
  const handleTradeClick = () => {
    setIsButtonDisabled(true); // Отключаем кнопку
    setIsTradeActive(true); // Запускаем анимацию
    setIntervalSpeed(200); // Ускоряем график

    // Показываем случайное число через 2 секунды
    setTimeout(() => {
      const randomNum = (Math.random() * 100 + 1).toFixed(0); // Генерируем случайное число от 1 до 10
      setRandomValue(`${randomNum} $`);
      setIsTextVisible(true); // Показываем число
    }, 1000);

    // Таймер на 3 секунды, после которого кнопка снова станет активной, а анимация и текст исчезнут
    setTimeout(() => {
      setIntervalSpeed(1000); // Возвращаем скорость
      setIsTradeActive(false); // Останавливаем анимацию
      setIsButtonDisabled(false); // Включаем кнопку
      setIsTextVisible(false); // Прячем текст
    }, 3000);
  };

  return (
    <Row justify="center" gutter={[16, 16]}>
      <Col xs={24} sm={18} md={16} lg={12}>
        <TitleWrapper>
          <TitleText>HBTRD Price</TitleText>
          <PriceText>{`$${parseFloat(currentPrice).toFixed(2)}`}</PriceText>
        </TitleWrapper>
        <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
          <Graphic
            setCurrentPrice={setCurrentPrice}
            intervalSpeed={intervalSpeed}
            isTradeActive={isTradeActive}
          />
          {/* Анимация зелёного слоя */}
          {isTradeActive && <AnimationOverlay isAnimating={isTradeActive} />}
          {/* Текст с выигрышем */}
          {randomValue && <RandomText isVisible={isTextVisible}>+{randomValue}</RandomText>}
        </div>
      </Col>

      <Col xs={24} sm={18} md={16} lg={12}>
        <TradeButton
          type="primary"
          onClick={handleTradeClick}
          disabled={isButtonDisabled} // Кнопка будет неактивной, если isButtonDisabled === true
        >
          {isButtonDisabled ? (
            <>
              <Spin /> Подождите {/* Индикатор загрузки */}
            </>
          ) : (
            'Торговать'
          )}
        </TradeButton>
      </Col>
    </Row>
  );
};

export default MainSectionGraphic;
