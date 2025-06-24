// MainMenu.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from '@/store/store'; // импортируем store
import { useSelector, useDispatch } from 'react-redux';
import { setEditMode, selectComponent } from '@/store/slices/editModeSlice';
import { FaEdit } from 'react-icons/fa';
import ModalColorPicker from './Footer/Pages/ModalColorPicker';

import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100vh;
  justify-content: space-between;
`;

const HeaderSection = styled.header`
  flex: 0 0 0%;
`;

const MainSection = styled.main`
  flex: 1; 
  overflow-y: auto;
`;

const FooterSection = styled.footer`
  flex: 0 0 0%;
`;

const EditModeFab = styled.button`
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 1000;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme, $active }) => $active ? theme.colors.editButtonActive : '#4096ff'};
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

function MainMenu() {
  const mainMenuRef = useRef(null);
  const editMode = useSelector(state => state.editMode.enabled);
  const selectedComponent = useSelector(state => state.editMode.selectedComponent);
  const dispatch = useDispatch();

  const FOOTER_COLOR_ELEMENTS = [
    { key: 'footerWrapper_background', label: 'Фон футера', default: 'transparent' },
    { key: 'dockBar_background', label: 'Фон докера', default: 'rgba(64, 150, 255, 0.80)' },
    { key: 'icon', label: 'Цвет иконок', default: '#4096ff' },
    { key: 'text', label: 'Цвет текста', default: '#fff' },
    { key: 'border', label: 'Цвет обводки', default: '#4096ff' },
  ];

  useEffect(() => {
    const el = mainMenuRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    return () => {
      gsap.to(el, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: 'power2.in',
      });
    };
  }, []);

  return (
    <Provider store={store}>
      <MenuBody ref={mainMenuRef}>
        <HeaderSection>
          <Header />
        </HeaderSection>
        <MainSection>
          <Main />
        </MainSection>
        <FooterSection>
          <Footer />
        </FooterSection>
        {selectedComponent === 'footer' && (
          <ModalColorPicker
            componentKey="footer"
            elements={FOOTER_COLOR_ELEMENTS}
            onClose={() => dispatch(selectComponent(null))}
          />
        )}
        <EditModeFab
          $active={editMode}
          onClick={() => dispatch(setEditMode(!editMode))}
          aria-label={editMode ? 'Выключить режим редактирования' : 'Включить режим редактирования'}
          title={editMode ? 'Выключить режим редактирования' : 'Включить режим редактирования'}
        >
          <FaEdit />
        </EditModeFab>
      </MenuBody>
    </Provider>
  );
}

export default MainMenu;
