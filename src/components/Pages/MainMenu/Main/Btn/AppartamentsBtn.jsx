// AppartamentsBtn.jsx

import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '/src/assets/User.json';
import styled from 'styled-components';

const AppartamentsBtnContainer = styled.section`
  flex: 0 0 auto;
  width: ${({ theme }) => theme.sizes.shopButtonWidth};
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.shopButtonBackground};
  border-radius: ${({ theme }) => theme.sizes.shopButtonBorderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
`;

const AppartamentsBtn = () => {
  const lottieRef = useRef(null);

  const startAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);
      lottieRef.current.play();
    }
  };

  return (
    <AppartamentsBtnContainer onClick={startAnimation}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        style={{ width: '80%', height: '80%' }}
        loop={false}
      />
    </AppartamentsBtnContainer>
  );
};

export default AppartamentsBtn;
