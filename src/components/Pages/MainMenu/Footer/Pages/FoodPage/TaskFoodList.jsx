// src/data/TaskFoodList.js
import React from 'react';
import {
  SmileOutlined,
  DollarOutlined,
  SolutionOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';

/**
 * Объект задач для страницы FoodPage.
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
    title: 'Пожрать на помойке',
    effects: { food: 10 },
    initialPrice: 0, // Бесплатно
    currency: 'usdt',
    requiredLevel: 0,
    icon: <DollarOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  task2: {
    title: 'Искать еду на улице',
    effects: { food: 10, fun: 5 },
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 8,
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task3: {
    title: 'Попрошайничать у пельменной',
    effects: { food: 10 },
    initialPrice: 5,
    currency: 'usdt',
    requiredLevel: 18,
    icon: <SmileOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task4: {
    title: 'Закупиться в "просрочке"',
    effects: { food: 10 },
    initialPrice: 10,
    currency: 'usdt',
    requiredLevel: 28,
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task5: {
    title: 'Купить шаурмы',
    effects: { food: 10 },
    initialPrice: 8,
    currency: 'usdt',
    requiredLevel: 38,
    icon: <CarryOutOutlined />,
    additionalIcon: <DollarOutlined />,
  },
  task6: {
    title: 'Пожрать в столовой',
    effects: { food: 10 },
    initialPrice: 2,
    currency: 'usdt',
    requiredLevel: 48,
    icon: <SmileOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  task7: {
    title: 'Сходить в Точку',
    effects: { food: 10 },
    initialPrice: 4,
    currency: 'usdt',
    requiredLevel: 47,
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task8: {
    title: 'Заказать еду',
    effects: { food: 10 },
    initialPrice: 0, // Бесплатно
    currency: 'usdt',
    requiredLevel: 52,
    icon: <SmileOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task9: {
    title: 'Посетить ресторан',
    effects: { food: 10 },
    initialPrice: 6, // 6$
    currency: 'usdt',
    requiredLevel: 61,
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task10: {
    title: 'Жениться',
    effects: { food: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    requiredLevel: 64,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task11: {
    title: 'Личный повар',
    effects: { food: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    requiredLevel: 72,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task12: {
    title: 'Купить себе кафе',
    effects: { food: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    requiredLevel: 75,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task13: {
    title: 'Купить себе ресторан',
    effects: { food: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    requiredLevel: 78,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task14: {
    title: 'Основать сеть ресторанов',
    effects: { food: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    requiredLevel: 80,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
};
