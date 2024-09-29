// Footer.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Drawer } from 'antd';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';

import Exchange from './Menu/Exchange.jsx';
import ExchangePage from './Pages/ExchangePage/ExchangePage.jsx';
import Fun from './Menu/Fun.jsx';
import Health from './Menu/Health.jsx';
import Food from './Menu/Food.jsx';
import Shop from './Menu/Shop.jsx';
import HealthPage from './Pages/HealthPage.jsx';
import FunPage from './Pages/FunPage.jsx';
import FoodPage from './Pages/FoodPage.jsx';
import ShopPage from './Pages/ShopPage.jsx';

// Styled components
const FooterSection = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #323232;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1100; /* Увеличили z-index */
  padding: 0.5rem 0;
`;

const FooterButton = styled.button`
  background-color: #323232;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 15%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  &:hover {
    background-color: #4a4a4a;
  }
`;

const MainFooterSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 60px); /* Subtract the footer's height */
  overflow-y: auto;
  padding-bottom: 60px; /* Match the footer's height */
`;

const MotionContent = ({ activePage, children }) => {
  const x = useMotionValue(0);

  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;

  const blurValue = useTransform(x, [-screenWidth, 0, screenWidth], [20, 0, 20]);
  const filter = useTransform(blurValue, (value) => `blur(${value}px)`);

  return (
    <motion.div
      key={activePage}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.2 }}
      style={{
        x,
        filter,
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
  const [activePage, setActivePage] = useState(null);

  const showDrawer = (page) => {
    if (activePage === page && visible) {
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
        content = <FunPage />;
        break;
      case 'health':
        content = <HealthPage />;
        break;
      case 'food':
        content = <FoodPage />;
        break;
      case 'shop':
        content = <ShopPage />;
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
          <FooterButton onClick={() => showDrawer('exchange')} aria-label="Exchange">
            <Exchange />
          </FooterButton>
          <FooterButton onClick={() => showDrawer('fun')} aria-label="Fun">
            Fun
          </FooterButton>
          <FooterButton onClick={() => showDrawer('health')} aria-label="Health">
            Health
          </FooterButton>
          <FooterButton onClick={() => showDrawer('food')} aria-label="Food">
            Food
          </FooterButton>
          <FooterButton onClick={() => showDrawer('shop')} aria-label="Shop">
            Shop
          </FooterButton>
        </MainFooterSection>
      </FooterSection>

      <Drawer
        title={activePage ? activePage.charAt(0).toUpperCase() + activePage.slice(1) : 'Menu'}
        placement="bottom"
        onClose={closeDrawer}
        open={visible}
        getContainer={false}
        height="calc(100vh - 60px)"
        zIndex={1000} /* Установили zIndex меньше, чем у Footer */
        bodyStyle={{
          padding: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        maskStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000, /* Установили zIndex для маски */
        }}
      >
        {renderContent()}
      </Drawer>
    </>
  );
};

export default Footer;
