// ExchangePage.jsx
import React from 'react';
import styled from 'styled-components';
import MainSectionGraphic from './MainSectionGraphic'; // Импортируем MainSectionGraphic

// Стили для страницы
const PageWrapper = styled.div`
  padding: 20px 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

// Обертка для MainSectionGraphic с бордером и изменённым фоном
const GraphicWrapper = styled.div`
  background-color: #e9ecef; /* Немного темнее основного фона */
  border: 1px solid #d1d1d1; /* Светлый бордер */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Лёгкая тень для глубины */
`;

const ExchangePage = () => {
  return (
    <PageWrapper>
      {/* Добавляем обертку для MainSectionGraphic */}
      <GraphicWrapper>
        <MainSectionGraphic />
      </GraphicWrapper>
    </PageWrapper>
  );
};

export default ExchangePage;
