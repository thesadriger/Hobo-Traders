// Shop.jsx
import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '/src/assets/animation_json/shop.json';
import IconContainer from './IconContainer';

const Shop = () => {
  const lottieRef = useRef(null);

  const startAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);
      lottieRef.current.play();
    }
  };

  return (
    <IconContainer onClick={startAnimation}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        style={{ width: '80%', height: '80%' }}
        loop={false}
      />
    </IconContainer>
  );
};

export default Shop;
