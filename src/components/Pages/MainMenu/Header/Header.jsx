// Header.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditMode, selectComponent } from '../../../../store/slices/editModeSlice';

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
import ModalColorPicker from '../Footer/Pages/ModalColorPicker';

const Section = styled.header`
  display: flex;
  flex-direction: column; /* Для вертикального размещения элементов */
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.5rem;
  background: ${({ theme, $customBg }) => $customBg || theme.colors.headerBackground};
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
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
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.indicatorBackground};
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
  background-color: ${({ theme }) => theme.colors.backButtonBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: ${({ theme }) => theme.sizes.avatarSizeMobile};
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backButtonHoverBackground};
  }
`;

const AvatarContainer = styled.section`
  flex: 0 0 auto;
  width: ${({ theme }) => theme.sizes.avatarSizeMobile};
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.avatarBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingsContainer = styled.section`
  flex: 0 0 auto;
  width: ${({ theme }) => theme.sizes.avatarSizeMobile};
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.settingsBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// --- Хук для универсального редактирования ---
function useEditableComponent(componentKey) {
  const editMode = useSelector(state => state.editMode.enabled);
  const selectedComponent = useSelector(state => state.editMode.selectedComponent);
  const dispatch = useDispatch();
  const isSelected = selectedComponent === componentKey;
  const handleClick = (e) => {
    if (editMode) {
      e.stopPropagation();
      dispatch(selectComponent(componentKey));
    }
  };
  return {
    onClick: handleClick,
    style: editMode ? {
      outline: isSelected ? '3px solid #4caf50' : '2px dashed #4096ff',
      outlineOffset: '2px',
      cursor: 'pointer',
      position: 'relative',
      zIndex: 10,
    } : {},
  };
}

const HEADER_COLOR_ELEMENTS = {
  header: [
    { key: 'background', label: 'Фон', default: '#e9ecef' },
  ],
  header_avatar: [
    { key: 'background', label: 'Фон', default: '#4096ff' },
    { key: 'border', label: 'Рамка', default: '#ffffff' },
    { key: 'icon', label: 'Иконка', default: '#ffffff' },
  ],
  header_health: [
    { key: 'progressBar', label: 'Полоса прогресса', default: '#f44336' },
    { key: 'lottieBg', label: 'Фон анимации', default: '#effdfa' },
  ],
  header_fun: [
    { key: 'progressBar', label: 'Полоса прогресса', default: '#4caf50' },
    { key: 'lottieBg', label: 'Фон анимации', default: '#effdfa' },
  ],
  header_food: [
    { key: 'progressBar', label: 'Полоса прогресса', default: '#ff9800' },
    { key: 'lottieBg', label: 'Фон анимации', default: '#effdfa' },
  ],
  header_btc: [
    { key: 'background', label: 'Фон', default: '#e9ecef' },
    { key: 'text', label: 'Текст', default: '#4096ff' },
    { key: 'icon', label: 'Иконка', default: '#4096ff' },
  ],
  header_usdt: [
    { key: 'background', label: 'Фон', default: '#e9ecef' },
    { key: 'text', label: 'Текст', default: '#4096ff' },
    { key: 'icon', label: 'Иконка', default: '#4096ff' },
  ],
  header_hbtrd: [
    { key: 'background', label: 'Фон', default: '#e9ecef' },
    { key: 'text', label: 'Текст', default: '#4096ff' },
    { key: 'icon', label: 'Иконка', default: '#4096ff' },
  ],
  header_settings: [
    { key: 'background', label: 'Фон', default: '#4096ff' },
    { key: 'icon', label: 'Иконка', default: '#ffffff' },
  ],
  header_levelProgress: [
    { key: 'barBg', label: 'Фон прогресс-бара', default: '#effdfa' },
    { key: 'barFill', label: 'Цвет заполнения', default: '#4096ff' },
    { key: 'levelText', label: 'Цвет текста уровня', default: '#4096ff' },
    { key: 'levelGradient', label: 'Градиент уровня', default: 'linear-gradient(90deg, #fef712 0%, #f67e0c 100%)' },
  ],
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editMode = useSelector(state => state.editMode.enabled);
  const selectedComponent = useSelector(state => state.editMode.selectedComponent);
  const customColors = useSelector(state => state.customColors);
  const dispatch = useDispatch();

  const isBackgroundPage = location.pathname === '/main-menu' || location.pathname === '/background';

  const editableProps = useEditableComponent('header');

  const handleCloseModal = () => {
    dispatch(selectComponent(null));
  };

  return (
    <Section {...editableProps} $customBg={customColors['header_background']}>
      <HeaderTop>
        <LeftSection>
          {isBackgroundPage ? (
            <AvatarContainer {...useEditableComponent('header_avatar')}>
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
            <div {...useEditableComponent('header_health')}><Health /></div>
            <div {...useEditableComponent('header_fun')}><Fun /></div>
            <div {...useEditableComponent('header_food')}><Food /></div>
          </StatusBars>
          <CurrentsBars>
            <div {...useEditableComponent('header_btc')}><Btc /></div>
            <div {...useEditableComponent('header_usdt')}><Usdt /></div>
            <div {...useEditableComponent('header_hbtrd')}><Hbtrd /></div>
          </CurrentsBars>
        </Characters>

        <RightSection>
          <SettingsContainer {...useEditableComponent('header_settings')}>
            <Settings />
          </SettingsContainer>
        </RightSection>
      </HeaderTop>
      <div {...useEditableComponent('header_levelProgress')}><LevelProgress /></div>
      {selectedComponent && HEADER_COLOR_ELEMENTS[selectedComponent] && (
        <ModalColorPicker
          componentKey={selectedComponent}
          elements={HEADER_COLOR_ELEMENTS[selectedComponent]}
          onClose={handleCloseModal}
        />
      )}
    </Section>
  );
};

export default Header;
