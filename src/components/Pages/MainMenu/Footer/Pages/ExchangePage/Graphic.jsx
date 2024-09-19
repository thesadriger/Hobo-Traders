// Graphic.jsx
import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import styled from 'styled-components';

// Стили для карточки графика
const ChartWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  padding: 2px;
`;

// Компонент для генерации случайного изменения цены
const getNextPrice = (currentPrice) => {
  const change = (Math.random() * 0.2 - 0.1).toFixed(2);
  let newPrice = parseFloat(currentPrice) + parseFloat(change);
  if (newPrice < 1) newPrice = 1;
  if (newPrice > 5) newPrice = 5;
  return newPrice.toFixed(2);
};

// Генерация начальных данных для графика
const generateInitialData = (initialPrice, points) => {
  const data = [];
  let currentPrice = initialPrice;
  for (let i = 0; i < points; i++) {
    currentPrice = getNextPrice(currentPrice);
    data.push({ time: i, value: parseFloat(currentPrice) });
  }
  return data;
};

// Компонент графика
const Graphic = ({ setCurrentPrice, intervalSpeed }) => {
  const [data, setData] = useState(generateInitialData(1, 200)); // Генерация начальных данных

  useEffect(() => {
    const updateChart = () => {
      setData((prevData) => {
        const lastDataPoint = prevData[prevData.length - 1]; // Последняя точка на графике
        const newTime = lastDataPoint.time + 1; // Увеличиваем временную метку
        const newValue = getNextPrice(lastDataPoint.value); // Генерируем новую цену на основе предыдущей

        // Ограничиваем количество точек на графике до 200
        const updatedData = [...prevData, { time: newTime, value: parseFloat(newValue) }];
        if (updatedData.length > 200) {
          updatedData.shift(); // Удаляем старую точку
        }

        return updatedData;
      });
    };

    const interval = setInterval(updateChart, intervalSpeed);

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [intervalSpeed]);

  useEffect(() => {
    // Обновляем currentPrice только после того, как данные обновятся
    const lastDataPoint = data[data.length - 1];
    if (lastDataPoint && typeof setCurrentPrice === 'function') {
      setCurrentPrice(lastDataPoint.value); // Проверяем, что setCurrentPrice — это функция
    }
  }, [data, setCurrentPrice]); // Зависимость от data, чтобы обновлять только когда данные изменятся

  const config = {
    data,
    padding: 'auto',
    xField: 'time',
    yField: 'value',
    smooth: true, // Сглаживание графика
    height: 100, // Высота графика
    color: '#52c41a', // Цвет линии графика
    areaStyle: () => {
      return { fill: 'l(270) 0:#ffffff 0.5:#52c41a 1:#52c41a' }; // Градиент под графиком
    },
    yAxis: {
      label: {
        formatter: (v) => `$${v}`, // Форматирование значений оси Y
      },
      min: 1, // Минимум оси Y
      max: 5, // Максимум оси Y
    },
    xAxis: {
      label: {
        autoHide: true, // Скрытие меток оси X, если места мало
      },
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 500,
      },
    },
  };

  return (
    <ChartWrapper>
      <Line {...config} />
    </ChartWrapper>
  );
};

export default Graphic;
