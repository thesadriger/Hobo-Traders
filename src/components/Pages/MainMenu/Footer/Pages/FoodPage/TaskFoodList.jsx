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
    title: 'Забирать еду у голубей',
    effects: { food: 10 },
    initialPrice: 0, // Бесплатно
    currency: 'usdt',
    requiredLevel: 0,
    icon: <DollarOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  task2: {
    title: 'Пожрать на помойке',
    effects: { food: 10 },
    initialPrice: 0, // Бесплатно
    currency: 'usdt',
    requiredLevel: 3,
    icon: <DollarOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  task3: {
    title: 'Искать еду на улице',
    effects: { food: 10},
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 8,
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task4: {
    title: 'Попрошайничать у пельменной',
    effects: { food: 10 },
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 15,
    icon: <SmileOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task5: {
    title: 'Закупиться в "просрочке"',
    effects: { food: 10, fun: 5 },
    initialPrice: 5,
    currency: 'usdt',
    requiredLevel: 21,
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task6: {
    title: 'Купить шаурмы',
    effects: { food: 10 },
    initialPrice: 20,
    currency: 'usdt',
    requiredLevel: 29,
    icon: <CarryOutOutlined />,
    additionalIcon: <DollarOutlined />,
  },
  task7: {
    title: 'Пожрать в столовой',
    effects: { food: 10 },
    initialPrice: 30,
    currency: 'usdt',
    requiredLevel: 37,
    icon: <SmileOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  task8: {
    title: 'Сходить в Точку',
    effects: { food: 10 },
    initialPrice: 50,
    currency: 'usdt',
    requiredLevel: 47,
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task9: {
    title: 'Заказать еду',
    effects: { food: 10, fun: 5  },
    initialPrice: 100,
    currency: 'usdt',
    requiredLevel: 52,
    icon: <SmileOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task10: {
    title: 'Посетить ресторан',
    effects: { food: 10, fun: 5  },
    initialPrice: 1000,
    currency: 'usdt',
    requiredLevel: 61,
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task11: {
    title: 'Жениться',
    effects: { food: 10 },
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 64,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task12: {
    title: 'Личный повар',
    effects: { food: 10 },
    initialPrice: 500,
    currency: 'hbtrd',
    requiredLevel: 72,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task13: {
    title: 'Купить себе кафе',
    effects: { food: 10 },
    initialPrice: 9000,
    currency: 'hbtrd',
    requiredLevel: 75,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task14: {
    title: 'Купить себе ресторан',
    effects: { food: 10 },
    initialPrice: 100000,
    currency: 'hbtrd',
    requiredLevel: 78,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task15: {
    title: 'Основать сеть ресторанов',
    effects: { food: 10 },
    initialPrice: 800000,
    currency: 'usdt',
    requiredLevel: 80,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
};
