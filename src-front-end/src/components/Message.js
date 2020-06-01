import styled from 'styled-components';

const Message = styled.div`
  font-size: 0.875rem;
  margin-top: 1rem;
  color: ${props => (props.error ? '#ff5a54' : '#59c156')};
`;

export default Message;
