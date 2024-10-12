// src/components/LevelNotifier.jsx
import React, { useEffect, useRef } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { resetIndicators } from '@/store/slices/indicatorsSlice';
import './LevelNotifier.css'; // Импортируем файл стилей

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
      notification.open({
        message: `Поздравляем! Вы достигли нового уровня: ${currentFloor}`,
        placement: 'bottom',
        className: 'custom-notification', // Добавляем кастомный класс
      });
    }

    prevLevelRef.current = level;
  }, [level, dispatch]);

  return null;
};

export default LevelNotifier;
