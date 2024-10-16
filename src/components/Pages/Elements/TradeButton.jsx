// components/Pages/Elements/TradeButton.jsx
import styled, { keyframes, css } from 'styled-components';
import { Button } from 'antd';

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

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: 45px;
    font-size: 14px;
  }
`;

export default TradeButton;
