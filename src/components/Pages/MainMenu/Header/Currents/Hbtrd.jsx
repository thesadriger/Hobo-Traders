import React from 'react';
import { useSelector } from 'react-redux';
import { BarIcon } from '../DataIMGHeader';
import styled from 'styled-components';

const HbtrdContainer = styled.section`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0.25rem;
  width: 80px;

  @media (max-width: 768px) {
    width: 70px;
    padding: 0.2rem;
  }
`;

const ImgHbtrd = styled.img`
  width: 15px;
  height: 15px;
`;
const BalanceHbtrd = styled.span`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 60%;
  font-weight: 700;
  color: #fff;
  margin-left: 5px;
`;

const Hbtrd = () => {
  const hbtrdBalance = useSelector((state) => state.balance.hbtrd);

  return (
    <HbtrdContainer>
      <ImgHbtrd src={BarIcon.hbtrd.image} alt="Hbtrd" />
      <BalanceHbtrd>
        <span>{hbtrdBalance} HBTRD</span>
      </BalanceHbtrd>
    </HbtrdContainer>
  );
};

export default Hbtrd;
