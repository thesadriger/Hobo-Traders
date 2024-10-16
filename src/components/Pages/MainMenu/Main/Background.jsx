// Background.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const BackgroundButton = styled(NavLink)`
  background-color: ${({ theme }) => theme.colors.shopButtonBackground};
  border: none;
  color: ${({ theme }) => theme.colors.shopButtonTextColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${({ theme }) => theme.sizes.shopButtonWidth};
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.sizes.shopButtonBorderRadius};
  text-decoration: none;
  margin: ${({ theme }) => theme.sizes.shopButtonMargin};
  &:hover {
    background-color: ${({ theme }) => theme.colors.shopButtonHoverBackground};
  }
  &.active {
    background-color: ${({ theme }) => theme.colors.shopButtonHoverBackground};
  }
`;

const BackgroundSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.background};
  height: 100%;
  width: 100%;
`;

const Background = () => {
  return (
    <BackgroundSection>
      <BackgroundButton to="appartaments" aria-label="Appartaments">
        Appartaments
      </BackgroundButton>
      <BackgroundButton to="education" aria-label="Education">
        Education
      </BackgroundButton>
      <BackgroundButton to="cars" aria-label="Cars">
        Cars
      </BackgroundButton>
    </BackgroundSection>
  );
};

export default Background;
