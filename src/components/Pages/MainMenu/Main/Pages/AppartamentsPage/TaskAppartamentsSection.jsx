import React from 'react';
import TaskSection from '../../../Footer/Pages/TaskSection';
import { AppartamentData } from './TaskApartList';

const TaskAppartamentsSection = ({ purchasedItems, onPurchase }) => {
  return (
    <div>
      {Object.entries(AppartamentData).map(([taskKey, taskData]) => (
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

export default TaskAppartamentsSection; 