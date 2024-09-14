import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { styled } from 'styled-components';
import { DollarOutlined } from '@ant-design/icons';
const { Meta } = Card;
import { EducationData } from './Data';

const EducationContainer = styled.div`
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

const EducationPage = () => {
    const [purchasedItems, setPurchasedItems] = useState({});
    
    const handlePurchase = (itemKey) => {
        setPurchasedItems((prev) => ({ ...prev, [itemKey]: true }));
    };

    return (
    <EducationContainer>
          {Object.keys(EducationData).map((key) => {
            const { image, title, description, price } = EducationData[key];
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
        </EducationContainer>
    );
};

export default EducationPage;




// import React, { useState } from 'react';
// import { Card, Button } from 'antd';
// import { DollarOutlined } from '@ant-design/icons';
// const { Meta } = Card;
// import { EducationData } from './Data';

// const EducationPage = () => {
//     const [purchasedItems, setPurchasedItems] = useState({});
//     const handlePurchase = (itemKey) => {
//         setPurchasedItems((prev) => ({ ...prev, [itemKey]: true }));
//       };

//     return (
//         <div style={{ 
//           display: 'flex', 
//           flexWrap: 'nowrap', 
//           justifyContent: 'center',
//           alignItems: 'center',   
//           flexDirection: 'column',       }}>
//           {Object.keys(EducationData).map((key) => {
//             const { image, title, description, price } = EducationData[key];
//             const isPurchased = purchasedItems[key] || false;
    
//             return (
//               <Card
//                 key={key}
//                 style={{ width: 300 }}
//                 cover={<img 
//                   alt={title} 
//                   src={image} 
//                   style={{ width: '40%', margin: '0 auto' }}/>}
//                 actions={[
//                   <Button
//                     type="primary"
//                     onClick={() => handlePurchase(key)}
//                     disabled={isPurchased}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       fontSize: '15px',
//                       objectFit: 'cover',
//                       margin: '0',
//                       display: 'flex',
//                       flexWrap: 'wrap',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <span style={{ marginRight: '0px' }}>{isPurchased ? 'Куплено' : price}</span>
//                     <DollarOutlined style={{ fontSize: '20px' }} />
//                   </Button>,
//                 ]}
//               >
//                 <Meta title={title} description={description} />
//               </Card>
//             );
//           })}
//         </div>
//   );
// };
// export default EducationPage;



