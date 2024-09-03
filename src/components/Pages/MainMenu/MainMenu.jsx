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
  }
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
      <header>
        <Header/>
      </header>
      <main>
        <Main/>
      </main>
      <footer>
      <Footer/>
      </footer>
    </MenuBody>
  );
}

export default MainMenu;
