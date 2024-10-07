// src/components/LevelNotifier.jsx
import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { resetIndicators } from '@/store/slices/indicatorsSlice';

const LevelNotifier = () => {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.level.level);
  const prevLevelRef = useRef(level);

  useEffect(() => {
    const previousLevel = prevLevelRef.current;
    const previousFloor = Math.floor(previousLevel);
    const currentFloor = Math.floor(level);

    if (currentFloor > previousFloor) {
      dispatch(resetIndicators());
      message.info(`Поздравляем! Вы достигли нового уровня: ${currentFloor}`);
    }

    // Обновляем предыдущий уровень
    prevLevelRef.current = level;
  }, [level, dispatch]);

  return null; // Этот компонент не рендерит ничего
};

export default LevelNotifier;
