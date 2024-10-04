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
 width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

const ProgressFoodContainer = styled.div`
   width: 60px;
  margin-left: 5px;

  @media (max-width: 768px) {
    width: 50px;
    margin-left: 2px;
  }

  .progress-bar {
    background-color: #4caf50;
    transition: width 1s ease-in-out;
  }
`;

const Food = () => {
  const food = useSelector((state) => state.indicators.food);

  return (
    <FoodContainer>
      <FoodImg src={BarIcon.food.image} alt="Food" />
      <ProgressFoodContainer>
        <ProgressBar now={food} animated />
      </ProgressFoodContainer>
    </FoodContainer>
  );
};

export default Food;
