// MainSectionGraphic.jsx
import React, { useState } from 'react';
import { Row, Col, Button } from 'antd'; // Ант дизайн компоненты
import styled from 'styled-components';
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
  margin-top: 5px;
  width: 100%;
  height: 45px;
  font-size: 16px;
  background-color: ${({ disabled }) => (disabled ? '#d9d9d9' : '#40a9ff')}; /* Цвет кнопки меняется в зависимости от состояния */
  border-color: ${({ disabled }) => (disabled ? '#d9d9d9' : '#40a9ff')};
  color: ${({ disabled }) => (disabled ? '#bfbfbf' : 'white')}; /* Цвет текста меняется в зависимости от состояния */
  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#d9d9d9' : '#1890ff')}; /* Цвет при наведении */
    border-color: ${({ disabled }) => (disabled ? '#d9d9d9' : '#1890ff')};
  }
`;

const MainSectionGraphic = () => {
  const [currentPrice, setCurrentPrice] = useState(1.00); // Текущая цена
  const [intervalSpeed, setIntervalSpeed] = useState(1000); // Скорость обновления
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Состояние для отслеживания активности кнопки

  // Функция ускорения графика
  const handleTradeClick = () => {
    setIsButtonDisabled(true); // Отключаем кнопку
    setIntervalSpeed(200); // Ускоряем график

    // Таймер на 3 секунды, после которого кнопка снова станет активной
    setTimeout(() => {
      setIntervalSpeed(1000); // Возвращаем скорость
      setIsButtonDisabled(false); // Включаем кнопку
    }, 3000);
  };

  return (
    <Row justify="center" gutter={[16, 16]}>
      <Col xs={24} sm={18} md={16} lg={12}>
        <TitleWrapper>
          <TitleText>HBTRD Price</TitleText>
          <PriceText>{`$${parseFloat(currentPrice).toFixed(2)}`}</PriceText>
        </TitleWrapper>
        <Graphic setCurrentPrice={setCurrentPrice} intervalSpeed={intervalSpeed} />
      </Col>

      <Col xs={24} sm={18} md={16} lg={12}>
        <TradeButton 
          type="primary" 
          onClick={handleTradeClick} 
          disabled={isButtonDisabled} // Кнопка будет неактивной, если isButtonDisabled === true
        >
          Торговать
        </TradeButton>
      </Col>
    </Row>
  );
};

export default MainSectionGraphic;
