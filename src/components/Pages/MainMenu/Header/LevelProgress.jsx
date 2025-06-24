// LevelProgress.jsx
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import starAnimation from '@/assets/animation_json/star.json';
import { getNextLevelProgress } from '@/store/slices/levelSlice';

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
  color: ${({ $levelText, theme }) => $levelText || theme.colors.levelTextColor};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ $levelGradient, theme }) => $levelGradient || `linear-gradient(to bottom, ${theme.colors.levelGradientStart} 50%, ${theme.colors.levelGradientEnd} 100%)`};
  padding: ${({ theme }) => theme.sizes.progressLabelPadding};
  border-radius: ${({ theme }) => theme.borderRadius.large};

  svg {
    margin-right: ${({ theme }) => theme.sizes.iconMarginRight};
    color: ${({ $levelText, theme }) => $levelText || theme.colors.levelTextColor};
  }
`;

const StyledProgressBar = styled(ProgressBar)`
  height: ${({ theme }) => theme.sizes.levelProgressBarHeight};
  width: 100vw;
  border-radius: ${({ theme }) => theme.sizes.borderRadiusLarge};
  background-color: ${({ $barBg, theme }) => $barBg || theme.colors.levelProgressBarBackground};
  overflow: hidden; /* Чтобы скругления применялись к дочерним элементам */

  .progress-bar {
    background-color: ${({ $barFill, theme }) => $barFill || theme.colors.levelProgressBarFill}; /* Цвет заполнения */
    transition: width 0.5s ease-in-out;
  }
`;

const StarLottieWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  min-width: 24px;
  min-height: 24px;
  max-width: 40px;
  max-height: 40px;
  margin-right: 4px;
  margin-bottom: 3px;
  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 1.5em;
    height: 1.5em;
    min-width: 18px;
    min-height: 18px;
    max-width: 28px;
    max-height: 28px;
    margin-bottom: 3px;
  }
`;

const LevelProgress = () => {
  const level = useSelector((state) => state.level.level);
  const progress = useSelector((state) => state.level.progress);
  const customColors = useSelector((state) => state.customColors);
  const nextLevelProgress = getNextLevelProgress(level);
  const prevLevel = useRef(level);
  const lottieRef = useRef(null);

  // Запуск анимации при достижении нового уровня
  useEffect(() => {
    if (level > prevLevel.current) {
      lottieRef.current?.goToAndStop(0, true);
      lottieRef.current?.play();
    }
    prevLevel.current = level;
  }, [level]);

  // Запуск анимации по клику
  const handleStarClick = () => {
    lottieRef.current?.goToAndStop(0, true);
    lottieRef.current?.play();
  };

  return (
    <LevelProgressContainer>
      <StyledProgressBar
        now={(progress / nextLevelProgress) * 100}
        $barBg={customColors['header_levelProgress_barBg']}
        $barFill={customColors['header_levelProgress_barFill']}
      />
      <ProgressLabel
        $levelText={customColors['header_levelProgress_levelText']}
        $levelGradient={customColors['header_levelProgress_levelGradient']}
      >
        <StarLottieWrapper onClick={handleStarClick} style={{ cursor: 'pointer' }}>
          <Lottie
            lottieRef={lottieRef}
            animationData={starAnimation}
            loop={false}
            autoplay={false}
            style={{ width: '100%', height: '100%' }}
          />
        </StarLottieWrapper>
        {` ${level}`}
      </ProgressLabel>
    </LevelProgressContainer>
  );
};

export default LevelProgress;
