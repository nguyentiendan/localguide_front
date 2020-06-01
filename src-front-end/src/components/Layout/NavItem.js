import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import colors from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  * {
    ${props =>
      props.isActive &&
      `
    color: ${colors.magenta[50]};
    `}

    ${props =>
      !props.isActive &&
      `
      color: ${colors.grey[50]} !important;
    `}
  }
`;

const Title = styled.div`
  font-size: 0.625rem;
`;

const NavItem = ({ icon, link, title, isActive, className }) => (
  <>
    <Link to={link} className={className}>
      <Wrapper isActive={isActive}>
        {icon}
        <Title>{title}</Title>
      </Wrapper>
    </Link>
  </>
);

NavItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
  link: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

NavItem.defaultProps = {
  className: '',
  isActive: false,
};

export default NavItem;
