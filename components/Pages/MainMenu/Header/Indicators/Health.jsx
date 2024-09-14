import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BarIcon } from '../DataIMGHeader'
import { styled } from 'styled-components'

const HealthContainer = styled.section`
  display: flex;
    align-items: center;
    justify-content: space-between;
    width: 30%;
    apect-ratio: 3 / 1;
    align-content: center;
    flex-direction: row;
`;
const HealthImg = styled.img`
    width: 30%;
    height: 30%;
    border-radius: 20%;
    background-color: #646464;
`;
const ProgressHealthContainer = styled.div`
  width: 100%;
  height: 100%;

  .progress-bar {
    height: 100%; /* Высота внутреннего прогресс-бара */
    background-color: #4caf50; /* Цвет прогресс-бара */
    transition: width 1s ease-in-out; /* Анимация прогресс-бара */
  }
`;
const Health = () => {
  return (
    <HealthContainer>
              <HealthImg src={BarIcon.health.image} alt="" />
              <ProgressHealthContainer>
                <ProgressBar now={100} animated/>
              </ProgressHealthContainer>
    </HealthContainer>
  );
};

export default Health;
