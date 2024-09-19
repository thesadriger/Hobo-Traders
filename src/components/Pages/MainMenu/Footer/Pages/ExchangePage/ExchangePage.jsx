// ExchangePage.jsx
import React from 'react';
import styled from 'styled-components';
import MainSectionGraphic from './MainSectionGraphic'; // Импортируем MainSectionGraphic

// Стили для страницы
const PageWrapper = styled.div`
  padding: 40px 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const ExchangePage = () => {
  return (
    <PageWrapper>
      <MainSectionGraphic />
    </PageWrapper>
  );
};

export default ExchangePage;
