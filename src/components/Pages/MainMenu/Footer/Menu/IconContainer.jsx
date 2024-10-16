// IconContainer.jsx
import styled from 'styled-components';

const IconContainer = styled.section`
  width: ${({ theme }) => theme.sizes.iconContainerWidth};
  height: ${({ theme }) => theme.sizes.iconContainerHeight};
  background-color: ${({ theme }) => theme.colors.containerBackground};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default IconContainer;
