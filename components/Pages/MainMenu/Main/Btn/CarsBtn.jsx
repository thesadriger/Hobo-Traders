import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import animationData from '/src/assets/User.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import { styled } from 'styled-components'


const CarsBtnContainer = styled.section`
 flex: 0 0 auto;
  width: 15%; /* Ширина в процентах от ширины контейнера */
  aspect-ratio: 1/1; /* Сохраняет пропорции квадрата */
  background-color: #646464;
  border-radius: 25%; /* Округление на основе процента от ширины/высоты */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem; /* Размер шрифта относительно корневого элемента */
`;

const CarsBtn = () => {
  const lottieRef = useRef(null);

  useEffect(()=>{

  }, []);

  const startAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true); // Устанавливаем начальную позицию анимации
      lottieRef.current.play();
    }
  };
  return (
    <CarsBtnContainer onClick={startAnimation}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        style={{ width: '80%', height: '80%' }}
        loop={false}
      />
    </CarsBtnContainer>
  );
};

export default CarsBtn;
