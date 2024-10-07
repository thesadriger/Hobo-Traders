// src/data/TaskFunList.js
import React from 'react';
import {
  SmileOutlined,
  DollarOutlined,
  SolutionOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';

/**
 * Объект задач для страницы FunPage.
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
    title: 'Пукнуть в автобусе',
    effects: { fun: 10 },
    initialPrice: 0, // Бесплатно
    currency: 'usdt',
    icon: <DollarOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  task2: {
    title: 'Рыгнуть в столовой',
    effects: { fun: 10, health: 5 },
    initialPrice: 0, // Бесплатно
    currency: 'usdt',
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task3: {
    title: 'Ляпнуть пиваса',
    effects: { fun: 10, food: 5 },
    initialPrice: 5, // 5$
    currency: 'usdt',
    icon: <SmileOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task4: {
    title: 'Свернуть унитаз',
    effects: { fun: 10 },
    initialPrice: 10, // 9.99$
    currency: 'usdt',
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  // Добавьте остальные задачи аналогично
  task5: {
    title: 'Надуть на памятник',
    effects: { fun: 10 },
    initialPrice: 8, // 8$
    currency: 'usdt',
    icon: <CarryOutOutlined />,
    additionalIcon: <DollarOutlined />,
  },
  task6: {
    title: 'Выпить водки',
    effects: { fun: 10 },
    initialPrice: 2, // 2$
    currency: 'usdt',
    icon: <SmileOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  task7: {
    title: 'Сходить в кино',
    effects: { fun: 10 },
    initialPrice: 4, // 4$
    currency: 'usdt',
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task8: {
    title: 'Залить вискаря',
    effects: { fun: 10 },
    initialPrice: 0, // Бесплатно
    currency: 'usdt',
    icon: <SmileOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task9: {
    title: 'Сходить в паб',
    effects: { fun: 10 },
    initialPrice: 6, // 6$
    currency: 'usdt',
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task10: {
    title: 'Устроить "фейерверк"',
    effects: { fun: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task11: {
    title: 'Заказать массовую драку',
    effects: { fun: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task12: {
    title: 'Раздеть всех девушек в клубе',
    effects: { fun: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task13: {
    title: 'Избить Бибера',
    effects: { fun: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task14: {
    title: 'Напиться с любимым актером',
    effects: { fun: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task15: {
    title: 'Купаться в шампанском с мисс мира',
    effects: { fun: 10 },
    initialPrice: 7, // 7$
    currency: 'usdt',
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
};
