import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentColor, resetComponentColor, resetAllColors } from '@/store/slices/customColorsSlice';
import { HexColorPicker } from 'react-colorful';
import Draggable from 'react-draggable';
import './ModalColorPicker.css';

const ELEMENTS = [
  { key: 'background', label: 'Фон', default: 'linear-gradient(90deg, rgb(97, 113, 255), hsla(217, 100%, 56%, 1))' },
  { key: 'icon', label: 'Иконка', default: '#4096ff' },
  { key: 'text', label: 'Текст', default: '#ffffff' },
  { key: 'button', label: 'Кнопка', default: 'linear-gradient(325deg, hsla(217, 100%, 56%, 1) 0%, hsla(194, 100%, 69%, 1) 55%, hsla(217, 100%, 56%, 1) 90%)' },
  { key: 'subContainerText', label: 'Текст блока эффектов', default: '#4096ff' },
  { key: 'effectBackground', label: 'Фон эффекта', default: '#f0fdfa' },
  { key: 'buttonShadow', label: 'Тень кнопки', default: '#4096ff' },
  { key: 'borderUnlocked', label: 'Обводка разблокированной задачи', default: '#4096ff' },
];

const LOCKED_ELEMENTS = [
  { key: 'background', label: 'Фон', default: 'linear-gradient(90deg, rgb(97, 113, 255), hsla(217, 100%, 56%, 1))' },
  { key: 'levelText', label: 'Цвет текста уровня', default: '#ffffff' },
];

const getSelectedElementsLS = (componentKey, elementsToShow) => {
  try {
    const data = localStorage.getItem(`customColorSelectedElements_${componentKey}`);
    if (data) {
      const arr = JSON.parse(data).filter(key => key !== 'subContainerBackground' && key !== 'taskBorder');
      return arr.length ? arr : [elementsToShow[0].key];
    }
  } catch {}
  return [elementsToShow[0].key];
};

const setSelectedElementsLS = (componentKey, arr) => {
  try {
    const filtered = arr.filter(key => key !== 'subContainerBackground' && key !== 'taskBorder');
    localStorage.setItem(`customColorSelectedElements_${componentKey}`, JSON.stringify(filtered));
  } catch {}
};

const isValidHex = (value) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
const isGradient = (value) => typeof value === 'string' && value.startsWith('linear-gradient');

const GRADIENT_DIRECTIONS = [
  { value: 'to right', label: '→ справа' },
  { value: 'to left', label: '← слева' },
  { value: 'to bottom', label: '↓ вниз' },
  { value: 'to top', label: '↑ вверх' },
];

// --- Утилиты для конвертации цветов ---
function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result) return '#000000';
  return (
    '#' +
    result
      .slice(0, 3)
      .map(x => ('0' + parseInt(x).toString(16)).slice(-2))
      .join('')
  );
}

function hslToHex(hsl) {
  // hsl/hsla(217, 100%, 56%, 1)
  const res = hsl.match(/\d+\.?\d*/g);
  if (!res || res.length < 3) return '#000000';
  let h = parseFloat(res[0]);
  let s = parseFloat(res[1]) / 100;
  let l = parseFloat(res[2]) / 100;
  let a = res[3] !== undefined ? parseFloat(res[3]) : 1;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return (
    '#' +
    [r, g, b]
      .map(x => ('0' + x.toString(16)).slice(-2))
      .join('')
  );
}

function anyColorToHex(color) {
  if (!color) return '#000000';
  if (color.startsWith('#')) return color;
  if (color.startsWith('rgb')) return rgbToHex(color);
  if (color.startsWith('hsl')) return hslToHex(color);
  return '#000000';
}

