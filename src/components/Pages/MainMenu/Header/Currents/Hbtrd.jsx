import React from 'react';
import { useSelector } from 'react-redux';
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

const BalanceHbtrd = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fonts.sizes.tiny};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 5px;
`;

const Hbtrd = () => {
  const hbtrdBalance = useSelector((state) => state.balance.hbtrd);
  const customColors = useSelector((state) => state.customColors);

  return (
    <HbtrdContainer style={{ background: customColors['header_hbtrd_background'] || undefined }}>
      <BalanceHbtrd style={{ color: customColors['header_hbtrd_text'] || undefined }}>{hbtrdBalance} HBTRD</BalanceHbtrd>
    </HbtrdContainer>
  );
};

export default Hbtrd;
