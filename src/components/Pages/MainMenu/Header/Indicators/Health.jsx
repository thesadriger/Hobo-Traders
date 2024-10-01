import React from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { BarIcon } from '../DataIMGHeader';
import styled from 'styled-components';

const HealthContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HealthImg = styled.img`
  width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

const ProgressHealthContainer = styled.div`
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

const Health = () => {
  const health = useSelector((state) => state.indicators.health);

  return (
    <HealthContainer>
      <HealthImg src={BarIcon.health.image} alt="Health" />
      <ProgressHealthContainer>
        <ProgressBar now={health} animated />
      </ProgressHealthContainer>
    </HealthContainer>
  );
};

export default Health;
