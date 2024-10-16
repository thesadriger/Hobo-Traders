// src/pages/FoodPage.jsx
import React from 'react';
import styled from 'styled-components';
import { TasksList } from './TaskFoodList';
import TaskFoodSection from './TaskFoodSection';

// Стили для страницы
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.pageBackground};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Обертка для задач
const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.large}; /* Используем точку останова из темы */
  gap: 0.1rem; /* Отступ между задачами */
  padding: ${({ theme }) => theme.sizes.paddingSmall}; /* Отступ от краёв */
`;

// Основной компонент страницы
const FoodPage = () => {
  return (
    <PageWrapper>
      <TaskWrapper>
        {Object.keys(TasksList).map((taskKey) => {
          const taskData = TasksList[taskKey];
          return (
            <TaskFoodSection
              key={taskKey}
              taskKey={taskKey}
              taskData={taskData}
            />
          );
        })}
      </TaskWrapper>
    </PageWrapper>
  );
};

export default FoodPage;
