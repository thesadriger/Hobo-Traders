import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

// Импорт компонентов
import Health from './Indicators/Health';
import Fun from './Indicators/Fun';
import Food from './Indicators/Food';
import Btc from './Currents/Btc';
import Usdt from './Currents/Usdt';
import Hbtrd from './Currents/Hbtrd';
import LevelProgress from './LevelProgress';
import Settings from './Settings';
import Avatar from './Avatar';

// Импорт хуков и иконок
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Styled Components

const Section = styled.header`
  display: flex;
  flex-direction: column; /* Добавили для вертикального размещения элементов */
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.5rem;
  background-color: #323232;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 0.25rem;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Равномерное распределение элементов */
  width: 100%;
`;

const Characters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  padding: 0.5rem;
  max-width: 500px;
  margin: 0 auto;
  min-width: 0;
`;

const StatusBars = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.25rem 0;
  flex-wrap: nowrap;
`;

const CurrentsBars = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.25rem 0;
  background-color: #303030;
  flex-wrap: wrap;
`;

const LeftSection = styled.div`
  flex: 0 0 auto;
  padding-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  flex: 0 0 auto;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
   flex: 0 0 auto;
  width: 60px;
  aspect-ratio: 1/1;
  background-color: #646464;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarContainer = styled.section`
  flex: 0 0 auto;
  width: 60px;
  aspect-ratio: 1/1;
  background-color: #646464;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingsContainer = styled.section`
  flex: 0 0 auto;
  width: 60px;
  aspect-ratio: 1/1;
  background-color: #646464;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isBackgroundPage = location.pathname === '/' || location.pathname === '/background';

  return (
    <Section>
      <HeaderTop>
        <LeftSection>
          {isBackgroundPage ? (
            <AvatarContainer>
              <Avatar />
            </AvatarContainer>
          ) : (
            <BackButton
              onClick={() => navigate('/background')}
              aria-label="Вернуться на главную"
            >
              <FaArrowLeft size={24} />
            </BackButton>
          )}
        </LeftSection>

        <Characters>
          <StatusBars>
            <Health />
            <Fun />
            <Food />
          </StatusBars>
          <CurrentsBars>
            <Btc />
            <Usdt />
            <Hbtrd />
          </CurrentsBars>
        </Characters>

        <RightSection>
          <SettingsContainer>
            <Settings />
          </SettingsContainer>
        </RightSection>
      </HeaderTop>
      <LevelProgress />
    </Section>
  );
};

export default Header;
