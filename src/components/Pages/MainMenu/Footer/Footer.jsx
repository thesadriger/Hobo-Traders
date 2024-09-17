import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from 'styled-components';
import { Drawer } from 'antd';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';

import Exchange from './Menu/Exchange.jsx';
import ExchangePage from './Pages/ExchangePage.jsx';
import Fun from './Menu/Fun.jsx';
import Health from './Menu/Health.jsx';
import Food from './Menu/Food.jsx';
import Shop from './Menu/Shop.jsx';

const FooterSection = styled.footer`
  flex: 0 0 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #323232;
  width: 100%;
  position: fixed; /* Фиксируем футер */
  bottom: 0; /* Располагаем его внизу экрана */
  z-index: 1000; /* Задаем высокий z-index */
`;

const FooterButton = styled.button`
  background-color: #323232;
  border: none;
  color: #fff; /* Добавляем цвет текста */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 60px; /* Устанавливаем единый размер кнопок */
  height: 60px;
  border-radius: 25%; /* Делаем кнопки круглыми, если нужно */
  &:hover {
    background-color: #4a4a4a;
  }
`;

const MainFooterSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 0%); /* Высота с учетом отступа под футер */
  overflow-y: auto; /* Добавляем прокрутку */
  padding-bottom: 10%; /* Отступ снизу, равный высоте Footer */
`;

const MotionContent = ({ activePage, children }) => {
  const x = useMotionValue(0);

  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;

  // Преобразуем значение 'x' в значение для 'filter: blur()'
  const blur = useTransform(x, [-screenWidth, 0, screenWidth], [20, 0, 20]);

  return (
    <motion.div
      key={activePage}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.2 }}
      style={{
        x, // Привязываем 'x' к motion value
        filter: `blur(${blur.get()}px)`, // Применяем размытие напрямую
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    >
      {children}
    </motion.div>
  );
};

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const [activePage, setActivePage] = useState(null); // Для отслеживания активной страницы

  const showDrawer = (page) => {
    if (activePage === page && visible) {
      // Если нажали на ту же кнопку, скрываем Drawer
      setVisible(false);
    } else {
      setActivePage(page);
      setVisible(true);
    }
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const renderContent = () => {
    let content;
    switch (activePage) {
      case 'exchange':
        content = <ExchangePage />;
        break;
      case 'fun':
        content = <Fun />;
        break;
      case 'health':
        content = <Health />;
        break;
      case 'food':
        content = <Food />;
        break;
      case 'shop':
        content = <Shop />;
        break;
      default:
        content = null;
    }

    return (
      <ContentWrapper>
        <AnimatePresence mode="wait">
          {content && (
            <MotionContent key={activePage} activePage={activePage}>
              {content}
            </MotionContent>
          )}
        </AnimatePresence>
      </ContentWrapper>
    );
  };

  return (
    <>
      <FooterSection>
        <MainFooterSection>
          <FooterButton onClick={() => showDrawer('exchange')}>
            <Exchange />
          </FooterButton>
          <FooterButton onClick={() => showDrawer('fun')}>Fun</FooterButton>
          <FooterButton onClick={() => showDrawer('health')}>Health</FooterButton>
          <FooterButton onClick={() => showDrawer('food')}>Food</FooterButton>
          <FooterButton onClick={() => showDrawer('shop')}>Shop</FooterButton>
        </MainFooterSection>
      </FooterSection>

      <Drawer
        title={
          activePage ? activePage.charAt(0).toUpperCase() + activePage.slice(1) : 'Menu'
        }
        placement="bottom"
        onClose={closeDrawer}
        open={visible}
        height="calc(100vh - 10%)"
        style={{ bottom: '10%' }}
        zIndex={999}
        styles={{
          body: {
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            bottom: '10%',
          },
        }}
        getContainer={false}
      >
        {renderContent()}
      </Drawer>
    </>
  );
};

export default Footer;




// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { styled } from 'styled-components'


// import Exchange from './Menu/Exchange.jsx'
// import Fun from './Menu/Fun.jsx'
// import Health from './Menu/Health.jsx'
// import Food from './Menu/Food.jsx'
// import Shop from './Menu/Shop.jsx'

// const FooterSection = styled.footer`
//   flex: 0 0 10%; 
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #323232;
//   width: 100%;
// `;
// const MainFooterSection = styled.section`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-direction: column;
//   width: 100%;
//   padding: 0.5rem;
//   flex: 1; /* Позволяем секции занимать доступное пространство */
// `;



// const Footer = () => {


//   return (
    
//     <FooterSection>
//       <MainFooterSection>
//       <div className="section">
//         <Exchange/>
//         <Fun/>
//         <Health/>
//         <Food/>
//         <Shop/>
//       </div>
//       </MainFooterSection>
//     </FooterSection>
//   );
// }

// export default Footer;
