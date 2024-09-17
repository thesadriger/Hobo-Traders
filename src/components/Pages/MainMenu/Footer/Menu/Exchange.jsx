import React, { useRef } from 'react'
import Lottie from 'lottie-react'
import animationData from '/src/assets/User.json'
import { styled } from 'styled-components'


const ExchangeContainer = styled.section`
  width: 3rem;
  height: 3rem;
  background-color: #646464;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Exchange = () => {
  const lottieRef = useRef(null);

  const startAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true); // Устанавливаем начальную позицию анимации
      lottieRef.current.play();
    }
  };
  return (
    <ExchangeContainer onClick={startAnimation}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        style={{ width: '80%', height: '80%' }}
        loop={false}
      />
    </ExchangeContainer>
  );
};

export default Exchange;
