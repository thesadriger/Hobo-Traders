// MainMenu.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from '@/store/store'; // импортируем store

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
  flex: 0 0 10%;
`;

const MainSection = styled.main`
  flex: 1; 
  overflow-y: auto;
`;

const FooterSection = styled.footer`
  flex: 0 0 10%;
`;

function MainMenu() {
  const mainMenuRef = useRef(null);

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
      </MenuBody>
    </Provider>
  );
}

export default MainMenu;
