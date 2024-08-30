import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BarIcon } from '../DataIMGHeader'
import { styled } from 'styled-components'

const FunContainer = styled.section`
  display: flex;
    align-items: center;
    justify-content: space-between;
    width: 30%;
    apect-ratio: 3 / 1;
    align-content: center;
    flex-direction: row;
`;
const FunImg = styled.img`
    width: 30%;
    height: 30%;
    border-radius: 20%;
    background-color: #646464;
`;
const ProgressFunContainer = styled.div`
  width: 100%;

  .progress-bar {
    height: 100%; /* Высота внутреннего прогресс-бара */
    background-color: #4caf50; /* Цвет прогресс-бара */
    transition: width 1s ease-in-out; /* Анимация прогресс-бара */
  }
`;
const Fun = () => {
  return (
    <FunContainer>
              <FunImg src={BarIcon.fun.image} alt="" />
              <ProgressFunContainer>
                <ProgressBar now={80} animated/>
              </ProgressFunContainer>
    </FunContainer>
  );
};

export default Fun;
