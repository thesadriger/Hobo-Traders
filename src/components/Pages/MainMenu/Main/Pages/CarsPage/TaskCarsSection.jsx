import React from 'react';
import TaskSection from '../../../Footer/Pages/TaskSection';
import { CarsData } from './TaskCarsList';

const TaskCarsSection = ({ purchasedItems, onPurchase }) => {
  return (
    <div>
      {Object.entries(CarsData).map(([taskKey, taskData]) => (
        <TaskSection
          key={taskKey}
          taskKey={taskKey}
          taskData={taskData}
          isPurchased={!!purchasedItems[taskKey]}
          onPurchase={() => onPurchase(taskKey)}
          mode="purchase"
          purchasedItems={purchasedItems}
        />
      ))}
    </div>
  );
};

export default TaskCarsSection; 