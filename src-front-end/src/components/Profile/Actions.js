import styled from 'styled-components';

import breakpoints from '../../styles/breakpoints';

const Actions = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0 0 0;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }
`;

export default Actions;
