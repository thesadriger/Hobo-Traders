import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { styled } from 'styled-components'


import Exchange from './Menu/Exchange.jsx'
import Fun from './Menu/Fun.jsx'
import Health from './Menu/Health.jsx'
import Food from './Menu/Food.jsx'
import Shop from './Menu/Shop.jsx'

const FooterSection = styled.footer`
  flex: 0 0 10%; 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #323232;
  width: 100%;
`;
const MainFooterSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
  flex: 1; /* Позволяем секции занимать доступное пространство */
`;



const Footer = () => {


  return (
    
    <FooterSection>
      <MainFooterSection>
      <div className="section">
        <Exchange/>
        <Fun/>
        <Health/>
        <Food/>
        <Shop/>
      </div>
      </MainFooterSection>
    </FooterSection>
  );
}

export default Footer;
