// src/components/TaskSection.jsx
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Button, Spin, Card, message } from 'antd';
import styled, { keyframes, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { increaseFood, increaseFun, increaseHealth, decreaseFun, decreaseFood, decreaseHealth, resetIndicators } from '@/store/slices/indicatorsSlice';
import { decreaseUSDT, decreaseBTC, decreaseHBTRD} from '@/store/slices/balanceSlice'; // Импортируем действия для уменьшения баланса
import { increaseLevel } from '@/store/slices/levelSlice';
import { PlusOutlined, LockOutlined } from '@ant-design/icons';


// Анимация пульсации кнопки
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

// Контейнер для иконки задачи
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
  flex: 1; /* Occupies remaining space */
  margin-left: 1rem;
  overflow: hidden; /* Prevents content overflow */
  min-width: 0; /* Allows the container to shrink below its content width */
`;
// Контейнер для дополнительных элементов
const SubContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Маленький прямоугольник с кругом "+"
const ActionInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: #424242; /* Темный фон */
  border-radius: 0.25rem;
  padding: 0.20rem 0.20rem;
  margin-right: 0.5rem;
`;

// Круглый контейнер для символа "+"
const CircleIcon = styled.div`
  width: 15px;
  height: 15px;
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

// Обертка для содержимого карточки
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  filter: ${({ isLocked }) => (isLocked ? 'blur(2px)' : 'none')};
  pointer-events: ${({ isLocked }) => (isLocked ? 'none' : 'auto')};
`;

// Карточка задачи
const TaskCard = styled(Card)`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 600px;
  margin: 0.15rem;
  position: relative; // Для позиционирования оверлея

  &:hover {
    background-color: #f0f0f0;
  }

  .ant-card-body {
    display: flex;
    align-items: center;
    padding: 0;
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
  }
`;

// Заголовок задачи с анимацией прокрутки
const TaskTitle = styled.span`
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  font-weight: bold;
  color: #181818; /* Dark text */
  white-space: nowrap; /* Prevents text wrapping */
  overflow: hidden; /* Hides overflowed text */
  text-overflow: ellipsis; /* Adds ellipsis when text overflows */
  position: relative;
`;

// Кнопка задачи с анимацией пульсации
const TaskButton = styled(Button)`
  position: relative;
  width: 80px;
  height: 35px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  margin-left: auto; /* Отодвигаем кнопку вправо */

  ${({ isAnimating }) =>
    isAnimating &&
    css`
      animation: ${pulseAnimation} 2s infinite;
    `}

  @media (max-width: 768px) {
    height: 40px;
    font-size: 14px;
    margin-left: 0; /* Убираем отступ для мобильных */
    margin-top: 0.5rem;
  }
`;

// Wrapper для TaskTitle, чтобы определить, нужно ли прокручивать текст
const TaskTitleWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(50, 50, 50, 0.7); // Полупрозрачный темный фон
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: 0.625rem;
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const OverlayText = styled.div`
  color: #ffffff;
  font-size: 1rem;
  margin-top: 0.5rem;
  text-align: center;
`;

// Функция для форматирования баланса с суффиксами и валютой
const formatBalance = (number, currency) => {
    let suffix = '';
    switch (currency) {
      case 'btc':
        suffix = ' BTC';
        break;
      case 'hbtrd':
        suffix = ' HBTRD';
        break;
      case 'usdt':
      default:
        suffix = '$';
        break;
    }
  
    if (number >= 1_000_000_000_000) {
      return `${(number / 1_000_000_000_000).toFixed(2)}TB${suffix}`;
    } else if (number >= 1_000_000_000) {
      return `${(number / 1_000_000_000).toFixed(2)}GB${suffix}`;
    } else if (number >= 1_000_000) {
      return `${(number / 1_000_000).toFixed(2)}M${suffix}`;
    } else if (number >= 1_000) {
      return `${(number / 1_000).toFixed(2)}K${suffix}`;
    } else {
      return `${number}${suffix}`;
    }
  };

// Функция для генерации случайного уменьшения с заданными вероятностями
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

// Компонент для отображения одной задачи
const TaskSection = ({ taskKey, taskData }) => {
    const { title, effects, initialPrice, currency, icon, additionalIcon, requiredLevel } = taskData;
    const dispatch = useDispatch();
    const level = useSelector((state) => state.level.level);
    const balance = useSelector((state) => state.balance); // Получаем баланс пользователя

    const isTaskUnlocked = level >= requiredLevel; // Проверяем, доступна ли задача
  
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isTaskActive, setIsTaskActive] = useState(false);
    const [randomValue, setRandomValue] = useState(null);
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);
    const [fontSize, setFontSize] = useState(1); // Starting font size in rem units
    const hasAdjustedFontSize = useRef(false); // To prevent infinite loops

    const titleRef = useRef(null);
  
  
  
    // Проверка переполнения текста
    useLayoutEffect(() => {
      if (titleRef.current && !hasAdjustedFontSize.current) {
        let currentFontSize = fontSize;
        const minFontSize = 0.4; // Minimum font size in rem units
        const titleElement = titleRef.current;
  
        const adjustFontSize = () => {
          const isOverflown = titleElement.scrollWidth > titleElement.clientWidth;
          if (isOverflown && currentFontSize > minFontSize) {
            currentFontSize -= 0.05;
            setFontSize(currentFontSize);
          } else {
            hasAdjustedFontSize.current = true;
          }
        };
  
        adjustFontSize();
      }
    }, [title, fontSize]);
  
  
    const handleTaskAction = () => {
      // Проверяем, достаточно ли средств для выполнения задачи
      if (balance[currency] < initialPrice) {
        message.error('Недостаточно средств. Время торговли!');
        return;
      }
  
      setIsButtonDisabled(true);
      setIsTaskActive(true);
  
      // Имитация процесса выполнения задачи
      setTimeout(() => {
        // Вычитаем цену задачи из баланса
        if (initialPrice > 0) {
          switch (currency) {
            case 'btc':
              dispatch(decreaseBTC(initialPrice));
              break;
            case 'hbtrd':
              dispatch(decreaseHBTRD(initialPrice));
              break;
            case 'usdt':
            default:
              dispatch(decreaseUSDT(initialPrice));
              break;
          }
          // message.success(
          //   `Вы заплатили ${formatBalance(initialPrice, currency)} за выполнение задачи.`
          // );
        }
  
        const randomNum = Math.floor(Math.random() * 100) + 1; // Пример случайного значения
        setRandomValue(`+${randomNum}$`);
        if (effects.health) {
          dispatch(increaseHealth(effects.health));
        }
        if (effects.fun) {
          dispatch(increaseFun(effects.fun));
        }
        if (effects.food) {
          dispatch(increaseFood(effects.food));
        }
  
        // Уменьшаем индикаторы
        const healthDeduction = getRandomDeduction();
        const funDeduction = getRandomDeduction();
  
        dispatch(decreaseHealth(healthDeduction));
        dispatch(decreaseFun(funDeduction));
  
        // Увеличиваем уровень
        const increment = 0.01;
        dispatch(increaseLevel(increment));
  
        // Включаем кнопку обратно и останавливаем анимацию
        setIsButtonDisabled(false);
        setIsTaskActive(false);
        setIsTextVisible(false);
        setRandomValue(null);
      }, 500); // Задержка 0.5 секунды для имитации процесса
    };
  
    return (
      <TaskCard>
        {!isTaskUnlocked && (
          <Overlay>
            <OverlayContent>
              <LockOutlined style={{ fontSize: '2rem', color: '#ffffff' }} />
              <OverlayText>Требуется уровень {requiredLevel}</OverlayText>
            </OverlayContent>
          </Overlay>
        )}
        <ContentWrapper isLocked={!isTaskUnlocked}>
        {/* Контейнер для основной иконки задачи */}
        <IconContainer>{icon}</IconContainer>
  
        {/* Контейнер для информации о задаче */}
        <TaskInfo>
          <TaskTitleWrapper>
            <TaskTitle ref={titleRef} isOverflow={isOverflow}>
              {title}
            </TaskTitle>
          </TaskTitleWrapper>
          <SubContainer>
            {/* Маленький прямоугольник с кругом "+" */}
            <ActionInfo>
              <CircleIcon>
                <PlusOutlined style={{ fontSize: '8px' }} />
              </CircleIcon>
              {/* Дополнительный контейнер для иконки */}
              <AnotherIconContainer>{additionalIcon}</AnotherIconContainer>
            </ActionInfo>
          </SubContainer>
        </TaskInfo>
  
        {/* Кнопка "СДЕЛАТЬ" с ценой */}
        <TaskButton
           type="primary"
           onClick={handleTaskAction}
           disabled={isButtonDisabled || !isTaskUnlocked}
           isAnimating={isTaskActive}
        >
          {isTaskActive ? (
            <Spin size="small" />
          ) : initialPrice > 0 ? (
            ` ${formatBalance(initialPrice, currency)}`
          ) : (
            'Сделать'
          )}
        </TaskButton>
        </ContentWrapper>
      </TaskCard>
    );
  };
  
  export default TaskSection;