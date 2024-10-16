// Exchange.jsx
import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '/src/assets/User.json';
import IconContainer from './IconContainer';

const Exchange = () => {
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
        style={{
          width: ({ theme }) => theme.sizes.iconWidth,
          height: ({ theme }) => theme.sizes.iconHeight,
        }}
        loop={false}
      />
    </IconContainer>
  );
};

export default Exchange;
