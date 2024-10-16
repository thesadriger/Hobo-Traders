// Graphic.js
import React, { useEffect, useState, useMemo } from 'react';
import { Line } from '@ant-design/plots';
import styled from 'styled-components';

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.main};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background-color: ${({ theme }) => theme.colors.graphBackground};
  padding: 10px;
  overflow: hidden;
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  pointer-events: none;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 0.3s;
`;

// Компонент графика
const Graphic = ({ setCurrentPrice, intervalSpeed, isTradeActive, initialPrice, range }) => {
  const [data, setData] = useState([]);

  const minPrice = range[0];
  const maxPrice = range[1];

  // Функция для получения следующей цены
  const getNextPrice = (currentPrice) => {
    const change = (Math.random() * 0.2 - 0.1).toFixed(2);
    let newPrice = parseFloat(currentPrice) + parseFloat(change);
    if (newPrice < minPrice) newPrice = minPrice;
    if (newPrice > maxPrice) newPrice = maxPrice;
    return newPrice.toFixed(2);
  };

  // Генерация начальных данных с фиксированным индексом
  const generateInitialData = () => {
    const initialData = [];
    let currentPrice = initialPrice;
    for (let i = 1; i <= 50; i++) {
      currentPrice = getNextPrice(currentPrice);
      initialData.push({ index: i, value: parseFloat(currentPrice) });
    }
    return initialData;
  };

  // Обновляем данные при изменении монеты
  useEffect(() => {
    setData(generateInitialData());
  }, [initialPrice, minPrice, maxPrice]);

  useEffect(() => {
    const updateChart = () => {
      setData((prevData) => {
        const newData = prevData.slice(1); // Удаляем первый элемент
        const lastIndex = prevData[prevData.length - 1].index;
        const newIndex = lastIndex + 1;
        const newValue = getNextPrice(prevData[prevData.length - 1].value);

        newData.push({ index: newIndex, value: parseFloat(newValue) });
        return newData;
      });
    };

    const interval = setInterval(updateChart, intervalSpeed);

    return () => clearInterval(interval);
  }, [intervalSpeed, minPrice, maxPrice]);

  useEffect(() => {
    const lastDataPoint = data[data.length - 1];
    if (lastDataPoint && typeof setCurrentPrice === 'function') {
      setCurrentPrice(lastDataPoint.value);
    }
  }, [data, setCurrentPrice]);

  const config = useMemo(
    () => ({
      data,
      padding: 'auto',
      xField: 'index', // Используем 'index' вместо 'time'
      yField: 'value',
      smooth: false,
      autoFit: true,
      color: '#52c41a',
      areaStyle: () => {
        return { fill: 'l(270) 0:#ffffff 0.5:#52c41a 1:#52c41a' };
      },
      yAxis: {
        label: {
          formatter: (v) => `$${v}`,
        },
        min: minPrice,
        max: maxPrice,
      },
      xAxis: {
        label: {
          autoHide: true,
        },
        tickCount: 5, // Устанавливаем количество меток на оси X
      },
      tooltip: false,
      animation: {
        appear: {
          animation: 'path-in',
          duration: 500,
        },
      },
      interactions: [],
    }),
    [data, minPrice, maxPrice]
  );

  return (
    <ChartWrapper>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Line {...config} />
        <BlurOverlay isActive={isTradeActive} />
      </div>
    </ChartWrapper>
  );
};

export default Graphic;
