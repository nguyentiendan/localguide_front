import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HiddenCheckbox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  overflow: hidden;
  white-space: nowrap;
`;

const CheckIcon = styled.svg`
  fill: ${props => (props.squared ? '#10abe2' : 'none')};
  stroke: #10abe2;
  stroke-width: 2px;
  visibility: hidden;
`;

const StyledCheckbox = styled.div`
  display: inline-grid;
  width: ${props => props.size};
  height: ${props => props.size};
  background: #ffffff;
  border: solid 1px #dadada;
  border-radius: 2px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 1px 1px #10abe2;
  }

  ${HiddenCheckbox}:checked + & {
    border-color: #10abe2;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${HiddenCheckbox}:checked + ${StyledCheckbox} {
    ${CheckIcon} {
      visibility: visible;
    }
  }
`;

const Label = styled.div`
  color: ${props => (props.disabled ? '#9b9b9b' : 'inherit')};
  margin-left: 1rem;
`;

function Checkbox({ className, size, label, squared, disabled, ...props }) {
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox disabled={disabled} type="checkbox" {...props} />
      <StyledCheckbox size={size}>
        <CheckIcon viewBox="0 0 22 22" squared={squared}>
          {squared ? (
            <polyline points="6 6 6 16 16 16 16 6 6 6" />
          ) : (
            <polyline points="18 6 9 17 4 13" />
          )}
        </CheckIcon>
      </StyledCheckbox>
      {label && <Label disabled={disabled}>{label}</Label>}
    </CheckboxContainer>
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.node,
  squared: PropTypes.bool,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  className: '',
  size: '22px',
  label: null,
  squared: false,
  disabled: false,
};

export default Checkbox;
