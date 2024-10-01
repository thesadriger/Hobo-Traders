// LevelProgress.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';

const LevelProgressContainer = styled.div`
  width: 100%;
   padding: 0.5rem 0;
`;

const LevelProgress = () => {
  const level = useSelector((state) => state.level.level);

  return (
    <LevelProgressContainer>
      <ProgressBar now={(level % 1) * 100} label={`Level ${Math.floor(level)}`} />
    </LevelProgressContainer>
  );
};

export default LevelProgress;
