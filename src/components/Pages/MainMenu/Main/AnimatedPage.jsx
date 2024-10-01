// AnimatedPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AnimatedDiv = styled(motion.div)`
  width: 100%;
  height: 100%;
  /* Добавьте дополнительные стили по необходимости */
`;

const AnimatedPage = ({ children }) => {
  return (
    <AnimatedDiv
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </AnimatedDiv>
  );
};

export default AnimatedPage;
