// components/Pages/Elements/TradeButton.jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';

// Стили для кнопки "Торговать"
const StyledTradeButton = styled(Button)`
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  --clr-font-main: hsla(0, 0%, 20%, 1);
  --btn-bg-1: hsla(194, 100%, 69%, 1);
  --btn-bg-2: hsla(217, 100%, 56%, 1);
  --btn-bg-color: hsla(360, 100%, 100%, 1);
  --radii: 0.5em;

  background-size: 280% auto;
  background-image: linear-gradient(
    325deg,
    var(--btn-bg-2) 0%,
    var(--btn-bg-1) 55%,
    var(--btn-bg-2) 90%
  );
  border: none;
  border-radius: var(--radii);
  color: var(--btn-bg-color);
  box-shadow:
    0px 0px 20px rgba(71, 184, 255, 0.5),
    0px 5px 5px -1px rgba(58, 125, 233, 0.25),
    inset 4px 4px 8px rgba(175, 230, 255, 0.5),
    inset -4px -4px 8px rgba(19, 95, 216, 0.35);

  &:hover {
    background-position: right top;
  }

  &:focus,
  &:focus-visible,
  &:active {
    outline: none;
    box-shadow:
      0 0 0 3px var(--btn-bg-color),
      0 0 0 6px var(--btn-bg-2);
  }

  ${({ $isInactive, theme }) =>
    $isInactive &&
    css`
      background-image: none;
      background-color: ${theme.colors.tradeButtonDisabledBackground || '#a0a0a0'};
      color: #ffffff;
      border: 2px solid ${theme.colors.tradeButtonBorderColor || '#4096ff'};
      box-shadow: none;
      cursor: not-allowed;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: 40px;
    font-size: 14px;
    margin-left: 0;
    margin-top: ${({ theme }) => theme.sizes.marginSmall};
  }
`;

const TradeButton = ({ children, onClick, disabled, ...rest }) => {
  const [isInactive, setIsInactive] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    setIsInactive(true);
    setTimeout(() => {
      setIsInactive(false);
    }, 3000); // 3 секунды
  };

  return (
    <StyledTradeButton
      {...rest}
      $isInactive={isInactive}
      onClick={handleClick}
      disabled={disabled || isInactive}
    >
      {children}
    </StyledTradeButton>
  );
};

export default TradeButton;
