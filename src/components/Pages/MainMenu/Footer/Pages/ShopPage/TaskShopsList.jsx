// src/data/TaskShopList.js
import React from 'react';
import {
  SmileOutlined,
  DollarOutlined,
  SolutionOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import { Descriptions } from 'antd';

/**
 * Объект задач для страницы HealthPage.
 * Ключи объекта - уникальные идентификаторы задач.
 * Каждая задача содержит:
 * - title: Название задачи
 * - description: Описание
 * - effects: Объект эффектов, которые применяются при выполнении задачи
 * - initialPrice: Стоимость выполнения задачи в долларах
 * - currency: Валюта цены ('usdt', 'btc', 'hbtrd')
 * - icon: Основная иконка задачи
 * - additionalIcon: Дополнительная иконка задачи
 */
export const TasksList = {
  task1: {
    title: 'Бесконечные ходы',
    description: 'Играй без ограничений.',
    initialPrice: 150,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <img src="./assets/page_icon/health/1.png" alt="icon" />,
    additionalIcon: <CarryOutOutlined />,
  },
  task2: {
    title: '500 ходов',
    description: 'Купить 500 ходов.',
    initialPrice: 50,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task3: {
    title: 'Восстановление',
    description: 'Полностью восстановить все характеристики.',
    effects: { health: 100, food: 100, fun: 100 },
    initialPrice: 50,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <SmileOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task4: {
    title: '5000 баксов',
    description: 'Купить 5000 игровых баксов.',
    initialPrice: 50,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task5: {
    title: '15000 баксов',
    description: 'Купить 15000 игровых баксов.',
    initialPrice: 100,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <CarryOutOutlined />,
    additionalIcon: <DollarOutlined />,
  },
  task6: {
    title: '150000 баксов',
    description: 'Купить 150000 игровых баксов.',
    initialPrice: 250,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <SmileOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  task7: {
    title: '2550000 баксов',
    description: 'Купить 2550000 игровых баксов.',
    initialPrice: 500,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task8: {
    title: '100000000 баксов',
    description: 'Купить 100000000 игровых баксов.',
    initialPrice: 2000,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  task9: {
    title: '1500000000 баксов',
    description: 'Купить 1500000000 игровых баксов.',
    initialPrice: 3500,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task10: {
    title: 'Удвоить объем кошелька',
    description: 'Увеличить текущий объем кошелька в 2 раза.',
    initialPrice: 100,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task11: {
    title: 'х10 объем кошелька',
    description: 'Увеличить текущий объем кошелька в 10 раз.',
    effects: {},
    initialPrice: 250,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task12: {
    title: 'Завести котенка',
    description: 'Приютить пушистика, поднимающего настроение.',
    initialPrice: 50,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  task13: {
    title: 'Завести щенка',
    description: 'Получить верного друга, поднимающего настроение.',
    initialPrice: 50,
    currency: 'hbtrd',
    requiredLevel: 0,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
};
