// src/data/TaskHealthList.js
import React from 'react';
import {
  SmileOutlined,
  DollarOutlined,
  SolutionOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';

/**
 * Объект задач для страницы HealthPage.
 * Ключи объекта - уникальные идентификаторы задач.
 * Каждая задача содержит:
 * - title: Название задачи
 * - effects: Объект эффектов, которые применяются при выполнении задачи
 * - initialPrice: Стоимость выполнения задачи в долларах
 * - currency: Валюта цены ('usdt', 'btc', 'hbtrd')
 * - icon: Основная иконка задачи
 * - additionalIcon: Дополнительная иконка задачи
 */
export const TasksList = {
  task1: {
    title: 'Поспать',
    effects: { health: 10 },
    initialPrice: 0, // Бесплатно
    currency: 'usdt',
    requiredLevel: 0,
    icon:<CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    additionalIcon: <CarryOutOutlined />,
  },
  task2: {
    title: 'Лечебные травы',
    effects: { health: 10, fun: 15 },
    initialPrice: 150, // Бесплатно
    currency: 'usdt',
    requiredLevel: 8,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    additionalIcon: <SmileOutlined />,
  },
  task3: {
    title: 'Заняться спортом',
    effects: { health: 10 },
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 15,
    icon: <SmileOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
  },
  task4: {
    title: 'Сделать пробежку',
    effects: { health: 10 },
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 21,
    icon: <SolutionOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SmileOutlined />,
  },
  task5: {
    title: 'Сходить на туники',
    effects: { health: 10, fun: 5 },
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 28,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <DollarOutlined />,
  },
  task6: {
    title: 'Вызвать скорую',
    effects: { health: 10 },
    initialPrice: 40,
    currency: 'usdt',
    requiredLevel: 30,
    icon: <SmileOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <CarryOutOutlined />,
  },
  task7: {
    title: 'Сходить в поликлинику',
    effects: { health: 10 },
    initialPrice: 50,
    currency: 'usdt',
    requiredLevel: 42,
    icon: <SolutionOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SmileOutlined />,
  },
  task8: {
    title: 'Пойти в фитнес-центр',
    effects: { health: 10 },
    initialPrice: 500,
    currency: 'usdt',
    requiredLevel: 48,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SmileOutlined />,
  },
  task9: {
    title: 'Персональный тренер',
    effects: { health: 10 },
    initialPrice: 100,
    currency: 'hbtrd',
    requiredLevel: 54,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
  },
  task10: {
    title: 'Посетить частный медцентр',
    effects: { health: 10, fun: 10},
    initialPrice: 1000,
    currency: 'hbtrd',
    requiredLevel: 65,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
  },
  task11: {
    title: 'Персональный врач',
    effects: {},
    initialPrice: 500,
    currency: 'hbtrd',
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    requiredLevel: 69,
  },
  task12: {
    title: 'Лечение за ганицей',
    effects: { health: 10, fun: 10, food: 10 },
    initialPrice: 5000,
    currency: 'hbtrd',
    requiredLevel: 75,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
  },
  task13: {
    title: 'Пересадка органов',
    effects: { health: 10 },
    initialPrice: 30000,
    currency: 'hbtrd',
    requiredLevel: 78,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
  },
  task14: {
    title: 'Генные модификации',
    effects: { health: 10 },
    initialPrice: 5000000,
    currency: 'hbtrd',
    requiredLevel: 79,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
  },
  task15: {
    title: 'Остановка старения',
    effects: { health: 10 },
    initialPrice: 9000000,
    currency: 'hbtrd',
    requiredLevel: 80,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
  },
};
