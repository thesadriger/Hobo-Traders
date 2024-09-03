import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { styled } from 'styled-components'
import { Tabs, Swiper } from 'antd-mobile'
// import { SwiperRef } from 'antd-mobile/es/components/swiper'

import AppartamentsBtn from './Btn/AppartamentsBtn.jsx'
import EducationBtn from './Btn/EducationBtn.jsx'
import CarsBtn from './Btn/CarsBtn.jsx'

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
  height: 50%;
  width: 100%;
  padding: 0.5rem;
  align-content: flex-end;
  flex-wrap: wrap;
`;
const SwiperCard = styled.button`
  height: 120px;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    user-select: none;
`;



const tabItems = [
  { key: 'fruits', title: 'fruits' },
  { key: 'vegetables', title: 'vegetables' },
  { key: 'animals', title: 'animals' },
];

const Main = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <MainSection>
      <MainBodySection>
        <Tabs
          activeKey={tabItems[activeIndex].key}
          onChange={key => {
            const index = tabItems.findIndex(item => item.key === key);
            setActiveIndex(index);
            swiperRef.current?.swipeTo(index);
          }}
        >
          {tabItems.map(item => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
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
              <AppartamentsBtn/>
            </SwiperCard>
          </Swiper.Item>
          <Swiper.Item>
            <SwiperCard>
              <EducationBtn/>
            </SwiperCard>
          </Swiper.Item>
          <Swiper.Item>
            <SwiperCard>
              <CarsBtn/>
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

