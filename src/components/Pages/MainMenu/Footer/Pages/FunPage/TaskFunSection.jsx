// src/components/TaskFunSection.jsx

import React from 'react';
import TaskSection from '../TaskSection';

const TaskFunSection = ({ taskKey, taskData }) => {
  const getRandomDeduction = () => {
    const rand = Math.random();
    if (rand < 0.6) {
      return Math.floor(Math.random() * 3) + 1; // 1-3
    } else if (rand < 0.9) {
      return Math.floor(Math.random() * 3) + 4; // 4-6
    } else {
      return Math.floor(Math.random() * 4) + 7; // 7-10
    }
  };

  const indicatorDeductions = {
    health: getRandomDeduction(),
    food: getRandomDeduction(),
  };

  return (
    <TaskSection
      taskKey={taskKey}
      taskData={taskData}
      indicatorDeductions={indicatorDeductions}
    />
  );
};

export default TaskFunSection;
