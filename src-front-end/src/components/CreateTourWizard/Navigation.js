import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Spin } from 'antd';

const Wrapper = styled.div``;

// eslint-disable-next-line no-unused-vars
const Navigation = ({ totalSteps, currentStepNumber, onBack, onNext, loading, isNextDisabled }) => {
  return (
    <Wrapper>
      <Button onClick={onBack} type="primary" size="large" disabled={loading}>
        Back
      </Button>
      <Button
        onClick={onNext}
        style={{ marginLeft: 20, marginRight: 20 }}
        type="primary"
        size="large"
        disabled={loading || isNextDisabled}
      >
        Next
      </Button>
      {loading && <Spin />}
    </Wrapper>
  );
};

Navigation.propTypes = {
  totalSteps: PropTypes.number,
  currentStepNumber: PropTypes.number,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  loading: PropTypes.bool,
  isNextDisabled: PropTypes.bool,
};

Navigation.defaultProps = {
  totalSteps: 0,
  currentStepNumber: 0,
  onBack: () => {},
  onNext: () => {},
  loading: false,
  isNextDisabled: false,
};

export default Navigation;
