import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { styled } from 'styled-components'
import { Tabs as AntdTabs } from 'antd';
import { HomeOutlined, ReadOutlined, CarOutlined} from '@ant-design/icons';
import { Swiper} from 'antd-mobile'
// import { SwiperRef } from 'antd-mobile/es/components/swiper'

import AppartamentsPage from './Pages/AppartamentsPage.jsx'
import EducationPage from './Pages/EducationPage.jsx';
import CarsPage from './Pages/CarsPage.jsx';

const MainSection = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #323232;
  flex-direction: column;
  width: 100%;
`;

const MainBodySection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90%;
  width: 100%;
  padding: 0.5rem;
  align-content: flex-end;
  flex-wrap: wrap;
`;
const SwiperCard = styled.button`
  height: 100%;
  width: 100%;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    user-select: none;
`;
const TabIconWrapper = styled.div`
  font-size: 24px; /* Adjust size to fit the tab item */
  display: flex;
  justify-content: center;
  align-items: center;
`;



const tabItems = [
  { key: '1', title: 'apartaments', icon: <HomeOutlined />  },
  { key: '2', title: 'education', icon: <ReadOutlined /> },
  { key: '3', title: 'cars', icon: <CarOutlined /> },
];

const Main = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <MainSection>
      <MainBodySection>
      <AntdTabs
          activeKey={tabItems[activeIndex].key}
          onChange={key => {
            const index = tabItems.findIndex(item => item.key === key);
            setActiveIndex(index);
            swiperRef.current?.swipeTo(index);
          }}
          items={tabItems.map(item => ({
            key: item.key,
            label: <TabIconWrapper>{item.icon}</TabIconWrapper>,
          }))}
        />
        <Swiper
          direction='horizontal'
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={activeIndex}
          onIndexChange={index => {
            setActiveIndex(index);
          }}
        >
          <Swiper.Item>
            <SwiperCard>
              <AppartamentsPage/>
            </SwiperCard>
          </Swiper.Item>
          <Swiper.Item>
            <SwiperCard>
              <EducationPage/>
            </SwiperCard>
          </Swiper.Item>
          <Swiper.Item>
            <SwiperCard>
              <CarsPage/>
            </SwiperCard>
          </Swiper.Item>
        </Swiper>
        
      </MainBodySection>
    </MainSection>
  );
};

export default Main;



// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { styled } from 'styled-components'

// import AppartamentsBtn from './Btn/AppartamentsBtn.jsx'
// import EducationBtn from './Btn/EducationBtn.jsx'
// import CarsBtn from './Btn/CarsBtn.jsx'
// import Background from './Background.jsx'

// const MainSection = styled.main`
//  display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #323232;
//     flex-direction: column;
//     width: 100%;
// `;
// const MainBodySection = styled.section`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     height: 50%;
//     width: 100%;
//     padding: 0.5rem;
//     align-content: flex-end;
//     flex-wrap: wrap;
// }
// `;



// const Main = () => {


//   return (
    
//     <MainSection>
//       <MainBodySection>
//         <AppartamentsBtn/>
//         <EducationBtn/>
//         <CarsBtn/>
//         <Background/>
//       </MainBodySection>
//     </MainSection>
//   );
// }

// export default Main;

