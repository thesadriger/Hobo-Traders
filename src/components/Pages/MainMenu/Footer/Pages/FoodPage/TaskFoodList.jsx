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
    icon: <DollarOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <CarryOutOutlined />,
  },
  task2: {
    title: 'Пожрать на помойке',
    effects: { food: 10 },
    initialPrice: 0, // Бесплатно
    currency: 'usdt',
    requiredLevel: 3,
    icon: <DollarOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <CarryOutOutlined />,
  },
  task3: {
    title: 'Искать еду на улице',
    effects: { food: 10},
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 8,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SmileOutlined />,
  },
  task4: {
    title: 'Попрошайничать у пельменной',
    effects: { food: 10 },
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 15,
    icon: <SmileOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
    requirements: { },
  },
  task5: {
    title: 'Закупиться в "просрочке"',
    effects: { food: 10, fun: 5 },
    initialPrice: 50,
    currency: 'usdt',
    requiredLevel: 21,
    icon: <SolutionOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SmileOutlined />,
    requirements: { },
  },
  task6: {
    title: 'Купить шаурмы',
    effects: { food: 10 },
    initialPrice: 200,
    currency: 'usdt',
    requiredLevel: 29,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <DollarOutlined />,
    requirements: { },
  },
  task7: {
    title: 'Пожрать в столовой',
    effects: { food: 10 },
    initialPrice: 300,
    currency: 'usdt',
    requiredLevel: 37,
    icon: <SmileOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <CarryOutOutlined />,
    requirements: { },
  },
  task8: {
    title: 'Сходить в Точку',
    effects: { food: 10 },
    initialPrice: 500,
    currency: 'usdt',
    requiredLevel: 47,
    icon: <SolutionOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SmileOutlined />,
    requirements: { },
  },
  task9: {
    title: 'Заказать еду',
    effects: { food: 10, fun: 5  },
    initialPrice: 1000,
    currency: 'usdt',
    requiredLevel: 52,
    icon: <SmileOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
    requirements: {
      appartament: ['arendakomnaty', 'cherdak', 'podval', 'shalash'],
      education: ['nauchitsya_chitat']
    },
  },
  task10: {
    title: 'Посетить рестик',
    effects: { food: 10, fun: 5  },
    initialPrice: 10000,
    currency: 'usdt',
    requiredLevel: 61,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SmileOutlined />,
    requirements: { },
  },
  task11: {
    title: 'Жениться',
    effects: { food: 10 },
    initialPrice: 0,
    currency: 'usdt',
    requiredLevel: 64,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
    requirements: {
      appartament: ['arendakvartiry', 'arendakomnaty', 'cherdak'],
      education: ['treh_klassa', 'nauchitsya_chitat']
    },
  },
  task12: {
    title: 'Личный повар',
    effects: { food: 10 },
    initialPrice: 5000,
    currency: 'hbtrd',
    requiredLevel: 72,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
    requirements: {
      appartament: ['kvartira', 'arendakvartiry', 'arendakomnaty'],
      education: ['treh_klassa', 'nauchitsya_chitat']
    },
  },
  task13: {
    title: 'Купить себе кафе',
    effects: { food: 10 },
    initialPrice: 90000,
    currency: 'hbtrd',
    requiredLevel: 75,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
    requirements: {
      appartament: ['penthaus', 'kvartira', 'arendakvartiry'],
      education: ['treh_klassa', 'nauchitsya_chitat']
    },
  },
  task14: {
    title: 'Купить себе ресторан',
    effects: { food: 10 },
    initialPrice: 1000000,
    currency: 'hbtrd',
    requiredLevel: 78,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
    requirements: {
      appartament: ['penthaus', 'kvartira', 'arendakvartiry'],
      education: ['treh_klassa', 'nauchitsya_chitat']
    },
  },
  task15: {
    title: 'Основать сеть ресторанов',
    effects: { food: 10 },
    initialPrice: 8000000,
    currency: 'usdt',
    requiredLevel: 80,
    icon: <CarryOutOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>,
    additionalIcon: <SolutionOutlined />,
    requirements: {
      appartament: ['nedvizhimostzagr', 'kottedzh', 'penthaus', 'kvartira', 'arendakvartiry']
    },
  },
};
