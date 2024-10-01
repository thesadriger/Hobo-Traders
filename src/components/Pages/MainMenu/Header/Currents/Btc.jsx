import React from 'react';
import { useSelector } from 'react-redux';
import { BarIcon } from '../DataIMGHeader';
import styled from 'styled-components';

const BtcContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #646464;
  border-radius: 10px;
  padding: 0.25rem;
  width: 80px;

  @media (max-width: 768px) {
    width: 70px;
    padding: 0.2rem;
  }
`;

const ImgBtc = styled.img`
  width: 15px;
  height: 15px;
`;

const BalanceBtc = styled.span`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 70%;
  font-weight: 700;
  color: #fff;
  margin-left: 5px;
`;

const Btc = () => {
  const btcBalance = useSelector((state) => state.balance.btc);

  return (
    <BtcContainer>
      <ImgBtc src={BarIcon.btc.image} alt="BTC" />
      <BalanceBtc>{btcBalance} BTC</BalanceBtc>
    </BtcContainer>
  );
};

export default Btc;
