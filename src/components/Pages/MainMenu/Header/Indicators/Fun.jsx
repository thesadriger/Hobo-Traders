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
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 15px;
  border-radius: 5px;
  background-color: #424242;
  overflow: hidden;

  .progress-bar {
    background-color: #4caf50; /* Fun bar color */
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
