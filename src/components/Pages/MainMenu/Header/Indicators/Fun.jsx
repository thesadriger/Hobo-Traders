// Fun.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import animationData from '/src/assets/animation_json/fun.json';
import { resetLastChangedIndicator } from '@/store/slices/lastChangedIndicatorSlice';

const FunContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FunImg = styled.img`
  width: ${({ theme }) => theme.sizes.iconSizeMedium};
  height: ${({ theme }) => theme.sizes.iconSizeMedium};

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: ${({ theme }) => theme.sizes.iconSizeSmall};
    height: ${({ theme }) => theme.sizes.iconSizeSmall};
  }
`;

const ProgressFunContainer = styled.div`
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
    background-color: ${({ $customColor, theme, $danger }) => $danger ? '#ff4d4f' : ($customColor || theme.colors.funBarColor)};
    transition: width 0.5s ease-in-out, background-color 0.3s, box-shadow 0.3s;
  }
`;

const FunLottie = styled.div`
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

const Fun = () => {
  const fun = useSelector((state) => state.indicators.fun);
  const customColors = useSelector((state) => state.customColors);
  const lastChangedIndicator = useSelector((state) => state.lastChangedIndicator);
  const dispatch = useDispatch();
  const lottieRef = useRef(null);
  const prevFun = useRef(fun);
  const [danger, setDanger] = useState(false);
  const [isEffectPlaying, setIsEffectPlaying] = useState(false);
  const [pendingEffect, setPendingEffect] = useState(false);

  useEffect(() => {
    // Danger подсветка — всегда при уменьшении
    if (prevFun.current !== fun) {
      if (fun < prevFun.current) {
        setDanger(true);
        setTimeout(() => setDanger(false), 500);
      }
      prevFun.current = fun;
    }
  }, [fun]);

  useEffect(() => {
    // Анимация только по пользовательскому действию
    if (lastChangedIndicator === 'fun') {
      if (prevFun.current !== fun && fun > prevFun.current) {
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
  }, [fun, lastChangedIndicator]);

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

  return (
    <FunContainer>
      <FunLottie onClick={startAnimation} $danger={danger}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          style={{ width: '80%', height: '80%' }}
          loop={false}
          onComplete={handleComplete}
        />
      </FunLottie>
      <ProgressFunContainer>
        <StyledProgressBar now={fun} $danger={danger} $customColor={customColors['header_fun_progressBar']} />
      </ProgressFunContainer>
    </FunContainer>
  );
};

export default Fun;
