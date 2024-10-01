import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '/src/assets/User.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const AvatarContainer = styled.section`
  flex: 0 0 auto;
  width: 80px; /* Ограничиваем размер */
  aspect-ratio: 1/1;
  background-color: #646464;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 60px; /* Уменьшаем размер на маленьких экранах */
  }
`;

const Avatar = () => {
  const lottieRef = useRef(null);

  const startAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);
      lottieRef.current.play();
    }
  };

  return (
    <AvatarContainer onClick={startAnimation}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        style={{ width: '80%', height: '80%' }}
        loop={false}
      />
    </AvatarContainer>
  );
};

export default Avatar;
