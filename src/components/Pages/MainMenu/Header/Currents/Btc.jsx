import React from 'react';
import { useSelector } from 'react-redux';
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

const BalanceBtc = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fonts.sizes.smaller};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 5px;
`;

const Btc = () => {
  const btcBalance = useSelector((state) => state.balance.btc);
  const customColors = useSelector((state) => state.customColors);

  return (
    <BtcContainer style={{ background: customColors['header_btc_background'] || undefined }}>
      <BalanceBtc style={{ color: customColors['header_btc_text'] || undefined }}>{btcBalance} BTC</BalanceBtc>
    </BtcContainer>
  );
};

export default Btc;
