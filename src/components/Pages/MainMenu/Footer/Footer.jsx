// Footer.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import styles from './Footer.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectComponent } from '@/store/slices/editModeSlice';

import Exchange from './Menu/Exchange.jsx';
import Health from './Menu/Health.jsx';
import Fun from './Menu/Fun.jsx';
import Food from './Menu/Food.jsx';
import Shop from './Menu/Shop.jsx';

const icons = [
  { to: '/exchange', label: 'Биржа', icon: <Exchange /> },
  { to: '/health', label: 'Здоровье', icon: <Health /> },
  { to: '/fun', label: 'Веселье', icon: <Fun /> },
  { to: '/food', label: 'Еда', icon: <Food /> },
  { to: '/shop', label: 'Магазин', icon: <Shop /> },
];

const Footer = () => {
  const customColors = useSelector(state => state.customColors);
  const editMode = useSelector(state => state.editMode.enabled);
  const selectedComponent = useSelector(state => state.editMode.selectedComponent);
  const dispatch = useDispatch();

  const isSelected = selectedComponent === 'footer';
  const handleClick = (e) => {
    if (editMode) {
      e.stopPropagation();
      dispatch(selectComponent('footer'));
    }
  };

  return (
    <div
      className={styles.footerWrapper}
      onClick={handleClick}
      style={{
        background: customColors['footer_footerWrapper_background'] || undefined,
        outline: editMode ? (isSelected ? '3px solid #4caf50' : '2px dashed #4096ff') : undefined,
        outlineOffset: editMode ? '2px' : undefined,
        cursor: editMode ? 'pointer' : undefined,
        zIndex: editMode ? 1200 : undefined,
      }}
    >
      <div
        className={styles.dockBar}
        style={{
          background: customColors['footer_dockBar_background'] || undefined,
          border: customColors['footer_border'] ? `2px solid ${customColors['footer_border']}` : undefined,
        }}
      >
        {icons.map(({ to, label, icon }) => (
          <DockItem key={to} to={to} label={label} customColors={customColors}>
            {icon}
          </DockItem>
        ))}
      </div>
    </div>
  );
};

function DockItem({ to, label, children, customColors }) {
  const [style, api] = useSpring(() => ({ scale: 1 }));
  const bind = useGesture({
    onHover: ({ hovering }) => {
      api.start({ scale: hovering ? 1.25 : 1, config: { tension: 300, friction: 18 } });
    },
  });
  return (
    <NavLink
      to={to}
      aria-label={label}
      className={({ isActive }) =>
        isActive ? `${styles.dockNavLink} ${styles.active}` : styles.dockNavLink
      }
      {...bind()}
      style={{ color: customColors?.['footer_text'] || undefined }}
    >
      <animated.div
        style={{ scale: style.scale, color: customColors?.['footer_icon'] || undefined }}
        className={styles.iconWrap}
      >
        {children}
      </animated.div>
      <span className={styles.label} style={{ color: customColors?.['footer_text'] || undefined }}>{label}</span>
    </NavLink>
  );
}

export default Footer;
