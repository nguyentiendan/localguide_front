import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import Spinner from '../Spinner';
import colors from '../../styles/colors';

const fontSize = {
  small: '1rem',
  default: '1.25rem',
  large: `${24 / 16}rem`,
};

const iconSize = {
  small: `${24 / 16}rem`,
  default: `${24 / 16}rem`,
  large: `${28 / 16}rem`,
};

const height = {
  small: '32px',
  default: '40px',
  large: '60px',
};

const padding = {
  small: '5px 10px',
  default: '5px 20px',
  large: '10px 30px',
};

const IconWrapper = styled.div`
  display: inline-block;
  margin-right: 1rem;
  font-size: ${props => iconSize[props.size]};
  line-height: 0;
`;

const LoadingIcon = styled(Spinner)`
  border-color: inherit;
  width: ${props => iconSize[props.buttonSize]};
  height: ${props => iconSize[props.buttonSize]};
`;

const Wrapper = styled.button`
  display: inline-flex;
  align-items: center;
  height: ${props => height[props.size]};
  padding: ${props => padding[props.size]};
  font-size: ${props => fontSize[props.size]};
  font-weight: normal;
  color: #ffffff;
  background: ${props => props.backgroundColor};
  ${props => (props.shadow ? 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1)' : '')}
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${props => darken(0.04, props.backgroundColor)};
  }

  ${props =>
    props.disabled &&
    css`
      color: #78757a;
      background: #d9d7e0;
      pointer-events: none;
    `}
`;

function Button({ size, icon, loading, children, ...rest }) {
  return (
    <Wrapper size={size} {...rest}>
      {(icon || loading) && (
        <IconWrapper>{loading ? <LoadingIcon buttonSize={size} /> : icon}</IconWrapper>
      )}
      {children}
    </Wrapper>
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'default', 'large']),
  backgroundColor: PropTypes.string,
  icon: PropTypes.node,
  shadow: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  size: 'default',
  backgroundColor: colors.magenta[50],
  icon: null,
  shadow: false,
  loading: false,
  children: null,
};

export default Button;
