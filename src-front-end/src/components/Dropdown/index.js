import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import useOnClickOutside from '../../utils/useOnClickOutside';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: ${({ triggerHeight }) => triggerHeight};
  min-width: 10rem;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(27, 39, 51, 0.1);
  z-index: 2;

  ${({ position }) =>
    position === 'left' &&
    css`
      left: 0;
    `}

  ${({ position }) =>
    position === 'right' &&
    css`
      right: 0;
    `}
`;

const Trigger = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height};
  cursor: pointer;
`;

function Dropdown({
  trigger,
  triggerClassName,
  menuClassName,
  position,
  triggerHeight,
  children,
  ...rest
}) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useOnClickOutside(ref, () => setVisible(false));

  return (
    <Wrapper ref={ref} {...rest}>
      <Trigger
        className={triggerClassName}
        height={triggerHeight}
        onClick={() => setVisible(!visible)}
      >
        {trigger}
      </Trigger>
      {visible && (
        <DropdownContainer
          className={menuClassName}
          position={position}
          triggerHeight={triggerHeight}
        >
          {children}
        </DropdownContainer>
      )}
    </Wrapper>
  );
}

Dropdown.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  triggerHeight: PropTypes.string,
  triggerClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

Dropdown.defaultProps = {
  position: 'left',
  triggerHeight: '1.5rem',
  triggerClassName: '',
  menuClassName: '',
};

export default Dropdown;
