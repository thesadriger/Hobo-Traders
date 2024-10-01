// Main.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedPage from './AnimatedPage';

// Импорт страниц
import AppartamentsPage from './Pages/AppartamentsPage.jsx';
import EducationPage from './Pages/EducationPage.jsx';
import CarsPage from './Pages/CarsPage.jsx';
import ExchangePage from '../Footer/Pages/ExchangePage/ExchangePage.jsx';
import FunPage from '../Footer/Pages/FunPage.jsx';
import HealthPage from '../Footer/Pages/HealthPage.jsx';
import FoodPage from '../Footer/Pages/FoodPage.jsx';
import ShopPage from '../Footer/Pages/ShopPage.jsx';
import Background from './Background.jsx';

const MainSection = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MainBodySection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  align-items: center;
  position: relative; /* Добавлено для анимации */
`;

const Main = () => {
  const location = useLocation();

  return (
    <MainSection>
      <MainBodySection>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/appartaments"
              element={
                <AnimatedPage>
                  <AppartamentsPage />
                </AnimatedPage>
              }
            />
            <Route
              path="education"
              element={
                <AnimatedPage>
                  <EducationPage />
                </AnimatedPage>
              }
            />
            <Route
              path="cars"
              element={
                <AnimatedPage>
                  <CarsPage />
                </AnimatedPage>
              }
            />
            {/* Другие маршруты */}
            <Route
              path="exchange"
              element={
                <AnimatedPage>
                  <ExchangePage />
                </AnimatedPage>
              }
            />
            <Route
              path="fun"
              element={
                <AnimatedPage>
                  <FunPage />
                </AnimatedPage>
              }
            />
            <Route
              path="health"
              element={
                <AnimatedPage>
                  <HealthPage />
                </AnimatedPage>
              }
            />
            <Route
              path="food"
              element={
                <AnimatedPage>
                  <FoodPage />
                </AnimatedPage>
              }
            />
            <Route
              path="shop"
              element={
                <AnimatedPage>
                  <ShopPage />
                </AnimatedPage>
              }
            />
            {/* Маршрут по умолчанию */}
            <Route
              path="*"
              element={
                <AnimatedPage>
                  <Background/>
                </AnimatedPage>
              }
            />
          </Routes>
        </AnimatePresence>
      </MainBodySection>
    </MainSection>
  );
};

export default Main;
