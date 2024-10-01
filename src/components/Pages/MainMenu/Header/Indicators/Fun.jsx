import React from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { BarIcon } from '../DataIMGHeader';
import styled from 'styled-components';

const FunContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FunImg = styled.img`
  width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

const ProgressFunContainer = styled.div`
    width: 60px;
  margin-left: 5px;

  @media (max-width: 768px) {
    width: 50px;
    margin-left: 2px;
  }

  .progress-bar {
    height: 8px;
    background-color: #4caf50;
    transition: width 1s ease-in-out;
  }
`;

const Fun = () => {
  const fun = useSelector((state) => state.indicators.fun);

  return (
    <FunContainer>
      <FunImg src={BarIcon.fun.image} alt="Fun" />
      <ProgressFunContainer>
        <ProgressBar now={fun} animated />
      </ProgressFunContainer>
    </FunContainer>
  );
};

export default Fun;
