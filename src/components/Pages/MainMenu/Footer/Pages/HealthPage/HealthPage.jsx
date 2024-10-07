// src/pages/HealthPage.jsx
import React from 'react';
import styled from 'styled-components';
import { TasksList } from './TaskHealthList';
import TaskSection from './TaskHealthSection';

// Стили для страницы
const PageWrapper = styled.div`
  background-color: #f0f2f5;
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
  max-width: 1200px; /* Увеличенная ширина для большего количества задач */
  gap: 0.1rem; /* Отступ между задачами */
  padding: 0.5rem; /* Отступ от краёв */
`;

// Основной компонент страницы
const HealthPage = () => {
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
            />
          );
        })}
      </TaskWrapper>
    </PageWrapper>
  );
};

export default HealthPage;
