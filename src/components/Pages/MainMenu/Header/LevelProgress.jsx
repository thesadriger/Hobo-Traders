// LevelProgress.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa'; // Импорт иконки звезды

const LevelProgressContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.sizes.levelProgressPadding};
  position: relative;
`;

const ProgressLabel = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.levelTextColor};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.levelGradientStart} 50%,
    ${({ theme }) => theme.colors.levelGradientEnd} 100%
  ); /* Градиентный фон из темы */
  padding: ${({ theme }) => theme.sizes.progressLabelPadding};
  border-radius: ${({ theme }) => theme.borderRadius.large};

  svg {
    margin-right: ${({ theme }) => theme.sizes.iconMarginRight}; /* Отступ между иконкой и номером уровня */
    color: ${({ theme }) => theme.colors.levelTextColor}; /* Цвет иконки звезды из темы */
  }
`;

const StyledProgressBar = styled(ProgressBar)`
  height: ${({ theme }) => theme.sizes.levelProgressBarHeight};
  border-radius: ${({ theme }) => theme.sizes.borderRadiusLarge};
  background-color: ${({ theme }) => theme.colors.levelProgressBarBackground};
  overflow: hidden; /* Чтобы скругления применялись к дочерним элементам */

  .progress-bar {
    background-color: ${({ theme }) => theme.colors.levelProgressBarFill}; /* Цвет заполнения из темы */
    transition: width 0.5s ease-in-out;
  }
`;

const LevelProgress = () => {
  const level = useSelector((state) => state.level.level);

  const progress = (level % 1) * 100;
  const currentLevel = Math.floor(level);

  return (
    <LevelProgressContainer>
      <StyledProgressBar now={progress}>
        {/* Прогресс-бар */}
      </StyledProgressBar>
      <ProgressLabel>
        <FaStar /> {` ${currentLevel}`}
      </ProgressLabel>
    </LevelProgressContainer>
  );
};

export default LevelProgress;
