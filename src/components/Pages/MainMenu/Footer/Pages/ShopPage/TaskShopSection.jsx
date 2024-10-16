// src/components/Pages/MainMenu/Footer/Pages/TaskShopSection.jsx
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Card, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { increaseFood, increaseFun, increaseHealth, decreaseFun, decreaseFood, decreaseHealth, resetIndicators } from '@/store/slices/indicatorsSlice';
import { decreaseUSDT, decreaseBTC, decreaseHBTRD} from '@/store/slices/balanceSlice'; // Импортируем действия для уменьшения баланса
import { increaseLevel } from '@/store/slices/levelSlice';
import { PlusOutlined, LockOutlined } from '@ant-design/icons';
import { FaStar } from 'react-icons/fa';
import DonateButton from '@/components/Pages/Elements/DonateButton';

// Контейнер для иконки задачи
const IconContainer = styled.div`
  width: ${({ theme }) => theme.sizes.iconSize};
  height: ${({ theme }) => theme.sizes.iconSize};
  background-color: ${({ theme }) => theme.colors.iconBackground}; /* Цвет фона иконки */
  border-radius: ${({ theme }) => theme.borderRadius.icon}; /* Округлые края */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

// Контейнер для информации о задаче
const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1rem;
  overflow: hidden;
  min-width: 0;
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
  background-color: ${({ theme }) => theme.colors.darkBackground}; /* Темный фон */
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 0.2rem 0.2rem;
  margin-right: ${({ theme }) => theme.sizes.marginSmall};
`;

// Круглый контейнер для символа "+"
const CircleIcon = styled.div`
  width: ${({ theme }) => theme.sizes.circleIconSize};
  height: ${({ theme }) => theme.sizes.circleIconSize};
  background-color: ${({ theme }) => theme.colors.iconBackground}; /* Цвет круга */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.circleIconColor}; /* Белый цвет символа "+" */
  margin-right: 0.25rem;
  flex-shrink: 0;
`;

// Контейнер для дополнительной иконки
const AnotherIconContainer = styled.div`
  width: ${({ theme }) => theme.sizes.anotherIconSize};
  height: ${({ theme }) => theme.sizes.anotherIconSize};
  background-color: ${({ theme }) => theme.colors.additionalIconBackground}; /* Цвет фона */
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  & > svg {
    color: ${({ theme }) => theme.colors.iconBackground}; /* Цвет иконки */
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
  background-color: ${({ theme }) => theme.colors.taskCardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  box-shadow: ${({ theme }) => theme.shadows.cardShadow};
  padding: ${({ theme }) => theme.sizes.paddingSmall};
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 600px;
  margin: 0.15rem;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBackground};
  }

  .ant-card-body {
    display: flex;
    align-items: center;
    padding: 0;
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
  }
`;

// Заголовок задачи с анимацией прокрутки
const TaskTitle = styled.span`
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryText}; /* Темный текст */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
`;


// Обертка для TaskTitle
const TaskTitleWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

// Обёртка для недоступных задач
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.overlayBackground}; // Полупрозрачный голубой фон
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: ${({ theme }) => theme.borderRadius.card};
`;

const OverlayContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > *:not(:last-child) {
    margin-right: 8px; /* Отступ между замочком и уровнем */
  }
`;

const OverlayText = styled.div`
  color: ${({ theme }) => theme.colors.overlayTextColor};
  font-size: ${({ theme }) => theme.fonts.sizes.overlayLevel};
  text-align: center;
  display: flex;
  align-items: center;

  svg {
    font-size: ${({ theme }) => theme.fonts.sizes.overlayStar};
    margin-left: 4px;
    color: ${({ theme }) => theme.colors.starIconColor};
  }
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

  // Компонент для отображения одной задачи
  const TaskShopSection = ({
    taskKey,
    taskData,
    indicatorDeductions,
    afterTaskAction,
  }) => {
    const {
      title,
      effects,
      initialPrice,
      currency,
      icon,
      additionalIcon,
      requiredLevel,
    } = taskData;
  
    const dispatch = useDispatch();
    const level = useSelector((state) => state.level.level);
    const balance = useSelector((state) => state.balance); // Получаем баланс пользователя
  
    const isTaskUnlocked = level >= requiredLevel; // Проверяем, доступна ли задача
  
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isTaskActive, setIsTaskActive] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);
    const [fontSize, setFontSize] = useState(1); // Начальный размер шрифта
    const hasAdjustedFontSize = useRef(false); // Чтобы предотвратить бесконечные циклы
  
    const titleRef = useRef(null);
  
    // Проверка переполнения текста (остается без изменений)
    useLayoutEffect(() => {
      if (titleRef.current && !hasAdjustedFontSize.current) {
        let currentFontSize = fontSize;
        const minFontSize = 0.4; // Минимальный размер шрифта
        const titleElement = titleRef.current;
  
        const adjustFontSize = () => {
          const isOverflown =
            titleElement.scrollWidth > titleElement.clientWidth;
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
        }
  
        // Применяем эффекты задачи
        if (effects.health) {
          dispatch(increaseHealth(effects.health));
        }
        if (effects.fun) {
          dispatch(increaseFun(effects.fun));
        }
        if (effects.food) {
          dispatch(increaseFood(effects.food));
        }
  
        // Уменьшаем индикаторы на основе переданных значений
        if (indicatorDeductions) {
          Object.entries(indicatorDeductions).forEach(
            ([indicator, deduction]) => {
              switch (indicator) {
                case 'health':
                  dispatch(decreaseHealth(deduction));
                  break;
                case 'fun':
                  dispatch(decreaseFun(deduction));
                  break;
                case 'food':
                  dispatch(decreaseFood(deduction));
                  break;
                default:
                  break;
              }
            }
          );
        }
  
        // Увеличиваем уровень
        const increment = 0.01;
        dispatch(increaseLevel(increment));
  
        // Выполняем дополнительное действие, если оно передано
        if (afterTaskAction && typeof afterTaskAction === 'function') {
          afterTaskAction();
        }
  
        // Сбрасываем состояния
        setIsButtonDisabled(false);
        setIsTaskActive(false);
        setIsTextVisible(false);
      }, 500); // Задержка 0.5 секунды для имитации процесса
    };
  
    return (
      <TaskCard>
        {!isTaskUnlocked && (
          <Overlay>
            <OverlayContent>
              <LockOutlined style={{ fontSize: '1.5rem', color: '#ffffff' }} />
              <OverlayText>
                {requiredLevel} <FaStar />
              </OverlayText>
            </OverlayContent>
          </Overlay>
        )}
        <ContentWrapper isLocked={!isTaskUnlocked}>
          {/* Контейнер для основной иконки задачи */}
          <IconContainer>{icon}</IconContainer>
  
          {/* Контейнер для информации о задаче */}
          <TaskInfo>
            <TaskTitleWrapper>
              <TaskTitle ref={titleRef} isOverflow={isOverflow} fontSize={fontSize}>
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
          <DonateButton
           type="primary"
           onClick={handleTaskAction}
           disabled={isButtonDisabled || !isTaskUnlocked}
          >
            {initialPrice > 0 ? ` ${formatBalance(initialPrice, currency)}` : 'Сделать'}
          </DonateButton>
        </ContentWrapper>
      </TaskCard>
    );
  };
  
  export default TaskShopSection;