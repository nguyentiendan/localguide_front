import styled, { keyframes } from 'styled-components';

function getBorderWidth(size) {
  return size ? `calc(${size} * ${2 / 24})` : '2px';
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  content: '';
  box-sizing: border-box;
  width: ${({ size }) => size || '1.5em'};
  height: ${({ size }) => size || '1.5em'};
  border-top: ${({ size }) => getBorderWidth(size)} solid ${({ color }) => color || '#dfe1e6'};
  border-right: ${({ size }) => getBorderWidth(size)} solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export default Spinner;
