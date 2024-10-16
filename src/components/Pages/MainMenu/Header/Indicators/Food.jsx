// Food.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { BarIcon } from '../DataIMGHeader';
import styled from 'styled-components';

const FoodContainer = styled.div`
  display: flex;
  align-items: center;
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
  width: 60px;
  margin-left: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 50px;
    margin-left: 2px;
  }
`;

const StyledProgressBar = styled(ProgressBar)`
  height: ${({ theme }) => theme.sizes.progressBarHeight};
  border-radius: ${({ theme }) => theme.sizes.progressBarBorderRadius};
  background-color: ${({ theme }) => theme.colors.indicatorBackground};
  overflow: hidden;

  .progress-bar {
    background-color: ${({ theme }) => theme.colors.foodBarColor}; /* Цвет прогресс-бара еды */
    transition: width 0.5s ease-in-out;
  }
`;

const Food = () => {
  const food = useSelector((state) => state.indicators.food);

  return (
    <FoodContainer>
      <FoodImg src={BarIcon.food.image} alt="Food" />
      <ProgressFoodContainer>
        <StyledProgressBar now={food} />
      </ProgressFoodContainer>
    </FoodContainer>
  );
};

export default Food;
