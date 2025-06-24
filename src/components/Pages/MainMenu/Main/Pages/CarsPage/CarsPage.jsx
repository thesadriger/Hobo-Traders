// CarsPage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { CarsData } from './TaskCarsList';
import { FixedSizeList as List } from 'react-window';
import TaskSection from '/src/components/Pages/MainMenu/Footer/Pages/TaskSection';

const CenteredListContainer = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      ...props.style,
    }}
    {...props}
  />
));

// Стили для страницы
const PageWrapper = styled.div`
  background: transparent;
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
  padding-bottom: 95px;
  background: transparent;
`;

const getListWidth = () => window.innerWidth;

const getDockHeight = () => (window.innerWidth <= 600 ? 90 : 70);

const getListHeight = (taskCount, itemSize) => {
  const dockHeight = getDockHeight();
  const bottomGap = 40; // небольшой запас
  const maxHeight = window.innerHeight - dockHeight - bottomGap;
  const totalHeight = taskCount * itemSize;
  return Math.min(totalHeight, maxHeight);
};

const CarsPage = () => {
  const [purchasedItems, setPurchasedItems] = useState({});
  const taskKeys = Object.keys(CarsData);
  const [listWidth, setListWidth] = React.useState(getListWidth());
  const [listHeight, setListHeight] = React.useState(getListHeight(taskKeys.length, 110));

  React.useEffect(() => {
    const handleResize = () => {
      setListWidth(getListWidth());
      setListHeight(getListHeight(taskKeys.length, 110));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [taskKeys.length]);

  const handlePurchase = (itemKey) => {
    setPurchasedItems((prev) => ({ ...prev, [itemKey]: true }));
  };

  return (
    <PageWrapper>
      <TaskWrapper>
        <List
          height={listHeight}
          itemCount={taskKeys.length}
          itemSize={90}
          width={listWidth}
          outerElementType={CenteredListContainer}
          style={{ margin: '0 auto', width: listWidth }}
        >
          {({ index, style }) => {
            const taskKey = taskKeys[index];
            const taskData = CarsData[taskKey];
            return (
              <div
                style={{
                  ...style,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
                key={taskKey}
              >
                <TaskSection
                  taskKey={taskKey}
                  taskData={taskData}
                  isPurchased={!!purchasedItems[taskKey]}
                  onPurchase={() => handlePurchase(taskKey)}
                  mode="purchase"
                />
              </div>
            );
          }}
        </List>
      </TaskWrapper>
    </PageWrapper>
  );
};

export default CarsPage;
