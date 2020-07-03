import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';

const Wrapper = styled.div``;

// eslint-disable-next-line no-unused-vars
const Navigation = ({ totalSteps, currentStepNumber, onBack, onNext }) => {
  return (
    <Wrapper>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onNext} style={{ marginLeft: 20 }}>
        Next
      </Button>
    </Wrapper>
  );
};

Navigation.propTypes = {
  totalSteps: PropTypes.number,
  currentStepNumber: PropTypes.number,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};

Navigation.defaultProps = {
  totalSteps: 0,
  currentStepNumber: 0,
  onBack: () => {},
  onNext: () => {},
};

export default Navigation;
