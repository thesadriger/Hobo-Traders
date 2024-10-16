// Fun.jsx
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
  width: ${({ theme }) => theme.sizes.iconSizeMedium};
  height: ${({ theme }) => theme.sizes.iconSizeMedium};

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: ${({ theme }) => theme.sizes.iconSizeSmall};
    height: ${({ theme }) => theme.sizes.iconSizeSmall};
  }
`;

const ProgressFunContainer = styled.div`
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
    background-color: ${({ theme }) => theme.colors.funBarColor};
    transition: width 0.5s ease-in-out;
  }
`;

const Fun = () => {
  const fun = useSelector((state) => state.indicators.fun);

  return (
    <FunContainer>
      <FunImg src={BarIcon.fun.image} alt="Fun" />
      <ProgressFunContainer>
        <StyledProgressBar now={fun} />
      </ProgressFunContainer>
    </FunContainer>
  );
};

export default Fun;
