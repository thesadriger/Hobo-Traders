// Food.jsx
import React, { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '/src/assets/animation_json/food.json';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import { resetLastChangedIndicator } from '@/store/slices/lastChangedIndicatorSlice';

const FoodContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const FoodImg = styled.img`
  width: ${({ theme }) => theme.sizes.iconSizeMedium};
  height: ${({ theme }) => theme.sizes.iconSizeMedium};

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: ${({ theme }) => theme.sizes.iconSizeSmall};
    height: ${({ theme }) => theme.sizes.iconSizeSmall};
  }
`;

const ProgressFoodContainer = styled.div`
  width: 100%;
  margin: 0px 0px 0px 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 100%;
    margin: 0px 0px 0px 5px;
  }
`;

const StyledProgressBar = styled(ProgressBar)`
  height: ${({ theme }) => theme.sizes.progressBarHeight};
  border-radius: ${({ theme }) => theme.sizes.progressBarBorderRadius};
  background-color: ${({ theme }) => theme.colors.indicatorBackground};
  overflow: hidden;
  box-shadow: ${({ $danger }) => $danger ? '0 0 8px 2px #ff4d4f' : 'none'};

  .progress-bar {
    background-color: ${({ $customColor, theme, $danger }) => $danger ? '#ff4d4f' : ($customColor || theme.colors.foodBarColor)};
    transition: width 0.5s ease-in-out, background-color 0.3s, box-shadow 0.3s;
  }
`;

const EmojiBg = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
  background: #effdfa;
  border-radius: 15%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  margin-right: 4px;
`;

const FoodLottie = styled.div`
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

const Food = () => {
  const food = useSelector((state) => state.indicators.food);
  const customColors = useSelector((state) => state.customColors);
  const lastChangedIndicator = useSelector((state) => state.lastChangedIndicator);
  const dispatch = useDispatch();
  const lottieRef = useRef(null);
  const prevFood = useRef(food);
  const [danger, setDanger] = useState(false);
  const [isEffectPlaying, setIsEffectPlaying] = useState(false);
  const [pendingEffect, setPendingEffect] = useState(false);

  useEffect(() => {
    // Danger подсветка — всегда при уменьшении
    if (prevFood.current !== food) {
      if (food < prevFood.current) {
        setDanger(true);
        setTimeout(() => setDanger(false), 500);
      }
      prevFood.current = food;
    }
  }, [food]);

  useEffect(() => {
    // Анимация только по пользовательскому действию
    if (lastChangedIndicator === 'food') {
      if (prevFood.current !== food && food > prevFood.current) {
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
  }, [food, lastChangedIndicator]);

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
    <FoodContainer>
      {/* <FoodImg src={BarIcon.food.image} alt="Food" /> */}
      {/* <EmojiBg>🍗</EmojiBg> */}
      <FoodLottie onClick={startAnimation} $danger={danger}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          style={{ width: '80%', height: '80%' }}
          loop={false}
          onComplete={handleComplete}
        />
      </FoodLottie>
      <ProgressFoodContainer>
        <StyledProgressBar now={food} $danger={danger} $customColor={customColors['header_food_progressBar']} />
      </ProgressFoodContainer>
    </FoodContainer>
  );
};

export default Food;
