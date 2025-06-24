// PurchaseSection.jsx
import React from 'react';
import { Card, message } from 'antd';
import styled from 'styled-components';
import { DollarOutlined, LockOutlined } from '@ant-design/icons';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseUSDT, decreaseBTC, decreaseHBTRD } from '@/store/slices/balanceSlice';
import PurchaseButton from './PurchaseButton';

const { Meta } = Card;

// Стилизованный оверлей для заблокированных карточек (если уровень не достигнут)
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  z-index: 1;
`;

// Стилизованный текст для оверлея (замочек и уровень)
const OverlayText = styled.div`
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;

  svg {
    margin-left: 4px;
    color: gold;
  }
`;

// Стилизованная карточка с градиентом, тенью и плавной анимацией
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 300px;
  position: relative;
  opacity: ${({ $locked }) => ($locked ? 0.6 : 1)};
  background: linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border-radius: 18px;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  border: none;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.22);
  }
`;

// Основной компонент секции покупки
const PurchaseSection = ({ itemKey, itemData, isPurchased, onPurchase }) => {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.level.level); // Получаем уровень игрока из Redux
  const balance = useSelector((state) => state.balance);   // Получаем баланс игрока из Redux

  // Деструктуризация данных о товаре
  const { image, title, description, price, displayPrice, currency, requiredLevel } = itemData;

  // Проверка, открыт ли товар по уровню
  const isLocked = level < requiredLevel;

  // Функция покупки
  const handlePurchase = () => {
    if (balance[currency] < price) {
      message.error('Недостаточно средств!');
      return;
    }

    // Уменьшаем баланс в зависимости от валюты
    switch (currency) {
      case 'btc':
        dispatch(decreaseBTC(price));
        break;
      case 'hbtrd':
        dispatch(decreaseHBTRD(price));
        break;
      case 'usdt':
      default:
        dispatch(decreaseUSDT(price));
        break;
    }

    onPurchase(itemKey); // Отмечаем товар как купленный
    message.success('Покупка успешно совершена!');
  };

  return (
    <StyledCard
      $locked={isLocked}
      cover={
        <img
          alt={title}
          src={image}
          style={{
            height: '220px',
            objectFit: 'cover',
            borderRadius: '18px 18px 0 0'
          }}
        />
      }
      actions={[
        <PurchaseButton
          type="primary"
          onClick={handlePurchase}
          disabled={isPurchased || isLocked}
          $isInactive={isPurchased}
        >
          {isLocked ? (
            <>
              <LockOutlined style={{ marginRight: '8px' }} />
              {`Уровень ${requiredLevel}`}
            </>
          ) : (
            <>
              {isPurchased ? 'Куплено' : displayPrice}
              {/* {!isPurchased && <DollarOutlined style={{ marginLeft: '8px' }} />} */}
            </>
          )}
        </PurchaseButton>,
      ]}
    >
      {/* Оверлей, если карточка заблокирована по уровню */}
      {isLocked && (
        <Overlay>
          <OverlayText>
            <LockOutlined style={{ marginRight: '8px' }} />
            {requiredLevel} <FaStar />
          </OverlayText>
        </Overlay>
      )}
      {/* Основная информация о товаре */}
      <Meta title={title} description={description} />
      {/* Блок с эффектами (еда, здоровье, веселье) */}
      <div style={{ display: 'flex', gap: '12px', margin: '12px 0 0 0' }}>
        {itemData.effects && Object.entries(itemData.effects).map(([key, value]) => (
          <div key={key} style={{
            background: '#f0fdfa',
            borderRadius: '8px',
            padding: '4px 10px',
            fontSize: '0.95rem',
            color: '#4096ff',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(64,150,255,0.07)'
          }}>
            {key === 'food' && '🍗'}
            {key === 'health' && '❤️'}
            {key === 'fun' && '🎉'}
            +{value}
          </div>
        ))}
      </div>
    </StyledCard>
  );
};

export default PurchaseSection;
