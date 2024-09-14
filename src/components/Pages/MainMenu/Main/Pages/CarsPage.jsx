import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { styled } from 'styled-components';
import { DollarOutlined } from '@ant-design/icons';
const { Meta } = Card;
import { CarsData } from './Data';

const CarsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  flex: 1;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 10px;
}
`;

const CarsPage = () => {
    const [purchasedItems, setPurchasedItems] = useState({});
    
    const handlePurchase = (itemKey) => {
        setPurchasedItems((prev) => ({ ...prev, [itemKey]: true }));
    };

    return (
    <CarsContainer>
          {Object.keys(CarsData).map((key) => {
            const { image, title, description, price } = CarsData[key];
            const isPurchased = purchasedItems[key] || false;
    
            return (
              <Card
                key={key}
                style={{ width: '100%', maxWidth: '300px' }} // Ограничиваем максимальную ширину
                cover={
                  <img
                    alt={title}
                    src={image}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                }
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handlePurchase(key)}
                    disabled={isPurchased}
                    style={{
                      width: '100%',
                      height: '50px',
                      fontSize: '15px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <span>{isPurchased ? 'Куплено' : price}</span>
                    <DollarOutlined style={{ marginLeft: '8px', fontSize: '20px' }} />
                  </Button>,
                ]}
              >
                <Meta title={title} description={description} />
              </Card>
            );
          })}
        </CarsContainer>
    );
};

export default CarsPage;
