// src/components/TaskFoodSection.jsx

import React from 'react';
import TaskSection from '../TaskSection';

// Компонент TaskFoodSection отображает секцию задачи, связанную с едой
const TaskFoodSection = ({ taskKey, taskData }) => {
  // Функция getRandomDeduction генерирует случайное число для уменьшения показателей
  const getRandomDeduction = () => {
    const rand = Math.random(); // Генерируем случайное число от 0 до 1
    if (rand < 0.6) {
      return Math.floor(Math.random() * 3) + 1; // С вероятностью 60% возвращает число от 1 до 3
    } else if (rand < 0.9) {
      return Math.floor(Math.random() * 3) + 4; // С вероятностью 30% возвращает число от 4 до 6
    } else {
      return Math.floor(Math.random() * 4) + 7; // С вероятностью 10% возвращает число от 7 до 10
    }
  };

  // Объект indicatorDeductions содержит случайные значения уменьшения показателей здоровья и веселья
  const indicatorDeductions = {
    health: getRandomDeduction(),
    fun: getRandomDeduction(),
  };

  // Возвращаем компонент TaskSection с переданными данными задачи и случайными уменьшениями показателей
  return (
    <div>
      <TaskSection
        taskKey={taskKey}
        taskData={taskData}
        indicatorDeductions={indicatorDeductions}
      />
    </div>
  );
};

export default TaskFoodSection;
