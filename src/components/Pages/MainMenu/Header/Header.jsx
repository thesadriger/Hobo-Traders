import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { styled } from 'styled-components'

import './Header.css'

// Индикаторы///////////////////////////

import Health from './Indicators/Health'
import Fun from './Indicators/Fun'
import Food from './Indicators/Food'

////////////////////////////////////////
//------------------------------------//
// Валюты///////////////////////////////

import Btc from './Currents/Btc'
import Usdt from './Currents/Usdt'
import Ivg from './Currents/Ivg'

////////////////////////////////////////
//------------------------------------//
// Уровень//////////////////////////////

import LevelProgress from './LevelProgress'

////////////////////////////////////////
//------------------------------------//
// Настройки+Аватар////////////////////////////

import Settings from './Settings'
import Avatar from './Avatar'

////////////////////////////////////////


const HeaderSection = styled.header`
  flex: 0 0 10%; 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #323232;
  width: 100%;
`;
const MainHeadSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
  flex: 1; /* Позволяем секции занимать доступное пространство */
`;



const Header = () => {


  return (
    
    <HeaderSection>
      <MainHeadSection>
      <div className="section">
        <Avatar/>
        <div className="characters">
          <div className="statusBars">
            <Health/>
            <Fun/>
            <Food/>
          </div>
          <div className="currentsBars">
            <Btc/>
            <Usdt/>
            <Ivg/>
          </div>
        </div>
        <Settings/>
      </div>
        <LevelProgress/>
      </MainHeadSection>
    </HeaderSection>
  );
}

export default Header;
