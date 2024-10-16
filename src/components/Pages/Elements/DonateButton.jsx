// DonateButton.jsx

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';

const StyledDonateButton = styled(Button)`
  position: relative;
  width: ${({ theme }) => theme.sizes.donateButtonWidth};
  height: ${({ theme }) => theme.sizes.donateButtonHeight};
  font-size: ${({ theme }) => theme.sizes.donateButtonFontSize};
  transition: all 0.3s ease-in-out;
  margin-left: auto;

  /* Цвета градиента */
  --btn-bg-1: ${({ theme }) => theme.colors.donateButtonGradientStart};
  --btn-bg-2: ${({ theme }) => theme.colors.donateButtonGradientEnd};
  --btn-text-color: ${({ theme }) => theme.colors.donateButtonTextColor};
  --radii: ${({ theme }) => theme.borderRadius.medium};

  background-size: 200% auto;
  background-image: linear-gradient(
    45deg,
    var(--btn-bg-1) 0%,
    var(--btn-bg-2) 100%
  );
  border: none;
  border-radius: var(--radii);
  color: var(--btn-text-color);
  transition: all 0.3s ease-in-out;

  box-shadow:
    0 0 10px rgba(255, 215, 0, 0.5),
    0 5px 5px -2px rgba(255, 140, 0, 0.5);

  &:hover {
    background-position: right center;
    box-shadow:
      0 0 20px rgba(255, 215, 0, 0.7),
      0 5px 5px -2px rgba(255, 140, 0, 0.7);
  }

  &:focus,
  &:focus-visible,
  &:active {
    outline: none;
    box-shadow:
      0 0 0 3px rgba(255, 215, 0, 0.5),
      0 0 0 6px rgba(255, 140, 0, 0.5);
  }

  ${({ isInactive, theme }) =>
    isInactive &&
    css`
      background-image: none;
      background-color: ${theme.colors.donateButtonDisabledBackground};
      color: ${theme.colors.donateButtonDisabledTextColor};
      border: 2px solid ${theme.colors.donateButtonBorderColor};
      box-shadow: none;
      cursor: not-allowed;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: ${({ theme }) => theme.sizes.donateButtonHeightMobile};
    font-size: ${({ theme }) => theme.sizes.donateButtonFontSizeMobile};
    margin-left: 0;
    margin-top: ${({ theme }) => theme.sizes.marginSmall};
  }
`;

const DonateButton = ({ children, onClick, ...rest }) => {
  const [isInactive, setIsInactive] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    setIsInactive(true);
    setTimeout(() => {
      setIsInactive(false);
    }, 1000); // 1 секунда
  };

  return (
    <StyledDonateButton
      {...rest}
      isInactive={isInactive}
      onClick={handleClick}
      disabled={isInactive}
    >
      {children}
    </StyledDonateButton>
  );
};

export default DonateButton;
