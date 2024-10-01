// Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Импортируйте иконки или компоненты для кнопок
import Exchange from './Menu/Exchange.jsx';

const FooterSection = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #323232;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1100;
  padding: 0.5rem 0;
`;

const FooterButton = styled(NavLink)`
  background-color: #323232;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 15%;
  aspect-ratio: 1 / 1;
  border-radius: 25%;
  text-decoration: none;
  &:hover {
    background-color: #4a4a4a;
  }
  &.active {
    background-color: #4a4a4a;
  }
`;

const MainFooterSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterSection>
      <MainFooterSection>
        <FooterButton to="exchange" aria-label="Exchange">
          <Exchange />
        </FooterButton>
        <FooterButton to="fun" aria-label="Fun">
          Fun
        </FooterButton>
        <FooterButton to="health" aria-label="Health">
          Health
        </FooterButton>
        <FooterButton to="food" aria-label="Food">
          Food
        </FooterButton>
        <FooterButton to="shop" aria-label="Shop">
          Shop
        </FooterButton>
      </MainFooterSection>
    </FooterSection>
  );
};

export default Footer;
