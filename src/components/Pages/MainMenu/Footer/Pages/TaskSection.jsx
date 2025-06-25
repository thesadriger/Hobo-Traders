// src/components/Pages/MainMenu/Footer/Pages/TaskSection.jsx
import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Button, Spin, Card, message } from 'antd';
import styled, { keyframes, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { increaseFood, increaseFun, increaseHealth, decreaseFun, decreaseFood, decreaseHealth, resetIndicators, increaseZeroStep, resetZeroStep } from '@/store/slices/indicatorsSlice';
import { decreaseUSDT, decreaseBTC, decreaseHBTRD} from '@/store/slices/balanceSlice'; // Импортируем действия для уменьшения баланса
import { increaseLevel, setJustUnlockedTaskKey, resetLevel } from '@/store/slices/levelSlice';
import { PlusOutlined, LockOutlined } from '@ant-design/icons';
import { FaStar } from 'react-icons/fa';
import ActionButton from '@/components/Pages/Elements/ActionButton';
import Lottie from 'lottie-react';
import foodAnimation from '/src/assets/animation_json/food.json';
import funAnimation from '/src/assets/animation_json/fun.json';
import heartAnimation from '/src/assets/animation_json/heart.json';
import starAnimation from '@/assets/animation_json/star.json';
import { setLastChangedIndicator } from '@/store/slices/lastChangedIndicatorSlice';
import { useLocation } from 'react-router-dom';
import TaskSectionContainer, {
  IconContainer,
  TaskInfo,
  SubContainer,
  ActionInfo,
  CircleIcon,
  AnotherIconContainer,
  TaskTitle,
  TaskTitleWrapper,
  formatBalance
} from './TaskSectionContainer';
import { selectComponent } from '@/store/slices/editModeSlice';
import ModalColorPicker from './ModalColorPicker';

// Функция для выбора эмодзи по названию задания
export const getTaskEmoji = (title) => {
  const lower = title.toLowerCase();
  // Сначала ищем точные фразы
  if (lower.includes('персональный тренер')) return '🥋';
  if (lower.includes('персональный врач')) return '👨🏻‍⚕️';
  if (lower.includes('голуб')) return '🕊️';
  if (lower.includes('помой')) return '🗑️';
  if (lower.includes('шаурм')) return '🌯';
  if (lower.includes('рестик')) return '🍽️';
  if (lower.includes('основать')) return '📊';
  if (lower.includes('ресторан')) return '🏣';
  if (lower.includes('паб')) return '🍻';
  if (lower.includes('кафе')) return '☕';
  if (lower.includes('еда') || lower.includes('пожрать') || lower.includes('есть') || lower.includes('food')) return '🍗';
  if (lower.includes('пельмен')) return '🥟';
  if (lower.includes('искать')) return '🥡';
  if (lower.includes('просроч')) return '🥫';
  if (lower.includes('точк')) return '🍔';
  if (lower.includes('заказать')) return '🍲';
  if (lower.includes('жениться')) return '💒';
  if (lower.includes('повар')) return '👨‍🍳';
  if (lower.includes('весель')) return '🎉';
  if (lower.includes('фейерверк')) return '🎇';
  if (lower.includes('пук')) return '💨';
  if (lower.includes('рыг')) return '🤮';
  if (lower.includes('унитаз')) return '🚽';
  if (lower.includes('памятник')) return '🪦';
  if (lower.includes('пивас') || lower.includes('пиво')) return '🍺';
  if (lower.includes('водк')) return '🥛';
  if (lower.includes('вискар')) return '🥃';
  if (lower.includes('кино')) return '🎬';
  if (lower.includes('драк')) return '🥊';
  if (lower.includes('девуш')) return '👯‍♀️';
  if (lower.includes('бибер')) return '🎤';
  if (lower.includes('актер')) return '🎭';
  if (lower.includes('шампанск')) return '🍾';
  if (lower.includes('сон') || lower.includes('поспать')) return '💤';
  if (lower.includes('спорт')) return '🤸‍♂️';
  if (lower.includes('трав')) return '🌿';
  if (lower.includes('пробежк')) return '🏃‍♂️';
  if (lower.includes('турник')) return '💪🏼';
  if (lower.includes('скор')) return '🚑';
  if (lower.includes('поликлиник')) return '🏥';
  if (lower.includes('фитнес')) return '🏋️';
  if (lower.includes('тренер')) return '🥋';
  if (lower.includes('врач')) return '👨🏻‍⚕️';
  if (lower.includes('медцентр')) return '🏬';
  if (lower.includes('лечение')) return '💉';
  if (lower.includes('орган')) return '🫀';
  if (lower.includes('генные')) return '🧬';
  if (lower.includes('старения')) return '⏳';
  if (lower.includes('бесконечные ходы')) return '♾️';
  if (lower.includes('500 ходов')) return '🔢';
  if (lower.includes('восстановление')) return '💊';
  if (lower.includes('5000 баксов')) return '🪙';
  if (lower.includes('15000')) return '💵';
  if (lower.includes('150000 баксов')) return '💰';
  if (lower.includes('2550000 баксов')) return '🏦';
  if (lower.includes('100000000 баксов')) return '🤑';
  if (lower.includes('1500000000 баксов')) return '👑';
  if (lower.includes('удвоить объем кошелька')) return '👝';
  if (lower.includes('х10 объем кошелька')) return '🔟';
  if (lower.includes('котен')) return '🐱';
  if (lower.includes('щен')) return '🐶';
  // --- Транспорт ---
  if (lower.includes('босиком')) return '🦶';
  if (lower.includes('носки')) return '🧦';
  if (lower.includes('тапочки')) return '🥿';
  if (lower.includes('кроссовки')) return '👟';
  if (lower.includes('туфли')) return '👞';
  if (lower.includes('скейт')) return '🛹';
  if (lower.includes('велосипед')) return '🚲';
  if (lower.includes('мопед')) return '🛵';
  if (lower.includes('жигули')) return '🚗';
  if (lower.includes('иномарка')) return '🚙';
  if (lower.includes('люксовый авто')) return '🚘';
  if (lower.includes('вертолет')) return '🚁';
  if (lower.includes('самолет')) return '✈️';
  if (lower.includes('шаттл')) return '🚀';
  if (lower.includes('телепорт')) return '🌀';
  // --- Образование ---
  if (lower.includes('научиться читать')) return '🔤';
  if (lower.includes('3 класса')) return '3️⃣';
  if (lower.includes('9 классов')) return '9️⃣';
  if (lower.includes('среднее образование')) return '🎓';
  if (lower.includes('пту')) return '🏭';
  if (lower.includes('высшее образование')) return '🏫';
  if (lower.includes('нанять репетитора')) return '👨‍🏫';
  if (lower.includes('образование за границей')) return '🌍';
  if (lower.includes('академик')) return '🧑‍🔬';
  if (lower.includes('заниматься с профессором')) return '👨‍🎓';
  if (lower.includes('доктор наук')) return '👩‍🔬';
  if (lower.includes('купить себе лабораторию')) return '🧪';
  if (lower.includes('нобелевская премия')) return '🏅';
  if (lower.includes('вживить в мозг компьютер')) return '🧠';
  if (lower.includes('оцифровать сознание')) return '💾';
  // --- Апартаменты ---
  if (lower.includes('на дереве')) return '🌳';
  if (lower.includes('мусорный бак')) return '🗑️';
  if (lower.includes('коробка')) return '📦';
  if (lower.includes('шалаш')) return '⛺';
  if (lower.includes('подвал')) return '🚪';
  if (lower.includes('чердак')) return '🏚️';
  if (lower.includes('аренда комнаты')) return '🛏️';
  if (lower.includes('аренда квартиры')) return '🔑';
  if (lower.includes('квартира')) return '🏢';
  if (lower.includes('пентхаус')) return '🌇';
  if (lower.includes('коттедж')) return '🏡';
  if (lower.includes('недвижимость за границей')) return '🏛️';
  if (lower.includes('своя гостинница')) return '🏨';
  if (lower.includes('свой остров')) return '🏝️';
  if (lower.includes('белый дом')) return '🏰';
  // По умолчанию
  return null;
};

const EffectIcon = ({ type }) => (
  <span style={{ display: 'inline-block', width: 32, height: 32, verticalAlign: 'baseline', fontSize: 25 }}>
    {type === 'food' ? '🍗' : type === 'health' ? '❤️' : type === 'fun' ? '🎉' : null}
  </span>
);

const EffectLottie = React.forwardRef(({ type, onComplete }, ref) => {
  let animationData;
  if (type === 'food') animationData = foodAnimation;
  if (type === 'fun') animationData = funAnimation;
  if (type === 'health') animationData = heartAnimation;
  return (
    <span style={{ display: 'inline-block', width: 32, height: 32, verticalAlign: 'baseline' }}>
      <Lottie
        lottieRef={ref}
        animationData={animationData}
        style={{ width: '100%', height: '100%' }}
        loop={false}
        autoplay
        onComplete={onComplete}
      />
    </span>
  );
});

// Компонент для отображения одной задачи
const TaskSection = ({
  taskKey,
  taskData,
  indicatorDeductions,
  afterTaskAction,
  isPurchased = false,
  onPurchase,
  mode = 'action',
  purchasedItems = {},
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
  const location = useLocation();
  const wasMountedRef = useRef(false);
  const justUnlockedTaskKey = useSelector(state => state.level.justUnlockedTaskKey);
  const indicators = useSelector((state) => state.indicators);
  const editMode = useSelector(state => state.editMode.enabled);
  const selectedComponent = useSelector(state => state.editMode.selectedComponent);
  const customColors = useSelector(state => state.customColors);

  const isTaskUnlocked = level >= requiredLevel; // Проверяем, доступна ли задача

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isTaskActive, setIsTaskActive] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [fontSize, setFontSize] = useState(1); // Начальный размер шрифта
  const hasAdjustedFontSize = useRef(false); // Чтобы предотвратить бесконечные циклы

  const titleRef = useRef(null);
  // refs для анимаций эффектов (создаём useMemo чтобы не терять ссылки между рендерами)
  const effectKeys = effects ? Object.keys(effects) : [];
  const effectRefs = useMemo(() => {
    const refs = {};
    effectKeys.forEach(key => {
      refs[key] = React.createRef();
    });
    return refs;
  }, [JSON.stringify(effectKeys)]);

  // Проверка переполнения текста (остается без изменений)
  useLayoutEffect(() => {
    if (titleRef.current && !hasAdjustedFontSize.current) {
      let currentFontSize = fontSize;
      const minFontSize = 0.3; // Минимальный размер шрифта
      const titleElement = titleRef.current;

      const adjustFontSize = () => {
        const isOverflown = titleElement.scrollHeight > titleElement.clientHeight || titleElement.scrollWidth > titleElement.clientWidth;
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

  // Состояние для очереди анимаций эффектов
  const [isEffectPlaying, setIsEffectPlaying] = useState({});
  const [pendingEffect, setPendingEffect] = useState({});

  const [isStarPlaying, setIsStarPlaying] = useState(false);
  const starLottieRef = useRef(null);

  const [isUnlocking, setIsUnlocking] = useState(false);
  const overlayTextRef = useRef(null);
  const [isTaskJustUnlocked, setIsTaskJustUnlocked] = useState(false);

  const [activeEffectKey, setActiveEffectKey] = useState(null); // Какой эффект сейчас проигрывается (food, fun, health)

  const isLongTitle = title && title.length > 1;

  useEffect(() => {
    if (!wasMountedRef.current) {
      wasMountedRef.current = true;
      // Если задача уже разблокирована, но пользователь только что зашел на страницу — просто отмечаем как разблокированную без анимации
      if (isTaskUnlocked && isTaskJustUnlocked) {
        setIsUnlocking(false);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isTaskUnlocked && !isTaskJustUnlocked) {
      setIsTaskJustUnlocked(true);
      dispatch(setJustUnlockedTaskKey(taskKey));
    }
    if (!isTaskUnlocked) {
      setIsTaskJustUnlocked(false);
    }
  }, [isTaskUnlocked, taskKey, dispatch]);

  useEffect(() => {
    if (isTaskJustUnlocked && justUnlockedTaskKey === taskKey && wasMountedRef.current) {
      setIsUnlocking(false);
      dispatch(setJustUnlockedTaskKey(null));
    }
  }, [isTaskJustUnlocked, justUnlockedTaskKey, taskKey, dispatch]);

  const handleTaskAction = () => {
    if (mode === 'purchase' && isPurchased) return;
    // Проверяем, достаточно ли средств для выполнения задачи
    if (balance[currency] < initialPrice) {
      message.error('Недостаточно средств. Время торговли!');
      return;
    }

    setIsButtonDisabled(true);
    setIsTaskActive(true);

    // --- Логика для mode='action' ---
    if (mode === 'action') {
      // Проверяем, какие индикаторы на нуле
      const zeroKeys = [];
      if (indicators.health === 0) zeroKeys.push('health');
      if (indicators.fun === 0) zeroKeys.push('fun');
      if (indicators.food === 0) zeroKeys.push('food');
      // Увеличиваем счётчики для нулевых индикаторов
      zeroKeys.forEach(key => {
        let nextStep = 0;
        if (key === 'health') nextStep = indicators.healthZeroSteps + 1;
        if (key === 'fun') nextStep = indicators.funZeroSteps + 1;
        if (key === 'food') nextStep = indicators.foodZeroSteps + 1;
        dispatch(increaseZeroStep(key));
        // Уведомления о критических ходах
        if (nextStep === 1) message.warning('Осталось 3 хода до обнуления уровня!');
        if (nextStep === 2) message.warning('Осталось 2 хода до обнуления уровня!');
        if (nextStep === 3) message.warning('Остался 1 ход до обнуления уровня!');
        // Если счётчик достиг 4 — сбрасываем уровень
        if (nextStep >= 4) {
          dispatch(resetLevel());
          dispatch(resetZeroStep('health'));
          dispatch(resetZeroStep('fun'));
          dispatch(resetZeroStep('food'));
          message.error('Ваш уровень обнулён из-за критических показателей!');
        }
      });
    }

    // Если есть эффекты — показываем Lottie только для первого эффекта
    if (effects && Object.keys(effects).length > 0) {
      const firstKey = Object.keys(effects)[0];
      setActiveEffectKey(firstKey);
    }

    // --- Бизнес-логика сразу! ---
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

    // --- Логика сброса счётчиков при пополнении индикаторов ---
    if (mode === 'action') {
      if (effects.health && effects.health > 0) dispatch(resetZeroStep('health'));
      if (effects.fun && effects.fun > 0) dispatch(resetZeroStep('fun'));
      if (effects.food && effects.food > 0) dispatch(resetZeroStep('food'));
    }

    if (effects.health) {
      dispatch(increaseHealth(effects.health));
      dispatch(setLastChangedIndicator('health'));
    }
    if (effects.fun) {
      dispatch(increaseFun(effects.fun));
      dispatch(setLastChangedIndicator('fun'));
    }
    if (effects.food) {
      dispatch(increaseFood(effects.food));
      dispatch(setLastChangedIndicator('food'));
    }

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

    dispatch(increaseLevel(1));

    if (afterTaskAction && typeof afterTaskAction === 'function') {
      afterTaskAction();
    }

    if (mode === 'purchase' && onPurchase) onPurchase();

    // UI-сброс через короткий таймер (isTaskActive только для визуального состояния кнопки)
    setTimeout(() => {
      setIsButtonDisabled(false);
      setIsTaskActive(false); // UI может стать неактивным, но анимация продолжит проигрываться
      setIsTextVisible(false);
      // setActiveEffectKey(null); // возврат к SVG только по onComplete
    }, 300); // Можно уменьшить задержку, чтобы UI быстрее возвращался, а анимация доигрывала
  };

  const handleEditSelect = (key) => {
    dispatch(selectComponent(key));
  };

  // Получаем кастомные цвета для элементов
  const colorBg = isTaskUnlocked ? customColors['task_unlocked_background'] : customColors[`${taskKey}_background`];
  const colorIcon = isTaskUnlocked ? customColors['task_unlocked_icon'] : customColors[`${taskKey}_icon`];
  const colorText = isTaskUnlocked ? customColors['task_unlocked_text'] : customColors[`${taskKey}_text`];
  const colorButton = isTaskUnlocked ? customColors['task_unlocked_button'] : customColors[`${taskKey}_button`];
  const colorSubContainerBackground = isTaskUnlocked ? customColors['task_unlocked_subContainerBackground'] : customColors[`${taskKey}_subContainerBackground`];
  const colorSubContainerText = isTaskUnlocked ? customColors['task_unlocked_subContainerText'] : customColors[`${taskKey}_subContainerText`];
  const colorEffectBackground = isTaskUnlocked ? customColors['task_unlocked_effectBackground'] : customColors[`${taskKey}_effectBackground`];
  const colorButtonShadow = isTaskUnlocked ? customColors['task_unlocked_buttonShadow'] : customColors[`${taskKey}_buttonShadow`];

  return (
    <>
      <TaskSectionContainer
        isTaskUnlocked={isTaskUnlocked}
        justUnlockedTaskKey={justUnlockedTaskKey}
        taskKey={taskKey}
        isUnlocking={isUnlocking}
        isStarPlaying={isStarPlaying}
        onOverlayClick={() => {
          if (starLottieRef.current && !isStarPlaying && !isUnlocking) {
            setIsStarPlaying(true);
            starLottieRef.current.stop();
            starLottieRef.current.play();
          }
        }}
        overlayTextRef={overlayTextRef}
        starLottieRef={starLottieRef}
        requiredLevel={requiredLevel}
        style={{
          ...(colorBg ? { background: colorBg } : {}),
        }}
        iconContainer={
          <IconContainer style={colorIcon ? { background: colorIcon } : {}}>
            {getTaskEmoji(title) ? (
              <span style={{ fontSize: '2rem' }}>{getTaskEmoji(title)}</span>
            ) : (
              icon
            )}
          </IconContainer>
        }
        taskInfo={
          <TaskInfo>
            <TaskTitleWrapper>
              <TaskTitle ref={titleRef} isOverflow={isOverflow} fontSize={fontSize} style={colorText ? { color: colorText } : {}}>
                {title}
              </TaskTitle>
            </TaskTitleWrapper>
          </TaskInfo>
        }
        effects={effects}
        requirements={taskData.requirements}
        purchasedItems={purchasedItems}
        colorEffectBackground={colorEffectBackground}
        colorSubContainerText={colorSubContainerText}
        actionButton={
          mode === 'purchase' ? (
            <ActionButton
              type="primary"
              onClick={handleTaskAction}
              disabled={isButtonDisabled || !isTaskUnlocked || isPurchased}
              style={{
                ...(isPurchased ? { background: '#d9d9d9', color: '#888', border: 'none', cursor: 'default', boxShadow: 'none' } : {}),
                ...(colorButton ? { background: colorButton, border: 'none' } : {}),
                ...(colorButtonShadow ? { boxShadow: `0 0 16px 0 ${colorButtonShadow}` } : {}),
              }}
            >
              {isPurchased
                ? 'Куплено'
                : initialPrice > 0
                  ? <><span style={{fontSize: '0.65rem', marginRight: 4}}></span>{formatBalance(initialPrice, currency)}</>
                  : <span style={{whiteSpace: 'nowrap', fontSize: '0.65rem', wordBreak: 'break-all', textAlign: 'center'}}>Купить</span>}
            </ActionButton>
          ) : (
            <ActionButton
              type="primary"
              onClick={handleTaskAction}
              disabled={isButtonDisabled || !isTaskUnlocked}
              style={colorButton ? { background: colorButton, border: 'none', ...(colorButtonShadow ? { boxShadow: `0 0 16px 0 ${colorButtonShadow}` } : {}) } : (colorButtonShadow ? { boxShadow: `0 0 16px 0 ${colorButtonShadow}` } : {})}
            >
              {initialPrice > 0 ? `${formatBalance(initialPrice, currency)}` : 'Сделать'}
            </ActionButton>
          )
        }
        isEditMode={editMode}
        isSelected={selectedComponent === taskKey}
        onEditSelect={handleEditSelect}
        isLongTitle={isLongTitle}
        title={typeof title === 'string' ? title : String(title)}
      >
        {/* Lottie для Overlay (children) */}
        <Lottie
          lottieRef={starLottieRef}
          animationData={starAnimation}
          loop={false}
          autoplay={false}
          style={{ width: '100%', height: '100%' }}
          onComplete={() => setIsStarPlaying(false)}
        />
      </TaskSectionContainer>
      {editMode && selectedComponent === taskKey && (
        <ModalColorPicker
          componentKey={isTaskUnlocked ? 'task_unlocked' : 'lockedTask'}
          onClose={() => dispatch(selectComponent(null))}
        />
      )}
    </>
  );
};

export default TaskSection;