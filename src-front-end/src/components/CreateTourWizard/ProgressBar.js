import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Steps } from 'antd';

const Wrapper = styled.div``;
const Header = styled.h1`
  margin-bottom: 2rem;
`;

const ProgressBar = ({ steps, currentStepNumber }) => {
  return (
    <Wrapper>
      <Steps current={currentStepNumber - 1}>
        {_.map(steps, step => (
          <Steps.Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <br />
      <br />
      <Header>{`${steps[currentStepNumber - 1].title}`}</Header>
    </Wrapper>
  );
};

ProgressBar.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ),
  currentStepNumber: PropTypes.number,
};

ProgressBar.defaultProps = {
  steps: [],
  currentStepNumber: 0,
};

export default ProgressBar;
