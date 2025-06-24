import React from 'react';
import TaskSection from '../../../Footer/Pages/TaskSection';
import { EducationData } from './TaskEducationList';

const TaskEducationSection = ({ purchasedItems, onPurchase }) => {
  return (
    <div>
      {Object.entries(EducationData).map(([taskKey, taskData]) => (
        <TaskSection
          key={taskKey}
          taskKey={taskKey}
          taskData={taskData}
          isPurchased={!!purchasedItems[taskKey]}
          onPurchase={() => onPurchase(taskKey)}
          mode="purchase"
        />
      ))}
    </div>
  );
};

export default TaskEducationSection; 