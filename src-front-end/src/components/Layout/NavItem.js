import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledLink = styled(Link)`
  color: ${colors.grey[50]};

  &.is-active {
    color: ${colors.magenta[50]};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const Title = styled.div`
  font-size: 0.625rem;
`;

const NavItem = ({ icon, link, title, className }) => (
  <StyledLink to={link} className={className} activeClassName="is-active">
    <Wrapper>
      {icon}
      <Title>{title}</Title>
    </Wrapper>
  </StyledLink>
);

NavItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
  link: PropTypes.node,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  className: '',
  link: '',
};

export default NavItem;
