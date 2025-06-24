import React, { memo, useRef, useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import Lottie from 'lottie-react';
import starAnimation from '@/assets/animation_json/star.json';
import { Spoiler } from 'spoiled';
import { useSelector } from 'react-redux';

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
  const LevelUPBadge = ({ level, overlayTextRef, staticStarRef, handleStaticStarComplete }) => (
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
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
      }}
    >
      <OverlayContent>
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
                {rest.taskInfo}
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
  line-height: 1.1;
  display: block;
`;

export const TaskTitleWrapper = styled.div`
  width: 100%;
  overflow: visible;
  position: relative;
  min-height: 1.2em;
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