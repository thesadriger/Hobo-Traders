import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearNewTasks } from '@/store/slices/newTasksBadgeSlice';
import Lottie from 'lottie-react';
import houseAnimation from '@/assets/animation_json/House.json';
import educationAnimation from '@/assets/animation_json/education.json';
import carAnimation from '@/assets/animation_json/car.json';
import { selectComponent } from '@/store/slices/editModeSlice';

const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 100vw;
  overflow-x: auto;
  padding: 0.5rem 0.5rem 0.7rem 0.5rem;
  box-sizing: border-box;
  @media (min-width: 600px) {
    gap: 1rem;
    padding: 1rem 1rem 1.2rem 1rem;
  }
`;

const ActionButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  background: #e0eafc;
  border: none;
  border-radius: 24px;
  padding: 0.5rem 0.2rem 0.3rem 0.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryText};
  box-shadow: 0 4px 18px rgba(80, 120, 200, 0.13);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  flex: 1 1 0;
  min-width: 0;
  height: 82px;
  max-width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: hidden;
  z-index: 1;
  ${({ $active }) =>
    $active &&
    css`
      border: 2px solid #4096ff;
      box-shadow: 0 6px 24px rgba(80, 120, 200, 0.18);
      background: #d1eaff;
    `}
  &:hover, &:focus {
    background: #b8d8f3;
    box-shadow: 0 8px 32px rgba(80, 120, 200, 0.22);
    transform: translateY(-2px) scale(1.03);
  }
  & .icon {
    font-size: 2rem;
    margin-top: 0.5rem;
    filter: drop-shadow(0 2px 4px rgba(80,120,200,0.10));
  }
  @media (min-width: 601px) {
    height: 100px;
    font-size: 1.5rem;
    & .icon {
      font-size: 1.7rem;
    }
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: ${({ $backgroundIcon }) =>
      $backgroundIcon
        ? `url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'22\' height=\'22\'><text x=\'0\' y=\'17\' font-size=\'17\' opacity=\'0.18\'>${encodeURIComponent($backgroundIcon)}</text></svg>')`
        : 'none'};
    background-size: 22px 22px;
    background-repeat: repeat;
    opacity: 1;
  }
  & > * {
    position: relative;
    z-index: 1;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 6px;
  right: 12px;
  min-width: 22px;
  height: 22px;
  background: #ff3b30;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 7px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(255,59,48,0.15);
`;

const actions = [
  { lottie: houseAnimation, label: 'Апартаменты', path: '/appartaments', backgroundIcon: '🏠', badgeKey: 'appartaments' },
  { lottie: educationAnimation, label: 'Обучение', path: '/education', backgroundIcon: '🎓', badgeKey: 'education' },
  { lottie: carAnimation, label: 'Машина', path: '/cars', backgroundIcon: '🚗', badgeKey: 'cars' },
];

const useEditableComponent = (componentKey) => {
  const editMode = useSelector(state => state.editMode.enabled);
  const selectedComponent = useSelector(state => state.editMode.selectedComponent);
  const dispatch = useDispatch();
  const isSelected = selectedComponent === componentKey;
  const handleClick = (e) => {
    if (editMode) {
      e.stopPropagation();
      dispatch(selectComponent(componentKey));
    }
  };
  return {
    onClick: handleClick,
    style: editMode ? {
      outline: isSelected ? '3px solid #4caf50' : '2px dashed #4096ff',
      outlineOffset: '2px',
      cursor: 'pointer',
      position: 'relative',
      zIndex: 10,
    } : {},
  };
};

const MainActions = ({ customColors }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const newTasks = useSelector(state => state.newTasksBadge);
  const editMode = useSelector(state => state.editMode.enabled);

  // refs для Lottie
  const lottieRefs = useRef(actions.map(() => React.createRef()));
  // Состояние для отслеживания, какие анимации должны остановиться после завершения цикла
  const stopAfterComplete = useRef(actions.map(() => false));
  // Состояние для отслеживания предыдущего активного пути
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const prevIdx = actions.findIndex(a => a.path === prevPath);
    const currentIdx = actions.findIndex(a => a.path === location.pathname);

    actions.forEach((action, idx) => {
      const ref = lottieRefs.current[idx].current;
      if (ref) {
        if (idx === currentIdx) {
          // Активная страница: loop=true, play
          ref.play();
          stopAfterComplete.current[idx] = false;
        } else if (idx === prevIdx && prevIdx !== currentIdx) {
          // Только для предыдущей активной: дождаться завершения цикла
          stopAfterComplete.current[idx] = true;
        }
        // Остальные не трогаем
      }
    });
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const current = actions.find(a => a.path === location.pathname);
    if (current && newTasks[current.badgeKey] > 0) {
      dispatch(clearNewTasks(current.badgeKey));
    }
  }, [location.pathname]);

  // Обработчик завершения анимации
  const handleComplete = idx => {
    if (stopAfterComplete.current[idx]) {
      const ref = lottieRefs.current[idx].current;
      if (ref) {
        ref.stop();
        stopAfterComplete.current[idx] = false;
      }
    }
  };

  return (
    <ActionsRow>
      {actions.map(({ lottie, label, path, backgroundIcon, badgeKey }, idx) => {
        // Уникальный ключ для каждой кнопки
        let componentKey = '';
        if (badgeKey === 'appartaments') componentKey = 'main_menu_appartaments';
        if (badgeKey === 'education') componentKey = 'main_menu_education';
        if (badgeKey === 'cars') componentKey = 'main_menu_cars';
        const editableProps = useEditableComponent(componentKey);
        return (
          <ActionButton
            key={path}
            {...editableProps}
            onClick={e => {
              if (editableProps.onClick) editableProps.onClick(e);
              if (!editMode) navigate(path);
            }}
            $active={location.pathname === path}
            $backgroundIcon={backgroundIcon}
            style={{
              ...editableProps.style,
              background: customColors?.[`${componentKey}_button`] || undefined,
              color: customColors?.[`${componentKey}_buttonText`] || undefined,
            }}
          >
            {newTasks[badgeKey] > 0 && (
              <Badge>{newTasks[badgeKey]}</Badge>
            )}
            <span className="icon">
              <Lottie
                lottieRef={lottieRefs.current[idx]}
                animationData={lottie}
                loop={location.pathname === path}
                autoplay={false}
                style={{ width: 38, height: 38 }}
                onComplete={() => handleComplete(idx)}
              />
            </span>
            <span style={{marginBottom: '1em'}}>{label}</span>
          </ActionButton>
        );
      })}
    </ActionsRow>
  );
};

export default MainActions; 