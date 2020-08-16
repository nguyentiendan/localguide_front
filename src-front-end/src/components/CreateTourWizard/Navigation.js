import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { smallScreenCss } from '../../styles/responsive-css';

const Wrapper = styled.div`
  display: flex;
`;

const LayoutWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const EmptySpaceWrapper = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  padding-top: 5px;

  @media (max-width: 780px) {
    flex: 0.4;
  }

  ${smallScreenCss(`
    display: none;
  `)}
`;

const Navigation = ({
  totalSteps,
  currentStepNumber,
  onBack,
  onNext,
  loading,
  isNextDisabled,
  isFinished,
  onFinish,
}) => {
  const isLastStep = useMemo(() => totalSteps === currentStepNumber, [
    totalSteps,
    currentStepNumber,
  ]);

  return (
    <Wrapper>
      <LayoutWrapper>
        <Button
          onClick={onBack}
          type="link"
          size="large"
          disabled={loading}
          icon={<LeftOutlined />}
        >
          Back
        </Button>
        <div>
          {isLastStep && (
            <Button
              onClick={onNext}
              style={{ marginLeft: 20, marginRight: 20 }}
              type="primary"
              size="large"
              disabled={loading || isNextDisabled}
            >
              Preview
            </Button>
          )}
          {!isFinished && (
            <Button
              onClick={onNext}
              style={{ marginLeft: 20, marginRight: 20 }}
              type="primary"
              size="large"
              disabled={loading || isNextDisabled}
            >
              {isLastStep ? `Skip for now` : `Next`}
            </Button>
          )}
          {isFinished && (
            <Button
              onClick={onFinish}
              style={{ marginLeft: 20, marginRight: 20 }}
              type="primary"
              size="large"
              disabled={loading || isNextDisabled}
            >
              Done
            </Button>
          )}
        </div>
      </LayoutWrapper>
      <EmptySpaceWrapper>{loading && <Spin />}</EmptySpaceWrapper>
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
  isFinished: PropTypes.bool,
  onFinish: PropTypes.func,
};

Navigation.defaultProps = {
  totalSteps: 0,
  currentStepNumber: 0,
  onBack: () => {},
  onNext: () => {},
  loading: false,
  isNextDisabled: false,
  isFinished: false,
  onFinish: () => {},
};

export default Navigation;
