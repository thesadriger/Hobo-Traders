// Usdt.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BarIcon } from '../DataIMGHeader';
import styled from 'styled-components';

const UsdtContainer = styled.section`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.sizes.borderRadiusLarge};
  padding: 0.25rem;
  width: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 70px;
    padding: 0.2rem;
  }
`;

const ImgUsdt = styled.img`
  width: ${({ theme }) => theme.sizes.iconSizeSmall};
  height: ${({ theme }) => theme.sizes.iconSizeSmall};
`;

const BalanceUsdt = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fonts.sizes.smaller};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 5px;
`;

const Usdt = () => {
  const usdtBalance = useSelector((state) => state.balance.usdt);

  // Функция для форматирования баланса с суффиксами K, M, B
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

  // Получаем отформатированный баланс
  const displayBalance = formatBalance(usdtBalance);

  return (
    <UsdtContainer>
      <ImgUsdt src={BarIcon.usdt.image} alt="Usdt" />
      <BalanceUsdt>
        <span>{displayBalance}</span>
      </BalanceUsdt>
    </UsdtContainer>
  );
};

export default Usdt;
