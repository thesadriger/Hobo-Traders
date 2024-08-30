import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BarIcon } from './DataIMGHeader'
import { styled } from 'styled-components'
import animationData from '/src/assets/Exp.json'

const SettingsContainer = styled.section`
 flex: 0 0 auto;
    width: 15%;
    aspect-ratio: 1 / 1;
    background-color: #646464;
    border-radius: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
`;

const Settings = () => {
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
  <SettingsContainer onClick={startAnimation}>
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      style={{ width: '80%', height: '80%' }}
      loop={false}
    />
  </SettingsContainer>
);
};

export default Settings;
