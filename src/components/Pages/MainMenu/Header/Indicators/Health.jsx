// Health.jsx
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
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 15px;
  border-radius: 5px;
  background-color: #424242;
  overflow: hidden;

  .progress-bar {
    background-color: #f44336; /* Health bar color */
    transition: width 0.5s ease-in-out;
  }
`;

const Health = () => {
  const health = useSelector((state) => state.indicators.health);

  return (
    <HealthContainer>
      <HealthImg src={BarIcon.health.image} alt="Health" />
      <ProgressHealthContainer>
        <StyledProgressBar now={health} />
      </ProgressHealthContainer>
    </HealthContainer>
  );
};

export default Health;
