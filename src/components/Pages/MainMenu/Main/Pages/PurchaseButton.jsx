import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';

const StyledPurchaseButton = styled(Button)`
  position: relative;
  width: 85%;
  height: ${({ theme }) => theme.sizes.taskButtonHeight};
  font-size: ${({ theme }) => theme.sizes.taskButtonFontSize};
  margin-left: 0;
  background-size: 280% auto;
  background-image: linear-gradient(
    325deg,
    var(--btn-bg-2, #4096ff) 0%,
    var(--btn-bg-1, #34d2ff) 55%,
    var(--btn-bg-2, #4096ff) 90%
  );
  border: none;
  border-radius: 0.5em;
  color: #fff;
  transition: all 0.3s ease-in-out;
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
      0 0 0 3px #fff,
      0 0 0 6px #4096ff;
  }

  ${({ $isInactive }) =>
    $isInactive &&
    css`
      background-image: none;
      background-color: #d9d9d9;
      color: #888;
      border: 2px solid #d9d9d9;
      box-shadow: none;
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: ${({ theme }) => theme.sizes.taskButtonHeightMobile};
    font-size: ${({ theme }) => theme.sizes.taskButtonFontSizeMobile};
    margin-left: 0;
    // margin-top: ${({ theme }) => theme.sizes.marginSmall};
  }
`;

const PurchaseButton = ({ children, $isInactive, disabled, ...rest }) => {
  return (
    <StyledPurchaseButton
      {...rest}
      $isInactive={$isInactive}
      disabled={disabled}
    >
      {children}
    </StyledPurchaseButton>
  );
};

export default PurchaseButton; 