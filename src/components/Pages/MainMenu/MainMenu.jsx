import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { styled } from 'styled-components'

import Header from './Header/Header.jsx'

const MenuBody = styled.body`
 display: flex;
    flex-direction: column;
    min-height: 250vh;
    box-sizing: border-box;
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
        <h1>Main Menu</h1>
        {/* Здесь добавьте другие элементы меню */}
      </main>
      <footer>
      <h3>Footer Menu</h3>
      </footer>
    </MenuBody>
  );
}

export default MainMenu;
