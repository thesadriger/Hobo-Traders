// LevelProgress.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa'; // Импорт иконки звезды

const LevelProgressContainer = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  position: relative;
`;

const ProgressLabel = styled.span`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #424242;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(to bottom, #fef712 50%, #f67e0c 100%); /* Градиентный фон */
  padding: 4px 8px;
  border-radius: 10px;

  svg {
    margin-right: 4px; /* Отступ между иконкой и номером уровня */
    color: #424242; /* Цвет иконки звезды */
  }
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 20px;
  border-radius: 10px;
  background-color: #424242;
  overflow: hidden; /* Чтобы скругления применялись к дочерним элементам */

  .progress-bar {
    background-color: #4096ff;
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
