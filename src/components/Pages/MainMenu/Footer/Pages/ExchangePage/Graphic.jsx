// Graphic.js
import React, { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

const CHART_HEIGHT = 220;

const ChartWrapper = styled.div`
  width: 100%;
  height: ${CHART_HEIGHT}px;
  min-height: ${CHART_HEIGHT}px;
  max-height: ${CHART_HEIGHT}px;
  background: #181a20;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 8px;
  display: flex;
`;

// Обёртка для recharts-responsive-container с height: 40vw
const ResponsiveContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${CHART_HEIGHT}px;
  max-height: ${CHART_HEIGHT}px;
`;

const Graphic = React.memo(({ data, visible = true }) => {
  console.log('[Graphic] data prop:', data); // DEBUG
  const chartComponentRef = useRef(null);
  const chartData = Array.isArray(data) ? data.slice(-200) : [];
  const filteredData = chartData.filter(
    d => typeof d.price === 'number' && !isNaN(d.price) && d.time
  );
  console.log('[Graphic] filteredData:', filteredData); // DEBUG

  if (!Array.isArray(data)) {
    return <div style={{textAlign: 'center', color: '#aaa'}}>Некорректные данные для графика</div>;
  }
  if (filteredData.length === 0) {
    return <div style={{textAlign: 'center', color: '#aaa'}}>Нет данных для графика (filteredData пуст)</div>;
  }

  // baseline — первая цена
  const baseline = filteredData[0].price;
  // Формируем массив цен
  const prices = filteredData.map(d => d.price);
  // Формируем массив времён (для X axis)
  const times = filteredData.map(d => d.time);

  // Формируем split area: массивы для зелёной и красной area
  const areaGreen = prices.map(p => (p >= baseline ? p : null));
  const areaRed = prices.map(p => (p < baseline ? p : null));

  // Формируем цветную линию: массив цветов для каждого сегмента
  const zones = prices.map((p, i) => ({
    value: i,
    color: p >= baseline ? '#16c784' : '#ea3943',
  }));

  // Highcharts options
  const options = {
    chart: {
      backgroundColor: '#181a20',
      height: CHART_HEIGHT,
      style: { fontFamily: 'inherit' },
      spacing: [16, 0, 0, 0],
    },
    title: { text: '' },
    xAxis: {
      categories: prices.map((_, i) => i),
      visible: false,
    },
    yAxis: {
      visible: true,
      labels: { enabled: false },
      gridLineWidth: 0,
      min: Math.min(...prices, baseline),
      max: Math.max(...prices, baseline),
      plotLines: [{
        value: baseline,
        color: 'rgba(255,255,255,0.95)',
        dashStyle: 'Dash',
        width: 2,
        zIndex: 20,
      }],
    },
    tooltip: {
      backgroundColor: '#222',
      borderColor: 'none',
      borderRadius: 8,
      style: { color: '#fff', fontSize: '14px' },
      formatter: function() {
        const time = times[this.point.index];
        const date = time ? new Date(time) : null;
        const timeStr = date ? date.toLocaleTimeString() : '';
        return `<b>${this.y.toFixed(2)}</b><br/>${timeStr}`;
      },
    },
    plotOptions: {
      series: {
        marker: { enabled: false },
        lineWidth: 2,
        states: { hover: { enabled: false } },
        animation: false,
        enableMouseTracking: true,
        shadow: {
          color: 'rgba(22,199,132,0.5)',
          width: 8,
          offsetX: 0,
          offsetY: 0,
        },
        turboThreshold: 500,
      },
      areaspline: {
        fillOpacity: 0.3,
        threshold: baseline,
        turboThreshold: 500,
      },
    },
    series: [
      // Зелёная area
      {
        type: 'areaspline',
        data: areaGreen,
        color: '#16c784',
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, 'rgba(22,199,132,0.3)'],
            [1, 'rgba(22,199,132,0)'],
          ],
        },
        lineWidth: 0,
        zIndex: 1,
        enableMouseTracking: false,
        connectNulls: false,
        turboThreshold: 500,
      },
      // Красная area
      {
        type: 'areaspline',
        data: areaRed,
        color: '#ea3943',
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, 'rgba(234,57,67,0.3)'],
            [1, 'rgba(234,57,67,0)'],
          ],
        },
        lineWidth: 0,
        zIndex: 1,
        enableMouseTracking: false,
        connectNulls: false,
        turboThreshold: 500,
      },
      // Линия с динамическим цветом
      {
        type: 'spline',
        data: prices,
        color: '#16c784', // базовый цвет
        lineWidth: 2,
        zIndex: 2,
        zones: zones,
        zoneAxis: 'x',
        marker: { enabled: false },
        enableMouseTracking: true,
        animation: false,
        connectNulls: true,
        turboThreshold: 500,
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
    responsive: {
      rules: [
        {
          condition: { maxWidth: 600 },
          chartOptions: {
            chart: { height: 140 },
          },
        },
      ],
    },
  };

  // Адаптивная высота и reflow при появлении графика
  useEffect(() => {
    if (chartComponentRef.current && chartComponentRef.current.chart) {
      chartComponentRef.current.chart.reflow();
    }
  }, [data, visible]);

  // Добавить reflow при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (chartComponentRef.current && chartComponentRef.current.chart) {
        chartComponentRef.current.chart.reflow();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ChartWrapper>
      <ResponsiveContainerWrapper>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
          containerProps={{ style: { width: '100%', height: '100%' } }}
        />
      </ResponsiveContainerWrapper>
    </ChartWrapper>
  );
});

export default Graphic;
