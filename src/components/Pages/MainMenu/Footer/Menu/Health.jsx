// Health.jsx
import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '/src/assets/animation_json/heart.json';
import IconContainer from './IconContainer';
import { useSelector, useDispatch } from 'react-redux';
import { clearNewTasks } from '@/store/slices/newTasksBadgeSlice';
import styled from 'styled-components';

const Badge = styled.span`
  position: absolute;
  top: 6%;
  right: 6%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  color: white;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 700;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  padding: 0 6px;
  @media (max-width: 600px) {
    min-width: 16px;
    height: 16px;
    font-size: 0.7rem;
    padding: 0 4px;
  }
`;

const Health = () => {
  const lottieRef = useRef(null);
  const newHealthTasks = useSelector(state => state.newTasksBadge.health);
  const dispatch = useDispatch();

  const startAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);
      lottieRef.current.play();
    }
    dispatch(clearNewTasks('health'));
  };

  return (
    <IconContainer onClick={startAnimation} style={{ position: 'relative' }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        style={{ width: '80%', height: '80%' }}
        loop={false}
      />
      {newHealthTasks > 0 && <Badge>{newHealthTasks}</Badge>}
    </IconContainer>
  );
};

export default Health;
