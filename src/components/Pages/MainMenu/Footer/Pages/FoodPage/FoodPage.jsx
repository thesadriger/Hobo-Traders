// src/pages/FoodPage.jsx
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Button, Spin, Card } from 'antd';
import styled, { keyframes, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { increaseFood, increaseFun, decreaseHealth, decreaseFun, resetIndicators } from '@/store/slices/indicatorsSlice';
import { increaseLevel } from '@/store/slices/levelSlice';

// Импорт иконок из antd
import { SmileOutlined, DollarOutlined, SolutionOutlined, CarryOutOutlined, PlusOutlined } from '@ant-design/icons';

// Импорт списка задач
import tasks from './TaskFoodList';

// Styled Components

const PageWrapper = styled.div`
  padding: 1rem;
  background-color: #323232; /* Соответствует ExchangePage */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px; /* Максимальная ширина аналогична ExchangePage */
  gap: 1rem;
  flex: 1; /* Занимает оставшееся пространство */
  overflow-y: auto; /* Добавляем вертикальную прокрутку */
`;

// Анимация прокрутки текста
const scrollLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Анимация пульсации для кнопки
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Контейнер для основной иконки задачи
const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  background-color: #4096ff; /* Цвет фона иконки */
  border-radius: 0.5rem; /* Округлые края */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0; /* Не сжимается */
`;

// Контейнер для информации о задаче
const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* Занимает оставшееся пространство */
  margin-left: 1rem;
  overflow: hidden; /* Для предотвращения выхода содержимого */
`;

// Контейнер для подзаголовка
const SubContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Маленький прямоугольник с кругом внутри
const ActionInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: #424242; /* Темный фон */
  border-radius: 0.25rem;
  padding: 0.25rem 0.25rem;
  margin-right: 0.5rem;
`;

// Круглый контейнер для символа "+"
const CircleIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #4096ff; /* Цвет круга */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff; /* Белый цвет символа "+" */
  margin-right: 0.25rem;
  flex-shrink: 0; /* Не сжимается */
`;

// Контейнер для дополнительной иконки
const AnotherIconContainer = styled.div`
  width: 20px;
  height: 20px;
  background-color: #d1d1d1; /* Цвет фона */
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0; /* Не сжимается */

  & > svg {
    color: #4096ff; /* Цвет иконки */
    font-size: 1rem;
  }
`;

// Карточка задачи с обновлённым макетом
const TaskCard = styled(Card)`
  display: flex;
  align-items: center;
  background-color: #ffffff; /* Светлый фон */
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  padding: 0.25rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0; /* Немного тёмнее при наведении */
  }

  /* Стили для внутреннего .ant-card-body */
  .ant-card-body {
    display: flex;
    align-items: center;
    padding: 0; /* Убираем внутренние отступы */
    width: 100%;
  }
`;

// Заголовок задачи с анимацией прокрутки
const TaskTitle = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #181818; /* Тёмный текст */
  white-space: nowrap; /* Предотвращает перенос текста */
  overflow: hidden; /* Скрывает переполненный текст */
  text-overflow: ellipsis; /* Добавляет многоточие при переполнении */
  position: relative;

  /* Если текст длиннее контейнера, запускаем анимацию прокрутки */
  animation: ${({ isOverflow }) => (isOverflow ? css`${scrollLeft} 10s linear infinite` : 'none')};
`;

// Кнопка задачи с анимацией пульсации
const TaskButton = styled(Button)`
  position: relative;
  width: 80px;
  height: 25px;
  font-size: 16px;
  transition: all 0.5s ease-in-out;

  ${({ isAnimating }) =>
    isAnimating &&
    css`
      animation: ${pulseAnimation} 2s infinite;
    `}

  @media (max-width: 768px) {
    height: 40px;
    font-size: 14px;
  }
`;

// Wrapper для TaskTitle, чтобы определить, нужно ли прокручивать текст
const TaskTitleWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

// Функция для случайного уменьшения индикаторов
const getRandomDeduction = () => {
  const rand = Math.random();
  if (rand < 0.6) {
    return Math.floor(Math.random() * 3) + 1; // 1-3
  } else if (rand < 0.9) {
    return Math.floor(Math.random() * 3) + 4; // 4-6
  } else {
    return Math.floor(Math.random() * 4) + 7; // 7-10
  }
};

// Отдельный компонент для каждой задачи
const TaskItem = React.memo(({ task, index, handleTaskAction, isButtonDisabled, isTaskActive }) => {
  const titleRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  // Используем useLayoutEffect для измерения размеров элемента
  useLayoutEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current) {
        setIsOverflow(titleRef.current.scrollWidth > titleRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [task.title]);

  return (
    <TaskCard>
      {/* Контейнер для основной иконки задачи */}
      <IconContainer>
        {task.icon}
      </IconContainer>

      {/* Контейнер для информации о задаче */}
      <TaskInfo>
        <TaskTitleWrapper>
          <TaskTitle ref={titleRef} isOverflow={isOverflow}>
            {task.title}
          </TaskTitle>
        </TaskTitleWrapper>
        <SubContainer>
          {/* Маленький прямоугольник с кругом "+" */}
          <ActionInfo>
            <CircleIcon>
              <PlusOutlined style={{ fontSize: '8px' }} />
            </CircleIcon>
            {/* Дополнительный контейнер для иконки */}
            <AnotherIconContainer>
              {task.additionalIcon}
            </AnotherIconContainer>
          </ActionInfo>
        </SubContainer>
      </TaskInfo>

      {/* Кнопка "СДЕЛАТЬ" */}
      <TaskButton
        type="primary"
        onClick={() => handleTaskAction(index)}
        disabled={isButtonDisabled}
        isAnimating={isTaskActive}
      >
        {isTaskActive ? <Spin size="small" /> : 'Сделать'}
      </TaskButton>
    </TaskCard>
  );
});

const FoodPage = () => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState(
    Array(tasks.length).fill(false)
  ); // Массив для управления состоянием каждой кнопки
  const [isTaskActive, setIsTaskActive] = useState(
    Array(tasks.length).fill(false)
  ); // Массив для управления анимацией каждой кнопки
  const [taskList, setTaskList] = useState(tasks);

  const level = useSelector((state) => state.level.level);
  const indicators = useSelector((state) => state.indicators);

  useEffect(() => {
    // Прокрутка к началу при монтировании компонента
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const handleTaskAction = (index) => {
    // Отключаем кнопку и запускаем анимацию
    const newIsButtonDisabled = [...isButtonDisabled];
    newIsButtonDisabled[index] = true;
    setIsButtonDisabled(newIsButtonDisabled);

    const newIsTaskActive = [...isTaskActive];
    newIsTaskActive[index] = true;
    setIsTaskActive(newIsTaskActive);

    // Выполняем действия после небольшой задержки (например, 500ms для имитации процесса)
    setTimeout(() => {
      // Увеличиваем индикаторы, указанные в задаче
      Object.entries(taskList[index].effects).forEach(([indicator, value]) => {
        switch (indicator) {
          case 'food':
            dispatch(increaseFood(value));
            break;
          case 'fun':
            dispatch(increaseFun(value));
            // Убедитесь, что экшен increaseFun добавлен в ваш Redux slice
            break;
          // Добавьте другие индикаторы по необходимости
          default:
            break;
        }
      });

      // Уменьшаем индикаторы здоровья и веселья
      const healthDeduction = getRandomDeduction();
      const funDeduction = getRandomDeduction();

      dispatch(decreaseHealth(healthDeduction));
      dispatch(decreaseFun(funDeduction));

      // Увеличиваем уровень на 0.02
      const previousLevel = level;
      const increment = 0.02;
      dispatch(increaseLevel(increment));

      const newLevel = parseFloat((previousLevel + increment).toFixed(3));

      // Проверяем, достиг ли уровень нового целого числа
      if (Math.floor(newLevel + 0.0001) > Math.floor(previousLevel + 0.0001)) {
        dispatch(resetIndicators());
      }

      // Включаем кнопку обратно и останавливаем анимацию
      const updatedIsButtonDisabled = [...isButtonDisabled];
      updatedIsButtonDisabled[index] = false;
      setIsButtonDisabled(updatedIsButtonDisabled);

      const updatedIsTaskActive = [...isTaskActive];
      updatedIsTaskActive[index] = false;
      setIsTaskActive(updatedIsTaskActive);
    }, 500); // Задержка 0.5 секунды
  };

  return (
    <PageWrapper>
      <TaskListWrapper ref={containerRef}>
        {taskList.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            handleTaskAction={handleTaskAction}
            isButtonDisabled={isButtonDisabled[index]}
            isTaskActive={isTaskActive[index]}
          />
        ))}
      </TaskListWrapper>
    </PageWrapper>
  );
};

export default FoodPage;
