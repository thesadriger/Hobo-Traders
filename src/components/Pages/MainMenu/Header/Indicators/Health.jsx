// Health.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import animationData from '/src/assets/animation_json/heart.json';
import { resetLastChangedIndicator } from '@/store/slices/lastChangedIndicatorSlice';

const HealthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const HealthImg = styled.img`
  width: ${({ theme }) => theme.sizes.iconSizeMedium};
  height: ${({ theme }) => theme.sizes.iconSizeMedium};

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: ${({ theme }) => theme.sizes.iconSizeSmall};
    height: ${({ theme }) => theme.sizes.iconSizeSmall};
  }
`;

const ProgressHealthContainer = styled.div`
  width: 100%;
  margin: 0px 5px 0px 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 100%;
    margin: 0px 5px 0px 5px;
  }
`;

const StyledProgressBar = styled(ProgressBar)`
  height: ${({ theme }) => theme.sizes.progressBarHeight};
  border-radius: ${({ theme }) => theme.sizes.progressBarBorderRadius};
  background-color: ${({ theme }) => theme.colors.indicatorBackground};
  overflow: hidden;
  box-shadow: ${({ $danger }) => $danger ? '0 0 8px 2px #ff4d4f' : 'none'};

  .progress-bar {
    background-color: ${({ $customColor, theme, $danger }) => $danger ? '#ff4d4f' : ($customColor || theme.colors.healthBarColor)};
    transition: width 0.5s ease-in-out, background-color 0.3s, box-shadow 0.3s;
  }
`;

const HealthLottie = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 20%;
  background: #effdfa;
  border-radius: 15%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  margin-right: 0px;
  transition: box-shadow 0.3s, background 0.3s;
  // ${({ $danger }) => $danger && `box-shadow: 0 0 8px 2px #ff4d4f; background: #ffeaea;`}

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 50%;
    height: auto;
  }
`;

const Health = () => {
  const health = useSelector((state) => state.indicators.health);
  const customColors = useSelector((state) => state.customColors);
  const lottieRef = useRef(null);
  const prevHealth = useRef(health);
  const [danger, setDanger] = useState(false);
  const [isEffectPlaying, setIsEffectPlaying] = useState(false);
  const [pendingEffect, setPendingEffect] = useState(false);
  const lastChangedIndicator = useSelector((state) => state.lastChangedIndicator);
  const dispatch = useDispatch();

  useEffect(() => {
    // Danger подсветка — всегда при уменьшении
    if (prevHealth.current !== health) {
      if (health < prevHealth.current) {
        setDanger(true);
        setTimeout(() => setDanger(false), 500);
      }
      prevHealth.current = health;
    }
  }, [health]);

  useEffect(() => {
    // Анимация только по пользовательскому действию
    if (lastChangedIndicator === 'health') {
      if (prevHealth.current !== health && health > prevHealth.current) {
        if (!isEffectPlaying) {
          setIsEffectPlaying(true);
          lottieRef.current?.goToAndStop(0, true);
          lottieRef.current?.play();
        } else {
          setPendingEffect(true);
        }
        dispatch(resetLastChangedIndicator());
      }
    }
  }, [health, lastChangedIndicator]);

  const startAnimation = () => {
    if (!isEffectPlaying) {
      setIsEffectPlaying(true);
      lottieRef.current?.goToAndStop(0, true);
      lottieRef.current?.play();
    } else {
      setPendingEffect(true);
    }
  };

  const handleComplete = () => {
    setIsEffectPlaying(false);
    if (pendingEffect) {
      setPendingEffect(false);
      setIsEffectPlaying(true);
      lottieRef.current?.goToAndStop(0, true);
      lottieRef.current?.play();
    }
  };

  // --- Кастомные цвета ---
  const colorProgressBar = customColors['header_health_progressBar'] || '#ff4d4f';
  const colorLottieBg = customColors['header_health_lottieBg'] || '#effdfa';

  return (
    <HealthContainer>
      <HealthLottie onClick={startAnimation} $danger={danger} style={{ background: colorLottieBg }}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          style={{ width: '80%', height: '80%' }}
          loop={false}
          onComplete={handleComplete}
        />
      </HealthLottie>
      <ProgressHealthContainer>
        <StyledProgressBar now={health} $danger={danger} $customColor={customColors['header_health_progressBar']} />
      </ProgressHealthContainer>
    </HealthContainer>
  );
};

export default Health;
