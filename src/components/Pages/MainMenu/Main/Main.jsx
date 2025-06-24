// Main.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedPage from './AnimatedPage';
import MainActions from './ActionsRow';
import { useSelector, useDispatch } from 'react-redux';
import { selectComponent } from '@/store/slices/editModeSlice';
import ModalColorPicker from '../Footer/Pages/ModalColorPicker';

// Импорт страниц
import AppartamentsPage from './Pages/AppartamentsPage/AppartamentsPage.jsx';
import EducationPage from './Pages/EducationPage/EducationPage.jsx';
import CarsPage from './Pages/CarsPage/CarsPage.jsx';
import ExchangePage from '../Footer/Pages/ExchangePage/ExchangePage.jsx';
import FunPage from '../Footer/Pages/FunPage/FunPage.jsx';
import HealthPage from '../Footer/Pages/HealthPage/HealthPage.jsx';
import FoodPage from '../Footer/Pages/FoodPage/FoodPage.jsx';
import ShopPage from '../Footer/Pages/ShopPage/ShopPage.jsx';

const MainSection = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: transparent;
`;

const MainBodySection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  align-items: center;
  position: relative;
  background: transparent;
`;

const useEditableComponent = (componentKey) => {
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
};

const MAIN_MENU_COLOR_ELEMENTS = [
  { key: 'background', label: 'Фон', default: '#f0f0f0' },
];

const MAIN_MENU_APPARTAMENTS_COLOR_ELEMENTS = [
  { key: 'button', label: 'Цвет кнопки', default: '#4096ff' },
  { key: 'buttonText', label: 'Цвет текста', default: '#fff' },
];
const MAIN_MENU_EDUCATION_COLOR_ELEMENTS = [
  { key: 'button', label: 'Цвет кнопки', default: '#ffb300' },
  { key: 'buttonText', label: 'Цвет текста', default: '#fff' },
];
const MAIN_MENU_CARS_COLOR_ELEMENTS = [
  { key: 'button', label: 'Цвет кнопки', default: '#00b894' },
  { key: 'buttonText', label: 'Цвет текста', default: '#fff' },
];

const Main = () => {
  const location = useLocation();
  const customColors = useSelector(state => state.customColors);
  const selectedComponent = useSelector(state => state.editMode.selectedComponent);
  const dispatch = useDispatch();
  const editableProps = useEditableComponent('main_menu');
  const handleCloseModal = () => {
    dispatch(selectComponent(null));
  };

  return (
    <MainSection {...editableProps} style={{ background: customColors['main_menu_background'] || undefined }}>
      <MainBodySection>
        <MainActions customColors={customColors} />
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
              path="health"
              element={
                <AnimatedPage>
                  <HealthPage />
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
                  <ExchangePage/>
                </AnimatedPage>
              }
            />
          </Routes>
        </AnimatePresence>
        {selectedComponent === 'main_menu' && (
          <ModalColorPicker
            componentKey="main_menu"
            elements={MAIN_MENU_COLOR_ELEMENTS}
            onClose={handleCloseModal}
          />
        )}
        {selectedComponent === 'main_menu_appartaments' && (
          <ModalColorPicker
            componentKey="main_menu_appartaments"
            elements={MAIN_MENU_APPARTAMENTS_COLOR_ELEMENTS}
            onClose={handleCloseModal}
          />
        )}
        {selectedComponent === 'main_menu_education' && (
          <ModalColorPicker
            componentKey="main_menu_education"
            elements={MAIN_MENU_EDUCATION_COLOR_ELEMENTS}
            onClose={handleCloseModal}
          />
        )}
        {selectedComponent === 'main_menu_cars' && (
          <ModalColorPicker
            componentKey="main_menu_cars"
            elements={MAIN_MENU_CARS_COLOR_ELEMENTS}
            onClose={handleCloseModal}
          />
        )}
      </MainBodySection>
    </MainSection>
  );
};

export default Main;
