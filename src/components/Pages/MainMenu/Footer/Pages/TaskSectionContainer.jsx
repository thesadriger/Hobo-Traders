import React, { memo, useRef, useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import Lottie from 'lottie-react';
import starAnimation from '@/assets/animation_json/star.json';
import { Spoiler } from 'spoiled';
import { useSelector } from 'react-redux';
import { AppartamentData } from '@/components/Pages/MainMenu/Main/Pages/AppartamentsPage/TaskApartList';
import { CarsData } from '@/components/Pages/MainMenu/Main/Pages/CarsPage/TaskCarsList';
import { EducationData } from '@/components/Pages/MainMenu/Main/Pages/EducationPage/TaskEducationList';
import { TasksList as HealthTasks } from '@/components/Pages/MainMenu/Footer/Pages/HealthPage/TaskHealthList';
import { TasksList as FunTasks } from '@/components/Pages/MainMenu/Footer/Pages/FunPage/TaskFunList';
import { TasksList as FoodTasks } from '@/components/Pages/MainMenu/Footer/Pages/FoodPage/TaskFoodList';
import { getTaskEmoji } from './TaskSection';

// TaskCard — основной контейнер карточки задания
// Отвечает за внешний вид карточки, отступы, скругления, тени и адаптивность
const TaskCard = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.taskCardBackground}; // Цвет фона карточки
  border-radius: ${({ theme }) => theme.borderRadius.card}; // Скругление углов
  box-shadow: ${({ isEditMode, isSelected, theme }) =>
    isEditMode
      ? `0 0 0 4px ${isSelected ? '#4caf50' : '#ff9800'}, 0 2px 8px rgba(0,0,0,0.1)`
      : theme.shadows.cardShadow};
  padding: ${({ theme }) => theme.sizes.paddingSmall}; // Внутренний отступ
  transition: background-color 0.3s ease, border 0.2s, box-shadow 0.2s;
  width: 700px; // Фиксированная ширина на десктопе
  position: relative;
  box-sizing: border-box;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  z-index: 2;
  ${({ isEditMode, isSelected }) =>
    isEditMode &&
    css`
      cursor: pointer;
      border: ${isSelected ? '2.5px' : '2px'} solid ${isSelected ? '#4caf50' : 'rgba(255,152,0,0.5)'};
      &:hover {
        border: 2.5px solid ${isSelected ? '#4caf50' : '#ff9800'};
        box-shadow: 0 0 0 6px ${isSelected ? '#4caf50' : '#ff9800'}, 0 2px 8px rgba(0,0,0,0.1);
      }
    `}
  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    max-width: 95vw;
    box-sizing: border-box;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`;

// ContentWrapper — обёртка для основного содержимого карточки (иконка, инфо, кнопка)
// Выравнивает элементы по центру по вертикали
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

// Overlay — полупрозрачный оверлей, который появляется при разблокировке задания
// Абсолютно позиционируется поверх карточки, затемняет фон
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: ${({ theme }) => theme.borderRadius.card};
  border: none;
`;

// OverlayContent — контейнер для содержимого оверлея (звезда и уровень)
// Центрирует элементы и добавляет отступ между ними
const OverlayContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

// OverlayText — текстовый блок в оверлее (звезда + требуемый уровень)
// Отвечает за стилизацию текста и выравнивание
const OverlayText = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.overlayTextColor}; // Цвет текста
  font-size: ${({ theme }) => theme.fonts.sizes.overlayLevel}; // Размер шрифта
  text-align: center;
  font-weight: 600;
  gap: 0.25em;
`;

// StarLottieSmall — контейнер для маленькой анимации звезды (Lottie)
// Задает размеры и отступы для анимации звезды
const StarLottieSmall = styled.div`
  display: flex;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
  min-width: 20px;
  min-height: 20px;
  max-width: 28px;
  max-height: 28px;
  vertical-align: baseline;
  margin-bottom: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 1.3em;
    height: 1.3em;
    min-width: 18px;
    min-height: 18px;
    max-width: 24px;
    max-height: 24px;
    margin-bottom: 20px;
  }
`;

// Слой блюра поверх содержимого карточки
const BlurLayer = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  backdrop-filter: blur(1px);
  border-radius: ${({ theme }) => theme.borderRadius.card};
`;