const ModalColorPicker = ({ componentKey, onClose, elements }) => {
  if (componentKey && componentKey.startsWith('header_') && (!elements || elements.length < 2)) {
    return null;
  }
  const dispatch = useDispatch();
  const customColors = useSelector(state => state.customColors);
  const customColorsAll = useSelector(state => state.customColors);

  // --- Определяем, редактируем ли мы заблокированную задачу ---
  const isLockedSection = componentKey === 'lockedTask';
  const elementsToShow = elements || (isLockedSection ? LOCKED_ELEMENTS : ELEMENTS);

  // --- DEBUG ---
  console.log('ModalColorPicker:', { componentKey, elementsToShow });

  const hasCustomColor = (elKey) => !!customColors[`${componentKey}_${elKey}`];

  const [selectedElements, setSelectedElements] = useState(() => getSelectedElementsLS(componentKey, elementsToShow));

  // --- Локальное состояние для цветов и hexInput ---
  const [localColors, setLocalColors] = useState(() => {
    const obj = {};
    elementsToShow.forEach(el => {
      obj[el.key] = customColors[`${componentKey}_${el.key}`] || el.default;
    });
    return obj;
  });
  const [localHexInputs, setLocalHexInputs] = useState(() => {
    const obj = {};
    elementsToShow.forEach(el => {
      obj[el.key] = customColors[`${componentKey}_${el.key}`] || el.default;
    });
    return obj;
  });

  // 1. Добавляю локальное состояние для прозрачности
  const [localOpacity, setLocalOpacity] = useState(() => {
    const obj = {};
    elementsToShow.forEach(el => {
      obj[el.key] = 1;
    });
    return obj;
  });

  // Состояние для редактора градиента
  const [gradientEditor, setGradientEditor] = useState({}); // { [elKey]: { open, start, end, direction, balance } }

  // Новое состояние для Photoshop-style градиента
  const [colorStops, setColorStops] = useState([
    { color: '#000000', position: 0 },
    { color: '#4096ff', position: 100 },
  ]);
  const [opacityStops, setOpacityStops] = useState([
    { opacity: 1, position: 0 },
    { opacity: 1, position: 100 },
  ]);
  const [activeColorStop, setActiveColorStop] = useState(null); // индекс выбранного color stop
  const [activeOpacityStop, setActiveOpacityStop] = useState(null); // индекс выбранного opacity stop

  const [showGradientEditor, setShowGradientEditor] = useState(null); // elKey или null

  // 2. Синхронизация при открытии/смене компонента
  useEffect(() => {
    setSelectedElements(getSelectedElementsLS(componentKey, elementsToShow));
    setLocalColors(() => {
      const obj = {};
      elementsToShow.forEach(el => {
        obj[el.key] = customColors[`${componentKey}_${el.key}`] || el.default;
      });
      return obj;
    });
    setLocalHexInputs(() => {
      const obj = {};
      elementsToShow.forEach(el => {
        obj[el.key] = customColors[`${componentKey}_${el.key}`] || el.default;
      });
      return obj;
    });
    setLocalOpacity(() => {
      const obj = {};
      elementsToShow.forEach(el => {
        const val = customColors[`${componentKey}_${el.key}`] || el.default;
        if (val && val.startsWith('rgba')) {
          const match = val.match(/rgba\([^,]+,[^,]+,[^,]+,([^)]+)\)/);
          obj[el.key] = match ? parseFloat(match[1]) : 1;
        } else {
          obj[el.key] = 1;
        }
      });
      return obj;
    });
    setGradientEditor({});
  }, [componentKey, customColors]);

  // 3. При изменении цвета или прозрачности формируем итоговый цвет
  const handleOpacityChange = (elKey, value) => {
    setLocalOpacity(prev => ({ ...prev, [elKey]: value }));
    let hex = localHexInputs[elKey];
    // Если hex невалиден, пробуем взять из текущего цвета
    if (!isValidHex(hex)) {
      const current = localColors[elKey];
      if (current && current.startsWith('rgba')) {
        const match = current.match(/rgba\((\d+),(\d+),(\d+),/);
        if (match) {
          hex = `#${(+match[1]).toString(16).padStart(2, '0')}${(+match[2]).toString(16).padStart(2, '0')}${(+match[3]).toString(16).padStart(2, '0')}`;
        }
      } else if (isValidHex(current)) {
        hex = current;
      } else {
        hex = '#000000';
      }
    }
    setLocalColors(prev => ({
      ...prev,
      [elKey]: `rgba(${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)},${value})`
    }));
  };

  const handleColorChange = (elKey, value) => {
    setLocalHexInputs(prev => ({ ...prev, [elKey]: value }));
    setLocalColors(prev => {
      const opacity = localOpacity[elKey] ?? 1;
      if (isValidHex(value)) {
        return { ...prev, [elKey]: `rgba(${parseInt(value.slice(1,3),16)},${parseInt(value.slice(3,5),16)},${parseInt(value.slice(5,7),16)},${opacity})` };
      }
      return { ...prev, [elKey]: value };
    });
    // НЕ сбрасываем opacity!
  };

  const handleHexInput = (elKey, value) => {
    setLocalHexInputs(prev => ({ ...prev, [elKey]: value }));
  };

  const handleHexBlur = (elKey) => {
    const value = localHexInputs[elKey];
    if (isValidHex(value)) {
      setLocalColors(prev => ({ ...prev, [elKey]: value }));
    } else {
      setLocalHexInputs(prev => ({ ...prev, [elKey]: localColors[elKey] }));
    }
  };

  const handleHexKeyDown = (elKey, e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleCheckbox = (key) => {
    setSelectedElements((prev) =>
      prev.includes(key)
        ? prev.filter((el) => el !== key)
        : [...prev, key]
    );
  };

  const handleSelectAll = () => {
    setSelectedElements(elementsToShow.map(el => el.key));
  };

  const handleSave = () => {
    selectedElements.forEach(elKey => {
      dispatch(setComponentColor({ componentKey: `${componentKey}_${elKey}`, color: localColors[elKey] }));
    });
    setSelectedElementsLS(componentKey, selectedElements);
    onClose();
  };

  const handleReset = () => {
    setSelectedElementsLS(componentKey, selectedElements);
    setLocalColors(prev => {
      const obj = { ...prev };
      elementsToShow.forEach(el => {
        if (selectedElements.includes(el.key)) {
          obj[el.key] = el.default;
        }
      });
      return obj;
    });
    setLocalHexInputs(prev => {
      const obj = { ...prev };
      elementsToShow.forEach(el => {
        if (selectedElements.includes(el.key)) {
          obj[el.key] = el.default;
        }
      });
      return obj;
    });
    setLocalOpacity(prev => {
      const obj = { ...prev };
      elementsToShow.forEach(el => {
        obj[el.key] = 1;
      });
      return obj;
    });
    setGradientEditor({});
  };

  // Открыть/закрыть редактор градиента
  const openGradientEditor = (elKey) => {
    const value = localColors[elKey];
    // Получаем дефолт для этого элемента
    const element = elementsToShow.find(el => el.key === elKey);
    const defaultValue = element ? element.default : '#4096ff';
    let start = '#4096ff', end = '#ffffff', direction = 'to right', balance = 50;

    // Универсальная регулярка для всех цветовых форматов
    const colorRegex = /#([0-9A-Fa-f]{3,6})|rgb(a)?\([^\)]+\)|hsl(a)?\([^\)]+\)/g;

    function parseGradient(str) {
      if (!str) return [];
      return str.match(colorRegex) || [];
    }

    if (isGradient(value)) {
      const matches = parseGradient(value);
      if (matches.length > 1) {
        start = matches[0];
        end = matches[1];
      }
      const dirMatch = value.match(/to [a-z]+/);
      if (dirMatch) direction = dirMatch[0];
      // Парсим balance из градиента, если есть
      const balMatch = value.match(/\b(\d{1,3})%/g);
      if (balMatch && balMatch.length >= 2) {
        // Например: color1 0%, color1 30%, color2 30%, color2 100%
        const percent = parseInt(balMatch[0]);
        if (!isNaN(percent)) balance = percent;
      }
    } else if (isValidHex(value)) {
      start = value;
      end = '#ffffff';
    } else if (isGradient(defaultValue)) {
      const matches = parseGradient(defaultValue);
      if (matches.length > 1) {
        start = matches[0];
        end = matches[1];
      }
      const dirMatch = defaultValue.match(/to [a-z]+/);
      if (dirMatch) direction = dirMatch[0];
      // balance по умолчанию 50
    } else if (isValidHex(defaultValue)) {
      start = defaultValue;
      end = '#ffffff';
    }

    setGradientEditor(prev => ({
      ...prev,
      [elKey]: {
        open: true,
        start,
        end,
        direction,
        balance,
      }
    }));
  };
  const closeGradientEditor = (elKey) => {
    setGradientEditor(prev => ({ ...prev, [elKey]: { ...prev[elKey], open: false } }));
  };
  const applyGradient = (elKey) => {
    const { start, end, direction, balance = 50 } = gradientEditor[elKey];
    let gradient;
    if (balance === 0) {
      gradient = `linear-gradient(${direction}, ${start} 0%, ${start} 100%)`;
    } else if (balance === 100) {
      gradient = `linear-gradient(${direction}, ${end} 0%, ${end} 100%)`;
    } else {
      // Плавный переход: небольшой диапазон между цветами (±2.5%)
      const stop1 = Math.max(balance - 2.5, 0);
      const stop2 = Math.min(balance + 2.5, 100);
      gradient = `linear-gradient(${direction}, ${start} 0%, ${start} ${stop1}%, ${end} ${stop2}%, ${end} 100%)`;
    }
    setLocalColors(prev => ({ ...prev, [elKey]: gradient }));
    setLocalHexInputs(prev => ({ ...prev, [elKey]: gradient }));
    setGradientEditor(prev => ({ ...prev, [elKey]: { ...prev[elKey], open: false } }));
  };

  // Генерация CSS-градиента с поддержкой прозрачности
  const getGradientCSS = (elKey = null) => {
    const angle = elKey && gradientEditor[elKey]?.angle !== undefined ? gradientEditor[elKey].angle : 90;
    // Сначала применяем opacity к цветам
    const stops = colorStops.map(cs => {
      // Ищем ближайший opacity stop слева
      let left = opacityStops[0];
      for (let i = 0; i < opacityStops.length; i++) {
        if (opacityStops[i].position <= cs.position) left = opacityStops[i];
      }
      // Ищем ближайший opacity stop справа
      let right = opacityStops[opacityStops.length - 1];
      for (let i = opacityStops.length - 1; i >= 0; i--) {
        if (opacityStops[i].position >= cs.position) right = opacityStops[i];
      }
      // Интерполируем opacity
      let opacity = left.opacity;
      if (right.position !== left.position) {
        const t = (cs.position - left.position) / (right.position - left.position);
        opacity = left.opacity + (right.opacity - left.opacity) * t;
      }
      // Преобразуем HEX в rgba
      const hex = cs.color.replace('#', '');
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r},${g},${b},${opacity}) ${cs.position}%`;
    });
    return `linear-gradient(${angle}deg, ${stops.join(', ')})`;
  };

  // Экспорт цветов
  const handleExportColors = () => {
    const dataStr = JSON.stringify(customColorsAll, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customColors.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Импорт цветов
  const handleImportColors = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        Object.entries(json).forEach(([componentKey, color]) => {
          dispatch(setComponentColor({ componentKey, color }));
        });
      } catch (err) {
        alert('Ошибка при чтении файла!');
      }
    };
    reader.readAsText(file);
  };

  // Сброс всех цветов
  const handleResetAll = () => {
    if (window.confirm('Сбросить все цвета до исходных?')) {
      dispatch(resetAllColors());
    }
  };

  return (
    <Modal show onHide={onClose} centered backdrop="static" dialogClassName="modal-wide-content">
      <div onClick={e => e.stopPropagation()}>
        <Modal.Header closeButton>
          <Modal.Title>{isLockedSection ? 'Настройка цвета заблокированной секции' : 'Настройка цвета секции'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <label style={{ fontWeight: 500, flex: 1 }}>Выберите элементы и их цвет:</label>
            <Button size="sm" variant="outline-primary" onClick={handleSelectAll} style={{ marginLeft: 8 }}>
              Выбрать все
            </Button>
          </div>
          <Form>
            {elementsToShow.map(el => (
              <div key={el.key} style={{ display: 'flex', alignItems: 'center', marginTop: 8, position: 'relative' }}>
                <Form.Check
                  type="checkbox"
                  label={el.label}
                  checked={selectedElements.includes(el.key)}
                  onChange={() => handleCheckbox(el.key)}
                  style={{ marginRight: 12, minWidth: 140 }}
                />
                <input
                  type="color"
                  value={isValidHex(localHexInputs[el.key]) ? localHexInputs[el.key] : el.default}
                  onChange={e => handleColorChange(el.key, e.target.value)}
                  disabled={!selectedElements.includes(el.key) || isGradient(localColors[el.key])}
                  style={{ width: 40, height: 32, border: 'none', background: 'none', opacity: selectedElements.includes(el.key) ? 1 : 0.5 }}
                />
                {/* Превью итогового цвета с прозрачностью */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    marginLeft: 8,
                    borderRadius: 4,
                    border: '1px solid #eee',
                    background: localColors[el.key],
                    display: 'inline-block',
                    verticalAlign: 'middle'
                  }}
                />
                <input
                  type="text"
                  value={localHexInputs[el.key]}
                  onChange={e => handleHexInput(el.key, e.target.value)}
                  onBlur={() => handleHexBlur(el.key)}
                  onKeyDown={e => handleHexKeyDown(el.key, e)}
                  disabled={!selectedElements.includes(el.key)}
                  maxLength={7}
                  style={{ width: 70, marginLeft: 10, color: '#888', fontSize: 13, border: '1px solid #eee', borderRadius: 4, background: selectedElements.includes(el.key) ? '#fff' : '#f5f5f5' }}
                  placeholder="#RRGGBB"
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(localOpacity[el.key]*100)}
                  onChange={e => {
                    const percent = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                    const val = percent / 100;
                    setLocalOpacity(prev => ({ ...prev, [el.key]: val }));
                    let hex = localHexInputs[el.key];
                    // Если hex невалиден, пробуем взять из текущего цвета
                    if (!isValidHex(hex)) {
                      const current = localColors[el.key];
                      if (current && current.startsWith('rgba')) {
                        const match = current.match(/rgba\((\d+),(\d+),(\d+),/);
                        if (match) {
                          hex = `#${(+match[1]).toString(16).padStart(2, '0')}${(+match[2]).toString(16).padStart(2, '0')}${(+match[3]).toString(16).padStart(2, '0')}`;
                        }
                      } else if (isValidHex(current)) {
                        hex = current;
                      } else {
                        hex = '#000000';
                      }
                    }
                    setLocalColors(prev => ({
                      ...prev,
                      [el.key]: `rgba(${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)},${val})`
                    }));
                  }}
                  disabled={!selectedElements.includes(el.key)}
                  style={{ width: 50, marginLeft: 6 }}
                />
                <span style={{ marginLeft: 4, minWidth: 32 }}>{Math.round(localOpacity[el.key]*100)}%</span>
                {selectedElements.includes(el.key) && (
                  <>
                    {isGradient(localColors[el.key]) && (
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
                        <div style={{ width: 120, height: 32, borderRadius: 4, border: '1px solid #eee', background: localColors[el.key], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#888', marginRight: 8 }}>
                          Градиент
                        </div>
                        <Button size="sm" variant="outline-info" style={{ marginLeft: 8 }} onClick={() => setShowGradientEditor(el.key)}>
                          Градиент
                        </Button>
                        <span
                          style={{
                            marginLeft: 8,
                            cursor: 'pointer',
                            fontSize: 20,
                            color: '#e74c3c',
                            userSelect: 'none',
                          }}
                          title="Сбросить градиент"
                          onClick={() => handleColorChange(el.key, el.default)}
                        >
                          ❌
                        </span>
                      </div>
                    )}
                    {!isGradient(localColors[el.key]) && (
                      <Button size="sm" variant="outline-info" style={{ marginLeft: 8 }} onClick={() => setShowGradientEditor(el.key)}>
                        Градиент
                      </Button>
                    )}
                  </>
                )}
                {showGradientEditor === el.key && (
                  <div style={{ position: 'absolute', top: 40, left: 0, zIndex: 10, background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', minWidth: 360 }}>
                    {/* Photoshop-style редактор градиента */}
                    <div style={{ margin: '12px 0', padding: 12, background: '#444', borderRadius: 12 }}>
                      {/* Поле для ввода угла направления градиента */}
                      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <label style={{ color: '#fff', fontSize: 14 }}>Угол:</label>
                        <input
                          type="number"
                          min={0}
                          max={360}
                          value={gradientEditor[el.key]?.angle || 90}
                          onChange={e => {
                            const angle = Math.max(0, Math.min(360, Number(e.target.value)));
                            setGradientEditor(prev => ({ ...prev, [el.key]: { ...prev[el.key], angle } }));
                          }}
                          style={{ width: 60, fontSize: 14, borderRadius: 4, border: '1px solid #ccc', padding: '2px 6px' }}
                        />
                        <span style={{ color: '#fff', fontSize: 14 }}>°</span>
                      </div>
                      {/* Opacity stops (сверху) */}
                      <div style={{ position: 'relative', height: 24, marginBottom: 4 }}>
                        {opacityStops.map((stop, idx) => (
                          <Draggable
                            key={idx}
                            axis="x"
                            bounds={{ left: 0, right: 250 }}
                            position={{ x: (stop.position / 100) * 250, y: 0 }}
                            onStop={(e, data) => {
                              const newStops = [...opacityStops];
                              newStops[idx].position = Math.max(0, Math.min(100, Math.round((data.x / 250) * 100)));
                              setOpacityStops(newStops.sort((a, b) => a.position - b.position));
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: 16,
                                height: 16,
                                background: '#fff',
                                border: '2px solid #888',
                                borderRadius: 4,
                                opacity: stop.opacity,
                                cursor: 'pointer',
                                transform: 'translate(-8px, 0)',
                                boxShadow: activeOpacityStop === idx ? '0 0 0 2px #4096ff' : 'none',
                              }}
                              onClick={() => setActiveOpacityStop(idx)}
                              title={`Opacity: ${Math.round(stop.opacity * 100)}%`}
                            />
                          </Draggable>
                        ))}
                      </div>
                      {/* Градиент-превью */}
                      <div style={{ position: 'relative', height: 32, width: 250, background: getGradientCSS(el.key), borderRadius: 6, margin: '0 0 4px 0' }} />
                      {/* Color stops (снизу) */}
                      <div style={{ position: 'relative', height: 24, marginTop: 4 }}>
                        {colorStops.map((stop, idx) => (
                          <Draggable
                            key={idx}
                            axis="x"
                            bounds={{ left: 0, right: 250 }}
                            position={{ x: (stop.position / 100) * 250, y: 0 }}
                            onStop={(e, data) => {
                              const newStops = [...colorStops];
                              newStops[idx].position = Math.max(0, Math.min(100, Math.round((data.x / 250) * 100)));
                              setColorStops(newStops.sort((a, b) => a.position - b.position));
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: 16,
                                height: 16,
                                background: stop.color,
                                border: activeColorStop === idx ? '3px solid #fff' : '2px solid #fff',
                                borderRadius: 4,
                                cursor: 'pointer',
                                transform: 'translate(-8px, 0)',
                                boxShadow: activeColorStop === idx ? '0 0 0 2px #4096ff, 0 2px 8px #4096ff44' : 'none',
                              }}
                              onClick={() => setActiveColorStop(idx)}
                              title={stop.color}
                            />
                          </Draggable>
                        ))}
                      </div>
                      {/* Color picker для выбранного color stop */}
                      {activeColorStop !== null && (
                        <div style={{ marginTop: 12, position: 'relative', zIndex: 10000 }}>
                          <HexColorPicker
                            color={colorStops[activeColorStop].color}
                            onChange={color => {
                              const newStops = [...colorStops];
                              newStops[activeColorStop].color = color;
                              setColorStops(newStops);
                            }}
                          />
                          <input
                            type="text"
                            value={colorStops[activeColorStop].color}
                            onChange={e => {
                              const newStops = [...colorStops];
                              newStops[activeColorStop].color = e.target.value;
                              setColorStops(newStops);
                            }}
                            style={{ marginTop: 8, width: 100 }}
                          />
                        </div>
                      )}
                      {/* Opacity input для выбранного opacity stop */}
                      {activeOpacityStop !== null && (
                        <div style={{ marginTop: 12 }}>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={opacityStops[activeOpacityStop].opacity}
                            onChange={e => {
                              const newStops = [...opacityStops];
                              newStops[activeOpacityStop].opacity = parseFloat(e.target.value);
                              setOpacityStops(newStops);
                            }}
                          />
                          <span style={{ marginLeft: 8 }}>{Math.round(opacityStops[activeOpacityStop].opacity * 100)}%</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                        <Button size="sm" variant="secondary" onClick={() => setShowGradientEditor(null)}>Отмена</Button>
                        <Button size="sm" variant="success" onClick={() => {
                          setShowGradientEditor(null);
                          // Применяем градиент только в localColors
                          handleColorChange(el.key, getGradientCSS(el.key));
                        }}>Применить</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Form>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={handleExportColors}>Экспорт цветов</Button>
            <label style={{ margin: 0 }}>
              <Button variant="secondary" as="span">Импорт цветов</Button>
              <input type="file" accept="application/json" style={{ display: 'none' }} onChange={handleImportColors} />
            </label>
            <Button variant="danger" onClick={handleResetAll}>Сбросить все</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleReset} disabled={selectedElements.every(elKey => !hasCustomColor(elKey))}>
            Сбросить
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ModalColorPicker; 