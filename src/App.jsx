import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './App.css';

function App() {
  const navigate = useNavigate();
  const appRef = useRef(null);

  useEffect(() => {
    const el = appRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, []);
  
  const handleNavigate = () => {
    const el = appRef.current;
    gsap.to(el, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        navigate('/main-menu');
      },
    });
  };

  return (
    <div ref={appRef} className="App">
      <button onClick={handleNavigate} className="bullButton">БЫК</button>
      <button onClick={handleNavigate} className="bearButton">МЕДВЕДЬ</button>
    </div>
  );
}

export default App;
