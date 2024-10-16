// Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Импортируйте иконки или компоненты для кнопок
import Exchange from './Menu/Exchange.jsx';

const FooterSection = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.footerBackground}; // Цвет фона из темы
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1100; // Высокий z-index, чтобы подвал был поверх других элементов
  padding: ${({ theme }) => theme.sizes.footerPadding}; // Отступы из темы
`;

const FooterButton = styled(NavLink)`
  background-color: ${({ theme }) => theme.colors.footerBackground}; // Цвет фона кнопки из темы
  border: none;
  color: ${({ theme }) => theme.colors.footerTextColor}; // Цвет текста из темы
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${({ theme }) => theme.sizes.footerButtonWidth}; // Ширина кнопки из темы
  aspect-ratio: 1 / 1; // Соотношение сторон 1:1 для квадратной кнопки
  border-radius: ${({ theme }) => theme.sizes.footerButtonBorderRadius}; // Скругление углов из темы
  text-decoration: none; // Убираем подчеркивание ссылок

  &:hover {
    background-color: ${({ theme }) => theme.colors.footerHoverBackground}; // Цвет фона при наведении из темы
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.footerHoverBackground}; // Цвет фона в активном состоянии из темы
  }

   @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 20%; // Изменяем ширину кнопок на средних экранах
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    width: 25%; // Изменяем ширину кнопок на маленьких экранах
  }
`;

const MainFooterSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterSection>
      <MainFooterSection>
        <FooterButton to="exchange" aria-label="Exchange">
          <Exchange />
        </FooterButton>
        <FooterButton to="health" aria-label="Health">
        <Exchange />
        </FooterButton>
        <FooterButton to="fun" aria-label="Fun">
          <Exchange />
        </FooterButton>
        <FooterButton to="food" aria-label="Food">
          <Exchange />
        </FooterButton>
        <FooterButton to="shop" aria-label="Shop">
          <Exchange />
        </FooterButton>
      </MainFooterSection>
    </FooterSection>
  );
};

export default Footer;