// Глобальный стиль для убирания белого фона у спойлера
const SpoilerNoBg = createGlobalStyle`
  .spoiled, [data-spoiled], .spoiled > *, [data-spoiled] > *, .spoiled *, [data-spoiled] * {
    background: transparent !important;
  }
`;

// Новый блок для эффектов
const EffectsBlock = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: nowrap;
  @media (max-width: 600px) {
  }
`;
const EffectItem = styled.span`
  font-size: 0.7rem;
  background: ${({ bg }) => bg || '#f0fdfa'};
  border-radius: 15px;
  padding: 1px 5px;
  color: ${({ color }) => color || '#4096ff'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
  min-width: 50px;
  justify-content: center;
  height: 25px;
  line-height: 1;
`;
// Новый блок для требований
const RequirementsBlock = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  width: 100%;
  @media (max-width: 600px) {
  }
`;
const RequirementItem = styled.span`
  font-size: 1.1rem;
  background: #f6f6fa;
  border-radius: 6px;
  padding: 1px 7px;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
  line-height: 1.2;
`;

// Новый блок для эффектов и требований
const EffectsAndRequirementsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 1rem 0 1rem;
  flex-wrap: nowrap;
  @media (max-width: 600px) {
  }
`;

// Новый компонент-обёртка для taskInfo и эффектов/требований с динамическим flex-direction
const TaskInfoRow = ({ title, children }) => {
  const titleStr = typeof title === 'string' ? title : String(title);
  const isLong = titleStr.length > 1;
  const childrenArray = React.Children.toArray(children);
  if (isLong) {
    // Если длинное название — выводим его отдельной строкой сверху
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        minWidth: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%'
      }}>
        <div style={{ width: '100%', minWidth: 0 }}>{childrenArray[0]}</div>
        <div style={{ width: '100%', marginTop: 4, minWidth: 0 }}>{childrenArray[1]}</div>
      </div>
    );
  }
  // Короткое название — всё в одну строку
  return (
    <div style={{ flex: 1, display: 'flex', minWidth: 0, flexDirection: 'row', alignItems: 'center' }}>
      {children}
    </div>
  );
};

const taskMaps = {
  appartament: AppartamentData,
  car: CarsData,
  education: EducationData,
  health: HealthTasks,
  fun: FunTasks,
  food: FoodTasks,
};

function getRequirementIcon(cat, key) {
  const map = taskMaps[cat];
  if (map && map[key]) {
    return map[key].icon || null;
  }
  return null;
}

function getRequirementEmoji(cat, key) {
  const map = taskMaps[cat];
  if (map && map[key] && map[key].title) {
    const emoji = getTaskEmoji(map[key].title);
    if (emoji) return emoji;
  }
  return null;
}

// Новый компонент для отображения требований с подсветкой
const RequirementsRow = ({ requirements, purchasedItems = {}, position = 'left' }) => {
  if (!requirements || Object.keys(requirements).length === 0) return null;
  // Собираем все требования в один массив [{cat, key}]
  const reqArr = Object.entries(requirements).flatMap(([cat, value]) =>
    Array.isArray(value)
      ? value.map((key) => ({ cat, key }))
      : [{ cat, key: value }]
  );
  // Делим массив пополам
  const half = Math.ceil(reqArr.length / 2);
  const leftReqs = reqArr.slice(0, half);
  const rightReqs = reqArr.slice(half);
  let renderReqs = [];
  if (position === 'left') renderReqs = leftReqs;
  else if (position === 'right') renderReqs = rightReqs;
  else renderReqs = reqArr;
  return (
    <RequirementsBlock style={{ gap: 8 }}>
      {renderReqs.map(({ cat, key }, idx) => {
        // Проверяем, куплен ли предмет
        let isOwned = false;
        if (cat === 'appartament' || cat === 'education' || cat === 'car' || cat === 'food') {
          isOwned = purchasedItems[key];
        }
        // Для левой части: последний элемент — marginRight: 1rem
        // Для правой части: первый элемент — marginLeft: 1rem
        let extraStyle = {};
        if (position === 'left' && idx === renderReqs.length - 1) extraStyle.marginRight = '1rem';
        if (position === 'right' && idx === 0) extraStyle.marginLeft = '1rem';
        return (
          <RequirementItem key={cat + key} style={{
            background: isOwned ? '#e8f5e9' : '#ffebee',
            color: isOwned ? '#388e3c' : '#d32f2f',
            borderColor: isOwned ? '#a5d6a7' : '#ffcdd2',
            fontWeight: 700,
            ...extraStyle
          }}>
            {getRequirementEmoji(cat, key) || (
              <>
                {cat === 'food' && '🍗'}
                {cat === 'fun' && '🎉'}
                {cat === 'health' && '❤️'}
                {cat === 'appartament' && '🏠'}
                {cat === 'car' && '🚗'}
                {cat === 'education' && '🎓'}
              </>
            )}
          </RequirementItem>
        );
      })}
    </RequirementsBlock>
  );
};

// TaskSectionContainer — основной компонент-контейнер для секции задания
// Отвечает за отображение состояния задания: разблокировано, только что разблокировано, заблокировано
const TaskSectionContainer = memo(({
  isTaskUnlocked,        // Флаг: разблокировано ли задание
  justUnlockedTaskKey,   // Ключ только что разблокированного задания
  taskKey,               // Ключ текущего задания
  isUnlocking,           // Флаг: идет ли процесс разблокировки
  isStarPlaying,         // Флаг: проигрывается ли анимация звезды (не используется здесь)
  onOverlayClick,        // Обработчик клика по оверлею
  overlayTextRef,        // Реф для текста в оверлее (для анимаций)
  starLottieRef,         // Реф для Lottie (не используется здесь)
  requiredLevel,         // Требуемый уровень для разблокировки задания
  children,              // Дочерние элементы (ожидается Lottie-анимация звезды)
  isVisible = true,      // Новый проп
  isEditMode = false,
  isSelected = false,
  onEditSelect = () => {},
  ...rest                // Остальные пропсы (например, iconContainer, taskInfo, actionButton)
}) => {
  // ref для управления Lottie в StaticLockedBlock
  const staticStarRef = useRef(null);
  // Состояние: проигрывается ли анимация
  const [isStaticStarPlaying, setIsStaticStarPlaying] = useState(false);
  const customColors = useSelector(state => state.customColors);
  const colorBorderUnlocked = customColors[`${taskKey}_borderUnlocked`];
  // --- Новое: кастомные цвета для заблокированной задачи ---
  const colorLockedBg = customColors['lockedTask_background'] || 'linear-gradient(90deg, rgb(49,87,145) 0%, rgb(88,150,247) 100%)';
  const colorLockedLevelText = customColors['lockedTask_levelText'] || '#fff';

  // Получаем кастомный цвет оболочки требований
  let colorRequirementsShell;
  if (!isTaskUnlocked) {
    colorRequirementsShell = customColors['lockedTask_requirementsShell'] || 'rgba(25, 25, 25, 0.7)';
  } else {
    colorRequirementsShell = customColors[`${taskKey}_requirementsShell`] || customColors['requirementsShell'] || 'rgba(25, 25, 25, 0.7)';
  }

  // Обработчик клика по заблокированной задаче
  const handleStaticStarClick = () => {
    if (staticStarRef.current && !isStaticStarPlaying) {
      setIsStaticStarPlaying(true);
      staticStarRef.current.stop();
      staticStarRef.current.play();
    }
  };

  // Обработчик завершения анимации
  const handleStaticStarComplete = () => {
    setIsStaticStarPlaying(false);
  };

  // Новый компонент LevelUPBadge
  const LevelUPBadge = ({ level, overlayTextRef, staticStarRef, handleStaticStarComplete, requirements, purchasedItems, taskKey }) => {
    // Собираем требования
    const reqArr = requirements && Object.keys(requirements).length > 0
      ? Object.entries(requirements).flatMap(([cat, value]) =>
          Array.isArray(value)
            ? value.map((key) => ({ cat, key }))
            : [{ cat, key: value }]
        )
      : [];
    return (
      <Overlay
        style={{
          pointerEvents: 'none',
          zIndex: 3,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: reqArr.length > 0 ? 'space-between' : 'center',
          background: 'transparent',
          padding: '0 2rem',
        }}
      >
        {/* Левая часть — требования с оболочкой */}
        {reqArr.length > 0 && (
          <div style={{
            background: colorRequirementsShell,
            borderRadius: '12px',
            padding: '4px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 2px 8px rgba(64,150,255,0.07)',
          }}>
            {reqArr.map(({ cat, key }) => (
              <RequirementItem key={cat + key} style={{
                background: (cat === 'appartament' || cat === 'education' || cat === 'car' || cat === 'food') && purchasedItems[key] ? '#e8f5e9' : '#ffebee',
                color: (cat === 'appartament' || cat === 'education' || cat === 'car' || cat === 'food') && purchasedItems[key] ? '#388e3c' : '#d32f2f',
                borderColor: (cat === 'appartament' || cat === 'education' || cat === 'car' || cat === 'food') && purchasedItems[key] ? '#a5d6a7' : '#ffcdd2',
                fontWeight: 700
              }}>
                {getRequirementEmoji(cat, key) || (
                  <>
                    {cat === 'food' && '🍗'}
                    {cat === 'fun' && '🎉'}
                    {cat === 'health' && '❤️'}
                    {cat === 'appartament' && '🏠'}
                    {cat === 'car' && '🚗'}
                    {cat === 'education' && '🎓'}
                  </>
                )}
              </RequirementItem>
            ))}
          </div>
        )}
        {/* Центр — пусто (или можно вставить основной контент, если потребуется) */}
        {reqArr.length > 0 && <div style={{ flex: 1 }} />}
        {/* Правая часть — уровень */}
        <OverlayContent style={{ justifySelf: 'flex-end' }}>
          <OverlayText ref={overlayTextRef} style={{ color: colorLockedLevelText }}>
            <StarLottieSmall>
              <Lottie
                lottieRef={staticStarRef}
                animationData={starAnimation}
                loop={false}
                autoplay={false}
                style={{ width: 22, height: 22 }}
                onComplete={handleStaticStarComplete}
              />
            </StarLottieSmall>
            {level}
          </OverlayText>
        </OverlayContent>
      </Overlay>
    );
  };

  // Функция для эмодзи по ключу (скопировано из TaskSection)
  const getTaskEmoji = (title) => {
    const lower = String(title).toLowerCase();
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
    return null;
  };

  return (
    <>
      <div style={{ position: 'relative', borderRadius: 10, background: isTaskUnlocked ? undefined : colorLockedBg, width: 'fit-content', display: 'inline-block' }}>
        {/* LevelUPBadge всегда поверх, абсолютно, только если задача не открыта */}
        {!isTaskUnlocked && (
          <LevelUPBadge
            level={requiredLevel}
            overlayTextRef={overlayTextRef}
            staticStarRef={staticStarRef}
            handleStaticStarComplete={handleStaticStarComplete}
            requirements={rest.requirements}
            purchasedItems={rest.purchasedItems}
            taskKey={taskKey}
          />
        )}
        {/* Если задача не открыта и не видима — показываем статичный fallback */}
        {!isTaskUnlocked && !isVisible ? (
          <div style={{ width: 500, height: 0, borderRadius: 20, background: 'rgba(245,245,245,0.7)' }} />
        ) : (
          <Spoiler hidden={!isTaskUnlocked} tagName="div" fps={15} density={0.02} color="#4096ff">
            <TaskCard
              isEditMode={isEditMode}
              isSelected={isSelected}
              onClick={isEditMode ? (e) => { e.stopPropagation(); onEditSelect(taskKey); } : undefined}
              style={{
                position: 'relative',
                background: isTaskUnlocked
                  ? 'linear-gradient(90deg, rgb(97, 113, 255), hsla(217, 100%, 56%, 1))'
                  : colorLockedBg,
                border: isEditMode
                  ? (isSelected
                      ? '2.5px solid #4caf50'
                      : '2px solid rgba(255,152,0,0.5)')
                  : (isTaskUnlocked
                      ? `2.5px solid ${colorBorderUnlocked || '#4096ff'}`
                      : undefined),
                ...rest.style,
              }}
            >
              {/* BlurLayer только если задача не открыта */}
              {!isTaskUnlocked && <BlurLayer />}
              <ContentWrapper>
                {rest.iconContainer}
                {/* Вставляем TaskInfo, но прокидываем transient проп $isLongTitle */}
                {rest.isLongTitle ? (
                  <TaskInfoRow title={rest.title}>
                    {rest.taskInfo}
                    <EffectsAndRequirementsRow style={{ width: '100%', marginTop: 6 }}>
                      {rest.effects && Object.entries(rest.effects).length > 0 && (
                        <EffectsBlock>
                          {Object.entries(rest.effects).map(([key, value]) => (
                            <EffectItem key={key} bg={rest.colorEffectBackground} color={rest.colorSubContainerText}>
                              {key === 'food' && '🍗'}
                              {key === 'fun' && '🎉'}
                              {key === 'health' && '❤️'}
                              +{value}
                            </EffectItem>
                          ))}
                        </EffectsBlock>
                      )}
                      {/* Требования показываем только если задача заблокирована */}
                      {!isTaskUnlocked && rest.requirements && Object.keys(rest.requirements).length > 0 && (
                        <RequirementsRow requirements={rest.requirements} purchasedItems={rest.purchasedItems} position="all" />
                      )}
                    </EffectsAndRequirementsRow>
                  </TaskInfoRow>
                ) : (
                  <>
                    {rest.taskInfo}
                    <EffectsAndRequirementsRow>
                      {rest.effects && Object.entries(rest.effects).length > 0 && (
                        <EffectsBlock>
                          {Object.entries(rest.effects).map(([key, value]) => (
                            <EffectItem key={key} bg={rest.colorEffectBackground} color={rest.colorSubContainerText}>
                              {key === 'food' && '🍗'}
                              {key === 'fun' && '🎉'}
                              {key === 'health' && '❤️'}
                              +{value}
                            </EffectItem>
                          ))}
                        </EffectsBlock>
                      )}
                      {/* Требования показываем только если задача заблокирована */}
                      {!isTaskUnlocked && rest.requirements && Object.keys(rest.requirements).length > 0 && (
                        <RequirementsRow requirements={rest.requirements} purchasedItems={rest.purchasedItems} position="all" />
                      )}
                    </EffectsAndRequirementsRow>
                  </>
                )}
                {rest.actionButton}
              </ContentWrapper>
            </TaskCard>
          </Spoiler>
        )}
      </div>
    </>
  );
});

export const IconContainer = styled.div`
  width: ${({ theme }) => theme.sizes.iconSize};
  height: ${({ theme }) => theme.sizes.iconSize};
  background-color: ${({ theme }) => theme.colors.iconBackground};
  border-radius: ${({ theme }) => theme.borderRadius.icon};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1rem;
  overflow: hidden;
  min-width: 0;
  justify-content: center;
`;

export const SubContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkBackground};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 0.2rem 0.2rem;
  margin-right: ${({ theme }) => theme.sizes.marginSmall};
`;

export const CircleIcon = styled.div`
  width: ${({ theme }) => theme.sizes.circleIconSize};
  height: ${({ theme }) => theme.sizes.circleIconSize};
  background-color: ${({ theme }) => theme.colors.iconBackground};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.circleIconColor};
  margin-right: 0.25rem;
  flex-shrink: 0;
`;

export const AnotherIconContainer = styled.div`
  width: ${({ theme }) => theme.sizes.anotherIconSize};
  height: ${({ theme }) => theme.sizes.anotherIconSize};
  background-color: ${({ theme }) => theme.colors.additionalIconBackground};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  & > svg {
    color: ${({ theme }) => theme.colors.iconBackground};
    font-size: 1rem;
  }
`;

export const TaskTitle = styled.span`
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  font-weight: bold;
  color: #ffffff;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  line-height: 1.1;
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  flex-shrink: 1;
  justify-content: center;
`;

export const TaskTitleWrapper = styled.div`
  width: 100%;
  overflow: visible;
  position: relative;
  min-height: 1.2em;
  display: ${({ $isLongTitle }) => ($isLongTitle ? 'block' : 'flex')};
  justify-content: flex-start;
`;

export const formatBalance = (number, currency) => {
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

export default TaskSectionContainer;