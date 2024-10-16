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
  width: ${({ theme }) => theme.sizes.iconSizeMedium};
  height: ${({ theme }) => theme.sizes.iconSizeMedium};

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: ${({ theme }) => theme.sizes.iconSizeSmall};
    height: ${({ theme }) => theme.sizes.iconSizeSmall};
  }
`;

const ProgressHealthContainer = styled.div`
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
    background-color: ${({ theme }) => theme.colors.healthBarColor};
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
