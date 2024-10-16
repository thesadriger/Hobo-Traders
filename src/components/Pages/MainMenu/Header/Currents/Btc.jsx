import React from 'react';
import { useSelector } from 'react-redux';
import { BarIcon } from '../DataIMGHeader';
import styled from 'styled-components';

const BtcContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.sizes.borderRadiusLarge};
  padding: 0.25rem;
  width: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 70px;
    padding: 0.2rem;
  }
`;

const ImgBtc = styled.img`
  width: ${({ theme }) => theme.sizes.iconSizeSmall};
  height: ${({ theme }) => theme.sizes.iconSizeSmall};
`;

const BalanceBtc = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fonts.sizes.smaller};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
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
