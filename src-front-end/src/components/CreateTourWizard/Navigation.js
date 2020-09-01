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
  onPreview,
  loading,
  isNextDisabled,
  isFinished,
  canSkipped,
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
              onClick={onPreview}
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
              Next
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
              {canSkipped ? `Skip for now` : `Done`}
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
  onPreview: PropTypes.func,
  loading: PropTypes.bool,
  isNextDisabled: PropTypes.bool,
  isFinished: PropTypes.bool,
  canSkipped: PropTypes.bool,
  onFinish: PropTypes.func,
};

Navigation.defaultProps = {
  totalSteps: 0,
  currentStepNumber: 0,
  onBack: () => {},
  onNext: () => {},
  onPreview: () => {},
  loading: false,
  isNextDisabled: false,
  isFinished: false,
  canSkipped: false,
  onFinish: () => {},
};

export default Navigation;
