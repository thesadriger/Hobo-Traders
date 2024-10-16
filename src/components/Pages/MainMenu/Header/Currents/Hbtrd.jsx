import React from 'react';
import { useSelector } from 'react-redux';
import { BarIcon } from '../DataIMGHeader';
import styled from 'styled-components';

const HbtrdContainer = styled.section`
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

const ImgHbtrd = styled.img`
  width: ${({ theme }) => theme.sizes.iconSizeSmall};
  height: ${({ theme }) => theme.sizes.iconSizeSmall};
`;

const BalanceHbtrd = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fonts.sizes.tiny};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 5px;
`;

const Hbtrd = () => {
  const hbtrdBalance = useSelector((state) => state.balance.hbtrd);

  return (
    <HbtrdContainer>
      <ImgHbtrd src={BarIcon.hbtrd.image} alt="Hbtrd" />
      <BalanceHbtrd>{hbtrdBalance} HBTRD</BalanceHbtrd>
    </HbtrdContainer>
  );
};

export default Hbtrd;
