import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { styled } from 'styled-components'

import AppartamentsBtn from './Btn/AppartamentsBtn.jsx'
import EducationBtn from './Btn/EducationBtn.jsx'
import CarsBtn from './Btn/CarsBtn.jsx'
import Background from './Background.jsx'

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
}
`;



const Main = () => {


  return (
    
    <MainSection>
      <MainBodySection>
        <AppartamentsBtn/>
        <EducationBtn/>
        <CarsBtn/>
        <Background/>
      </MainBodySection>
    </MainSection>
  );
}

export default Main;
