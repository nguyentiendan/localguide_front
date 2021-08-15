import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Popconfirm } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-grow: 2;
`;

const LayoutWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const Navigation = ({
  totalSteps,
  currentStepNumber,
  onBack,
  onFirst,
  onNext,
  onCancel,
  onConfirm,
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
        {currentStepNumber === 4 ? (
          <Button
            onClick={onFirst}
            type="link"
            size="large"
            disabled={loading}
            icon={<LeftOutlined />}
          >
            Back to first
          </Button>
        ) : (
          <Button
            onClick={onBack}
            type="link"
            size="large"
            disabled={loading}
            icon={<LeftOutlined />}
          >
            Back
          </Button>
        )}
        <div>
          {!isFinished && (
            <>
              <Popconfirm
                title="Create tour is not complete. Are you sure?"
                onConfirm={onConfirm}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  // onClick={onCancel}
                  style={{ marginLeft: 20, marginRight: 20, width: 100 }}
                  type="primary"
                  size="large"
                  loading={loading}
                >
                  Cancel
                </Button>
              </Popconfirm>

              <Button
                onClick={onNext}
                style={{ marginLeft: 20, marginRight: 20, width: 100 }}
                type="primary"
                size="large"
                disabled={loading || isNextDisabled}
                loading={loading}
              >
                Next
              </Button>
            </>
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
    </Wrapper>
  );
};

Navigation.propTypes = {
  totalSteps: PropTypes.number,
  currentStepNumber: PropTypes.number,
  onBack: PropTypes.func,
  onFirst: PropTypes.func,
  onNext: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
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
  onFirst: () => {},
  onNext: () => {},
  onCancel: () => {},
  onConfirm: () => {},
  onPreview: () => {},
  loading: false,
  isNextDisabled: false,
  isFinished: false,
  canSkipped: false,
  onFinish: () => {},
};

export default Navigation;
