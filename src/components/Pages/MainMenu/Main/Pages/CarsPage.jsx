import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
const { Meta } = Card;
import { CarsData } from './Data';

const CarsPage = () => {
    const [purchasedItems, setPurchasedItems] = useState({});
    const handlePurchase = (itemKey) => {
        setPurchasedItems((prev) => ({ ...prev, [itemKey]: true }));
      };

    return (
        <div style={{ 
            display: 'flex', 
            flexWrap: 'nowrap', 
            justifyContent: 'center',
            alignItems: 'center',   
            flexDirection: 'column',     }}>
          {Object.keys(CarsData).map((key) => {
            const { image, title, description, price } = CarsData[key];
            const isPurchased = purchasedItems[key] || false;
    
            return (
              <Card
                key={key}
                style={{ width: 300 }}
                cover={<img 
                  alt={title} 
                  src={image} 
                  style={{ width: '40%', margin: '0 auto' }}/>}
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handlePurchase(key)}
                    disabled={isPurchased}
                    style={{
                      width: '100%',
                      height: '100%',
                      fontSize: '15px',
                      objectFit: 'cover',
                      margin: '0',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ marginRight: '0px' }}>{isPurchased ? 'Куплено' : price}</span>
                    <DollarOutlined style={{ fontSize: '20px' }} />
                  </Button>,
                ]}
              >
                <Meta title={title} description={description} />
              </Card>
            );
          })}
        </div>
  );
};
export default CarsPage;
