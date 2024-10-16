import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import animationData from '/src/assets/Exp.json';

const SettingsContainer = styled.section`
  flex: 0 0 auto;
  width: ${({ theme }) => theme.sizes.avatarSize};
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.settingsBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: ${({ theme }) => theme.sizes.avatarSizeMobile};
  }
`;

const Settings = () => {
  const lottieRef = useRef(null);

  const startAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);
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
