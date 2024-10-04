// src/data/TaskFoodList.js

import React from 'react';
import { SmileOutlined, DollarOutlined, SolutionOutlined, CarryOutOutlined, PlusOutlined } from '@ant-design/icons';

/**
 * Массив задач для страницы FoodPage.
 * Каждая задача содержит:
 * - title: Название задачи
 * - increase: Массив индикаторов, которые увеличиваются при выполнении задачи
 * - initialPrice: Начальная стоимость задачи
 * - icon: Основная иконка задачи
 * - additionalIcon: Дополнительная иконка задачи
 */
const tasks = [
  {
    id: 'task1',
    title: 'Купить мемкоин',
    effects: { food: 10 },
    initialPrice: 0,
    icon: <DollarOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  {
    id: 'task2',
    title: 'Продать ненужные вещи',
    effects: { food: 10, fun: 5 },
    initialPrice: 10,
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  {
    id: 'task3',
    title: 'Помочь соседям',
    effects: { food: 10 },
    initialPrice: 5,
    icon: <SmileOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  {
    id: 'task4',
    title: 'Сдать макулатуру',
    effects: { food: 10 },
    initialPrice: 3,
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  {
    id: 'task5',
    title: 'Подработать курьером',
    effects: { food: 10 },
    initialPrice: 8,
    icon: <CarryOutOutlined />,
    additionalIcon: <DollarOutlined />,
  },
  {
    id: 'task6',
    title: 'Участвовать в опросе',
    effects: { food: 10 },
    initialPrice: 2,
    icon: <SmileOutlined />,
    additionalIcon: <CarryOutOutlined />,
  },
  {
    id: 'task7',
    title: 'Принять участие в акции',
    effects: { food: 10 },
    initialPrice: 4,
    icon: <SolutionOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  {
    id: 'task8',
    title: 'Посетить бесплатный мастер-класс',
    effects: { food: 10 },
    initialPrice: 0,
    icon: <SmileOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  {
    id: 'task9',
    title: 'Найти временную работу',
    effects: { food: 10 },
    initialPrice: 6,
    icon: <CarryOutOutlined />,
    additionalIcon: <SmileOutlined />,
  },
  {
    id: 'task10',
    title: 'Найти временную работу 2',
    effects: { food: 10 },
    initialPrice: 7,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
  {
    id: 'task11',
    title: 'Выебать тебя в жопу',
    effects: { food: 10 },
    initialPrice: 7,
    icon: <CarryOutOutlined />,
    additionalIcon: <SolutionOutlined />,
  },
];

export default tasks;
