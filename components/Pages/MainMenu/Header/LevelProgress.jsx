import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BarIcon } from './DataIMGHeader'
import { styled } from 'styled-components'

const LevelContainer = styled.section`
  display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.5rem; /* Высота progress */
    width: 100%; /* Ширина равна ширине section */
    padding: 0 1rem;
`;
const LevelImg = styled.img`
  height: 100%;
    aspect-ratio: 1/1;
    border-radius: 20%;
    background-color: #646464;
`;
const LevelProgressContainer = styled.div`
  width: 100%;
  overflow: hidden; /* Чтобы скрыть острые углы */

  .progress-bar {
    height: 100%; /* Высота внутреннего прогресс-бара */
    background-color: #4caf50; /* Цвет прогресс-бара */
    transition: width 1s ease-in-out; /* Анимация прогресс-бара */
    // border-top-right-radius: 10px; /* Закругление правого верхнего угла */
    // border-bottom-right-radius: 10px; /* Закругление правого нижнего угла */
    // border-top-left-radius: 0; /* Убираем закругление левого верхнего угла */
    // border-bottom-left-radius: 0; /* Убираем закругление левого нижнего угла */
  }
`;

const LevelProgress = () => {
    return (
      <LevelContainer>
                {/* <LevelImg src={BarIcon.health} alt="" /> */}
                <LevelProgressContainer>
                  <ProgressBar now={100} label={`${100}lvl`}animated/>
                </LevelProgressContainer>
      </LevelContainer>
    );
  };
  
  export default LevelProgress;