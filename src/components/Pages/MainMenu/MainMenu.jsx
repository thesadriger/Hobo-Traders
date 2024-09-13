import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { styled } from 'styled-components'

import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx'
import Footer from './Footer/Footer.jsx'

const MenuBody = styled.body`
 display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100vh;
    justify-content: space-between;
`;
const HeaderSection = styled.header`
  flex: 0 0 10%; /* Header takes 10% of viewport height */
`;

const MainSection = styled.main`
  flex: 1; /* Main takes remaining space */
  overflow-y: auto; /* Allow scrolling if content overflows */
`;

const FooterSection = styled.footer`
  flex: 0 0 10%; /* Footer takes 10% of viewport height */
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
    <MenuBody ref={mainMenuRef}>
      <HeaderSection>
        <Header/>
      </HeaderSection>
      <MainSection>
        <Main/>
      </MainSection>
      <FooterSection>
      <Footer/>
      </FooterSection>
    </MenuBody>
  );
}

export default MainMenu;
