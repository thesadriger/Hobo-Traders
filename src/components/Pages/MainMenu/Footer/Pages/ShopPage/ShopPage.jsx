// src/components/Pages/MainMenu/Footer/Pages/ShopPage.jsx
import React from 'react';
import styled from 'styled-components';
import { TasksList } from './TaskShopsList';
import TaskSection from '../TaskSection';

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
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.large};
  gap: 0.1rem;
  padding: ${({ theme }) => theme.sizes.paddingSmall};
  padding-bottom: 110px;
  @media (max-width: 600px) {
    padding-bottom: 95px;
  }
`;

// Основной компонент страницы
const ShopPage = () => {
  return (
    <PageWrapper>
      <TaskWrapper>
        {Object.keys(TasksList).map((taskKey) => {
          const taskData = TasksList[taskKey];
          return (
            <TaskSection
              key={taskKey}
              taskKey={taskKey}
              taskData={taskData}
              mode="purchase"
            />
          );
        })}
      </TaskWrapper>
    </PageWrapper>
  );
};

export default ShopPage;
