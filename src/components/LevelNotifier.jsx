// src/components/LevelNotifier.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetIndicators } from '@/store/slices/indicatorsSlice';
import { theme } from '@/theme';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { setNewTasks } from '@/store/slices/newTasksBadgeSlice';
import Lottie from 'lottie-react';
import starAnimation from '@/assets/animation_json/star.json';
import { TasksList as FunTasks } from './Pages/MainMenu/Footer/Pages/FunPage/TaskFunList.jsx';
import { TasksList as HealthTasks } from './Pages/MainMenu/Footer/Pages/HealthPage/TaskHealthList.jsx';
import { TasksList as FoodTasks } from './Pages/MainMenu/Footer/Pages/FoodPage/TaskFoodList.jsx';
import { getTaskEmoji } from './Pages/MainMenu/Footer/Pages/TaskSection.jsx';
import { AppartamentData } from './Pages/MainMenu/Main/Pages/AppartamentsPage/TaskApartList';
import { CarsData } from './Pages/MainMenu/Main/Pages/CarsPage/TaskCarsList';
import { EducationData } from './Pages/MainMenu/Main/Pages/EducationPage/TaskEducationList';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(20, 24, 38, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${({ $fadeOut }) => $fadeOut ? fadeOut : fadeIn} 0.5s ease;
  pointer-events: all;
  backdrop-filter: blur(5px);
`;

const StarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BigStar = styled.div`
  width: 160px;
  height: 160px;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    width: 110px;
    height: 110px;
    margin-bottom: 1rem;
  }
`;

const LevelNumber = styled.div`
  font-size: 13.5rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 2px 16px #fef712, 0 2px 8px #f67e0c;
  margin-bottom: 2rem;
  letter-spacing: 2px;
  @media (max-width: 600px) {
    font-size: 13.5rem;
    margin-bottom: 1.2rem;
  }
`;

const TasksBlock = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 4px 32px 0 rgba(64,150,255,0.10);
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.7s 0.2s both;
  @media (max-width: 600px) {
    padding: 1.2rem 0.7rem 1rem 0.7rem;
    min-width: 0;
  }
`;

const TasksTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #4096ff;
  margin-bottom: 1rem;
  text-align: center;
`;

const TaskIconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.2rem 1.5rem;
`;

const EmojiTaskIcon = styled.div`
  font-size: 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff9cc;
  border-radius: 0.5rem;
  width: 3.2rem;
  height: 3.2rem;
  box-shadow: 0 2px 8px 0 rgba(64,150,255,0.08);
`;

const TaskName = styled.div`
  font-size: 0.85rem;
  color: #4096ff;
  font-weight: 600;
  margin-top: 0.2rem;
  text-align: center;
  max-width: 4.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 32px;
  right: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2.2rem;
  color: #fff;
  opacity: 0.7;
  transition: opacity 0.2s;
  z-index: 2;
  &:hover { opacity: 1; }
  @media (max-width: 600px) {
    top: 12px;
    right: 12px;
    font-size: 1.5rem;
  }
`;

const LevelNotifier = () => {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.level.level);
  const prevLevelRef = useRef(level);
  const [show, setShow] = useState(false);
  const [unlockedTasks, setUnlockedTasks] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const previousLevel = prevLevelRef.current;
    const previousFloor = Math.floor(previousLevel);
    const currentFloor = Math.floor(level);

    if (currentFloor > previousFloor) {
      dispatch(resetIndicators());
      // Собираем все задачи
      const allTasks = [
        ...Object.values(FunTasks),
        ...Object.values(HealthTasks),
        ...Object.values(FoodTasks),
        ...Object.values(AppartamentData),
        ...Object.values(CarsData),
        ...Object.values(EducationData),
      ];
      // Новые открытые задачи
      const newUnlockedTasks = allTasks.filter((task) =>
        task.requiredLevel > previousFloor && task.requiredLevel <= currentFloor
      );
      setUnlockedTasks(newUnlockedTasks);
      setCurrentLevel(currentFloor);
      setShow(true);
      // Для бейджа
      const foodCount = newUnlockedTasks.filter(task => Object.values(FoodTasks).some(t => t.title === task.title)).length;
      const funCount = newUnlockedTasks.filter(task => Object.values(FunTasks).some(t => t.title === task.title)).length;
      const healthCount = newUnlockedTasks.filter(task => Object.values(HealthTasks).some(t => t.title === task.title)).length;
      const appartamentsCount = newUnlockedTasks.filter(task => Object.values(AppartamentData).some(t => t.title === task.title)).length;
      const carsCount = newUnlockedTasks.filter(task => Object.values(CarsData).some(t => t.title === task.title)).length;
      const educationCount = newUnlockedTasks.filter(task => Object.values(EducationData).some(t => t.title === task.title)).length;
      dispatch(setNewTasks({ food: foodCount, fun: funCount, health: healthCount, appartaments: appartamentsCount, cars: carsCount, education: educationCount }));
    }
    prevLevelRef.current = level;
  }, [level, dispatch]);

  if (!show || currentLevel === null) return null;

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShow(false);
      setFadeOut(false);
    }, 500);
  };

  return (
    <ThemeProvider theme={theme}>
      <Overlay $fadeOut={fadeOut} onClick={handleClose}>
        <CloseButton onClick={e => { e.stopPropagation(); handleClose(); }} aria-label="Закрыть">×</CloseButton>
        <StarWrapper>
          <BigStar>
            <Lottie animationData={starAnimation} loop={false} autoplay={true} style={{ width: '100%', height: '100%' }} />
          </BigStar>
          <LevelNumber>{currentLevel}</LevelNumber>
        </StarWrapper>
        {unlockedTasks.length > 0 && (
          <TasksBlock>
            <TasksTitle>Открыты новые задания:</TasksTitle>
            <TaskIconsContainer>
              {unlockedTasks.map((task, idx) => {
                const emoji = getTaskEmoji(task.title);
                return (
                  <EmojiTaskIcon key={idx}>
                    {emoji ? emoji : task.icon}
                    <TaskName>{task.title}</TaskName>
                  </EmojiTaskIcon>
                );
              })}
            </TaskIconsContainer>
          </TasksBlock>
        )}
      </Overlay>
    </ThemeProvider>
  );
};

export default LevelNotifier;
