import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Button = styled.button`
  width: 5rem;
  height: 5rem;
  margin: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  color: #fff;

  background-color: ${(props) =>
    props.variant === 'bull' ? props.theme.colors.bull : props.theme.colors.bear};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    transform: scale(1.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 4rem;
    height: 4rem;
    font-size: 0.875rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    width: 3rem;
    height: 3rem;
    font-size: ${({ theme }) => theme.fonts.sizes.small};
  }
`;



function App() {
  const navigate = useNavigate();
  const appRef = useRef(null);

  useEffect(() => {
    const el = appRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  const handleNavigate = () => {
    const el = appRef.current;
    gsap.to(el, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        navigate('/main-menu');
      },
    });
  };

  return (
    <AppContainer ref={appRef}>
      <Button onClick={handleNavigate} variant="bull">БЫК</Button>
      <Button onClick={handleNavigate} variant="bear">МЕДВЕДЬ</Button>
    </AppContainer>
  );
}

export default App;
