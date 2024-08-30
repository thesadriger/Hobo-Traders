import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BarIcon } from '../DataIMGHeader'
import { styled } from 'styled-components'

const BtcContainer = styled.section`
  display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #646464;
    border-radius: 10px;
    font-size: 12px;
    padding: 0 0.5rem;
    width: 30%;
    apect-ratio: 3 / 1;
    align-content: center;
    flex-direction: row;
`;
const ImgBtc = styled.img`
  width: 1rem;
    height: 1rem;
    background-color: #323232;
    border-radius: 20%;
`;
const BalanceBtc = styled.span`
font-family: 'SF Pro Display', sans-serif;
  font-size: 80%;
  font-weight: 700;
  font-style: normal;
  color: #fff
`;

const Btc = () => {
  return (
    <BtcContainer>
              <ImgBtc src={BarIcon.btc.image} alt="" />
              <BalanceBtc>
                <span>
                  1000$
                </span>
              </BalanceBtc>
    </BtcContainer>
  );
};

export default Btc;
