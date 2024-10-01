// ExchangePage.js
import React from 'react';
import styled from 'styled-components';
import MainSectionGraphic from './MainSectionGraphic';
import { CoinsList } from './CoinList';


// Стили для страницы
const PageWrapper = styled.div`
  padding: 20px 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Обертка для графиков
const GraphicWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const ExchangePage = () => {
  return (
    <PageWrapper>
      <GraphicWrapper>
        {Object.keys(CoinsList).map((coinKey) => {
          const coinData = CoinsList[coinKey];
          return (
            <MainSectionGraphic
              key={coinKey}
              coinKey={coinKey}
              coinData={coinData}
            />
          );
        })}
      </GraphicWrapper>
    </PageWrapper>
  );
};

export default ExchangePage;