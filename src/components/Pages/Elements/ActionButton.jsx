// ActionButton.jsx

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';

const StyledActionButton = styled(Button)`
  position: relative;
  width: ${({ theme }) => theme.sizes.taskButtonWidth};
  height: ${({ theme }) => theme.sizes.taskButtonHeight};
  font-size: ${({ theme }) => theme.sizes.taskButtonFontSize};
  transition: all 0.3s ease-in-out;
  margin-left: auto;
  margin-right: 1rem;

  --clr-font-main: hsla(0, 0%, 20%, 1);
  --btn-bg-1: hsla(194, 100%, 69%, 1);
  --btn-bg-2: hsla(217, 100%, 56%, 1);
  --btn-bg-color: hsla(360, 100%, 100%, 1);
  --radii: ${({ theme }) => theme.borderRadius.medium};

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
      0 0 0 3px var(--btn-bg-color),
      0 0 0 6px var(--btn-bg-2);
  }

  ${({ $isInactive, theme }) =>
    $isInactive &&
    css`
        background-image: none;
        background-color: ${theme.colors.actionButtonDisabledBackground};
        color: #ffffff;
        border: 2px solid ${theme.colors.actionButtonBorderColor}; /* Голубая обводка */
        box-shadow: none;
        cursor: not-allowed;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: ${({ theme }) => theme.sizes.taskButtonHeightMobile};
    font-size: ${({ theme }) => theme.sizes.taskButtonFontSizeMobile};
    margin-right: 0.5rem;
    margin-top: 0;
  }

  opacity: ${({ $isInactive }) => ($isInactive ? 0.5 : 1)};
  background-color: ${({ $isInactive }) => ($isInactive ? '#d9d9d9' : '')};
  border-color: ${({ $isInactive }) => ($isInactive ? '#d9d9d9' : '')};
  color: ${({ $isInactive }) => ($isInactive ? '#888' : '')};
  pointer-events: ${({ $isInactive }) => ($isInactive ? 'none' : 'auto')};
`;

const ActionButton = ({ children, onClick, ...rest }) => {
  const [isInactive, setIsInactive] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    setIsInactive(true);
    setTimeout(() => {
      setIsInactive(false);
    }, 1000); // 1 секунды
  };

  return (
    <StyledActionButton
      {...rest}
      $isInactive={isInactive}
      onClick={handleClick}
      disabled={isInactive}
    >
      {(() => {
        const text = typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : '');
        const fontSize = text.length > 6 ? '0.65rem' : '0.95rem';
        if (text.includes('HBTRD')) {
          // Разделяем число и валюту
          const match = text.match(/([\d.,KMB]+)\s*HBTRD/);
          if (match) {
            const number = match[1];
            return (
              <span style={{
                display: 'inline-block',
                maxWidth: '90%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                fontSize,
                wordBreak: 'break-all',
                textAlign: 'center',
                lineHeight: 1.1,
              }}>
                <span style={{ display: 'block', fontWeight: 700 }}>{number}</span>
                <span style={{ display: 'block', fontSize: '1em', letterSpacing: 1 }}>HBTRD</span>
              </span>
            );
          }
        }
        return (
          <span style={{
            display: 'inline-block',
            maxWidth: '90%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize,
            wordBreak: 'break-all',
            textAlign: 'center',
          }}>
            {children}
          </span>
        );
      })()}
    </StyledActionButton>
  );
};

export default ActionButton;
