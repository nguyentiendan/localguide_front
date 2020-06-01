import styled, { css } from 'styled-components';

const Menu = styled.ul`
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  list-style: none;
`;

export const Item = styled.li`
  display: list-item;
  margin: 0;
  padding: 10px 15px;
  color: #2e2e2e;
  cursor: pointer;

  a {
    color: inherit;
    text-decoration: none;
  }

  ${props =>
    props.danger &&
    css`
      color: #d22222;
    `}

  &:hover {
    background: #f6f6f6;
  }
`;

Menu.Item = Item;

export default Menu;
