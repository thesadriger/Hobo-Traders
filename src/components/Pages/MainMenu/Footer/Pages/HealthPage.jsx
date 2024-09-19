import React, { useEffect, useRef } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { styled } from 'styled-components';

const TaskCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card-background, #e0e0e0);
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  min-height: 4rem;
  margin-bottom: 0.5rem;
`;
const StyledCol = styled(Col)`
//   &:first-child {
//     margin-top: 0.5rem;
//   }

  &:last-child {
    margin-bottom: 0.5rem;
  }

  margin-bottom: 0.5rem;
`;

const TaskTitle = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const TaskIcon = styled.div`
  display: flex;
  align-items: center;
`;

const TaskButton = styled(Button)`
  background-color: var(--button-background, #a4cd39);
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  &:hover {
    background-color: var(--button-hover, #92b531);
  }
`;
const tasks = [
  { title: 'Купить мемкоин', icon: '', profit: '+', currency: '₽' },
  { title: 'Продать ненужные вещи', icon: '', profit: '+', currency: '₽' },
  { title: 'Помочь соседям', icon: '', profit: '+', currency: '₽' },
  { title: 'Сдать макулатуру', icon: '', profit: '+', currency: '₽' },
  { title: 'Подработать курьером', icon: '', profit: '+', currency: '₽' },
  { title: 'Участвовать в опросе', icon: '', profit: '+', currency: '₽' },
  { title: 'Принять участие в акции', icon: '', profit: '+', currency: '₽' },
  { title: 'Посетить бесплатный мастер-класс', icon: '', profit: '+', currency: '₽' },
  { title: 'Найти временную работу', icon: '', profit: '+', currency: '₽' },
  { title: 'Найти временную работу', icon: '', profit: '+', currency: '₽' },
];

const HealthPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Устанавливаем прокрутку в начало при монтировании компонента
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <Row
      ref={containerRef}
      style={{
        padding: '1rem',
        maxHeight: '80vh',
        overflowY: 'auto',
        width: '100%',
      }}
    >
      {tasks.map((task, index) => (
        <StyledCol span={24} key={index}>
          <TaskCard>
            <TaskIcon>
              <TaskTitle>{task.title}</TaskTitle>
            </TaskIcon>
            <TaskButton>Выполнить</TaskButton>
          </TaskCard>
        </StyledCol>
      ))}
    </Row>
  );
};

export default HealthPage;