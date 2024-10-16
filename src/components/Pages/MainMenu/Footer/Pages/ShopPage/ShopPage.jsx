// src/components/Pages/MainMenu/Footer/Pages/ShopPage.jsx
import React from 'react';
import styled from 'styled-components';
import { TasksList } from './TaskShopsList';
import TaskShopSection from './TaskShopSection';

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
  max-width: ${({ theme }) => theme.breakpoints.large};
  gap: 0.1rem;
  padding: ${({ theme }) => theme.sizes.paddingSmall};
`;

// Основной компонент страницы
const ShopPage = () => {
  return (
    <PageWrapper>
      <TaskWrapper>
        {Object.keys(TasksList).map((taskKey) => {
          const taskData = TasksList[taskKey];
          return (
            <TaskShopSection
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

export default ShopPage;
