import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setEditMode } from './store/slices/editModeSlice';
import { FaEdit } from 'react-icons/fa';

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

const EditModeFab = styled.button`
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 1000;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme, active }) => active ? theme.colors.editButtonActive : theme.colors.editButtonBackground};
  color: #fff;
  border: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.editButtonHoverBackground};
    transform: scale(1.08);
  }
`;

<style>
      {`
        .custom-level-notification .ant-notification-notice-message {
          display: none !important;
          background: none !important;
        }
        .custom-level-notification .ant-notification-notice {
          background: none !important;
          box-shadow: none !important;
        }
      `}
    </style>

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

function App() {
  const navigate = useNavigate();
  const appRef = useRef(null);
  const editMode = useSelector(state => state.editMode.enabled);
  const dispatch = useDispatch();

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
      <EditModeFab
        active={editMode}
        onClick={() => dispatch(setEditMode(!editMode))}
        aria-label={editMode ? 'Выключить режим редактирования' : 'Включить режим редактирования'}
        title={editMode ? 'Выключить режим редактирования' : 'Включить режим редактирования'}
      >
        <FaEdit />
      </EditModeFab>
    </AppContainer>
  );
}

export default App;
