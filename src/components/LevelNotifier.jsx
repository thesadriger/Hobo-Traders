// src/components/LevelNotifier.jsx
import React, { useEffect, useRef } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { resetIndicators } from '@/store/slices/indicatorsSlice';
import { theme } from '@/theme';
import { StarFilled } from '@ant-design/icons';
import styled, { ThemeProvider } from 'styled-components';

// Импортируем списки задач
import { TasksList as FunTasks } from './Pages/MainMenu/Footer/Pages/FunPage/TaskFunList.jsx';
import { TasksList as HealthTasks } from './Pages/MainMenu/Footer/Pages/HealthPage/TaskHealthList.jsx';
import { TasksList as FoodTasks } from './Pages/MainMenu/Footer/Pages/FoodPage/TaskFoodList.jsx';

// Стили для уведомления
const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.notifications.fontFamily};
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.notifications.marginBottom};
`;

const CongratsBox = styled.div`
  background-color: ${({ theme }) => theme.notifications.congratsBoxBackground};
  padding: ${({ theme }) => theme.notifications.congratsBoxPadding};
  border-radius: ${({ theme }) => theme.notifications.congratsBoxBorderRadius};
  display: inline-flex;
  align-items: center;
`;

const NotificationBody = styled.div`
  display: flex;
  align-items: center;
`;

const NewTasks = styled.div`
  display: flex;
  align-items: center;
`;

const NewTasksText = styled.p`
  margin: 0;
  margin-right: ${({ theme }) => theme.notifications.marginRight};
  font-size: ${({ theme }) => theme.notifications.fontSize};
`;

const TaskIconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const TaskIcon = styled.div`
  margin: ${({ theme }) => theme.notifications.taskIconMargin};
  width: ${({ theme }) => theme.notifications.taskIconSize};
  height: ${({ theme }) => theme.notifications.taskIconSize};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LevelNotifier = () => {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.level.level);
  const prevLevelRef = useRef(level);

  useEffect(() => {
    const previousLevel = prevLevelRef.current;
    const previousFloor = Math.floor(previousLevel);
    const currentFloor = Math.floor(level);

    if (currentFloor > previousFloor) {
      dispatch(resetIndicators());

      // Объединяем все задачи в один массив
      const allTasks = [
        ...Object.values(FunTasks),
        ...Object.values(HealthTasks),
        ...Object.values(FoodTasks),
      ];

      // Находим задачи, открытые на новом уровне
      const newUnlockedTasks = allTasks.filter((task) => {
        return (
          task.requiredLevel > previousFloor &&
          task.requiredLevel <= currentFloor
        );
      });

      // Подготовка контента уведомления
      const notificationContent = (
        <ThemeProvider theme={theme}>
          <NotificationWrapper>
            <NotificationHeader>
              <CongratsBox>
                <StarFilled
                  style={{
                    color: theme.notifications.starColor,
                    marginRight: theme.notifications.marginRight,
                    fontSize: theme.notifications.headerFontSize,
                  }}
                />
                <span
                  style={{
                    fontSize: theme.notifications.headerFontSize,
                    color: theme.notifications.textColor,
                  }}
                >
                  Поздравляем! Вы достигли нового уровня: {currentFloor}
                </span>
              </CongratsBox>
            </NotificationHeader>
            {newUnlockedTasks.length > 0 && (
              <NotificationBody>
                <NewTasks>
                  <NewTasksText>Открыты новые задания:</NewTasksText>
                  <TaskIconsContainer>
                    {newUnlockedTasks.map((task, index) => (
                      <TaskIcon key={index}>{task.icon}</TaskIcon>
                    ))}
                  </TaskIconsContainer>
                </NewTasks>
              </NotificationBody>
            )}
          </NotificationWrapper>
        </ThemeProvider>
      );

      notification.open({
        message: notificationContent,
        placement: 'bottom',
        style: {
          backgroundColor: theme.notifications.backgroundColor,
          color: theme.notifications.textColor,
          borderRadius: theme.notifications.notificationBorderRadius,
          boxShadow: theme.notifications.boxShadow,
          padding: theme.notifications.notificationPadding,
        },
        duration: 5,
        className: 'level-notification',
      });
    }

    prevLevelRef.current = level;
  }, [level, dispatch]);

  return null;
};

export default LevelNotifier;
