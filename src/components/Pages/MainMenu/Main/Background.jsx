// Background.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Импортируем стили кнопок из Footer или создаём новые
// Если вы хотите использовать стили из Footer, импортируйте FooterButton
// import { FooterButton } from '../Footer/Footer'; // Скорректируйте путь импорта

// Если нет возможности импортировать, создадим новый стиль кнопки, основанный на стилях из Footer
const BackgroundButton = styled(NavLink)`
  background-color: #323232;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 15%;
  aspect-ratio: 1 / 1;
  border-radius: 25%;
  text-decoration: none;
  margin: 0.5rem;
  &:hover {
    background-color: #4a4a4a;
  }
  &.active {
    background-color: #4a4a4a;
  }
`;

const BackgroundSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center; /* Центрируем кнопки */
  flex-direction: row; /* Располагаем кнопки в ряд */
  flex-wrap: wrap; /* Перенос кнопок на следующую строку при необходимости */
  background-color: #fff;
  height: 100%; /* Высота section */
  width: 100%;
`;

const Background = () => {
  return (
    <BackgroundSection>
      <BackgroundButton to="appartaments" aria-label="Appartaments">
        Appartaments
      </BackgroundButton>
      <BackgroundButton to="education" aria-label="Education">
        Education
      </BackgroundButton>
      <BackgroundButton to="cars" aria-label="Cars">
        Cars
      </BackgroundButton>
    </BackgroundSection>
  );
};

export default Background;
