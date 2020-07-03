import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import colors from '../../styles/colors';
import Spinner from '../Spinner';

const BEFORE_ICON_PADDING = 16;
const AFTER_ICON_PADDING = 16;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

const Label = styled.label.attrs({ className: 'label' })`
  line-height: 21px;
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  color: #2e2e2e;
  padding: 6px 0;
  text-align: left;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const TextInput = styled.input.attrs(props =>
  props.type === 'textarea' ? { as: 'textarea' } : {}
)`
  width: ${props => (props.width ? props.width : '100%')};
  height: 3rem;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid ${props => (props.hasError ? '#ff5a54' : '#dfe1e6')};
  font: inherit;
  font-size: 1rem;
  padding: 1rem;
  padding-left: ${props => (props.beforeIcon ? `${BEFORE_ICON_PADDING + 25}px` : '16px')};
  padding-right: ${props => (props.afterIcon ? `${AFTER_ICON_PADDING + 25}px` : '16px')};
  cursor: text;

  ::placeholder {
    color: #999999;
  }

  &:disabled {
    background-color: #e6e6e6;
  }

  &:focus {
    outline-color: ${colors.magenta[50]} !important;
  }

  ${props =>
    props.type === 'number' &&
    css`
      ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
      }
    `}

  ${props =>
    props.type === 'textarea' &&
    css`
      height: ${({ height }) => height || '250px'};
      width: ${({ width }) => width || '100%'};
      max-width: ${({ width }) => width || '100%'};
      background-color: #ffffff;
      border-radius: 4px;
      border: 1px solid #dfe1e6;
      font: inherit;
      font-size: 1rem;
      padding: 1rem;
      cursor: text;
      resize: none;

      ::placeholder {
        color: #999999;
      }

      &:disabled {
        background-color: #e6e6e6;
        opacity: 0.3;
      }
    `}
`;

const BeforeIcon = styled.div`
  display: flex;
  position: absolute;
  left: ${BEFORE_ICON_PADDING}px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #999999;
`;

const AfterIcon = styled(BeforeIcon)`
  left: auto;
  right: ${AFTER_ICON_PADDING}px;
`;

const LoadingIcon = styled(Spinner).attrs({ color: '#10abe2' })`
  width: 1.125em;
  height: 1.125em;
`;

const Message = styled.div`
  font-size: 0.875rem;
  margin-top: 0.375rem;
  color: ${props => (props.hasError ? '#ff5a54' : '#59c156')};
`;

const Input = ({
  className,
  label,
  message,
  beforeIcon,
  afterIcon,
  hasError,
  loading,
  ...rest
}) => (
  <Wrapper className={className}>
    {label && <Label>{label}</Label>}

    <InputWrapper>
      {beforeIcon && <BeforeIcon>{beforeIcon}</BeforeIcon>}
      <TextInput beforeIcon={beforeIcon} afterIcon={afterIcon} hasError={hasError} {...rest} />
      {(afterIcon || loading) && <AfterIcon>{loading ? <LoadingIcon /> : afterIcon}</AfterIcon>}
    </InputWrapper>

    {message && <Message hasError={hasError}>{message}</Message>}
  </Wrapper>
);

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  message: PropTypes.string,
  beforeIcon: PropTypes.node,
  afterIcon: PropTypes.node,
  hasError: PropTypes.bool,
  loading: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  label: '',
  message: '',
  beforeIcon: null,
  afterIcon: null,
  hasError: false,
  loading: false,
};

export default Input;
