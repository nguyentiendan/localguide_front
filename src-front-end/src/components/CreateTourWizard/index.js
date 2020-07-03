import React, { useState, useCallback } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import StartCreateTour from './StartCreateTour';
import ProgressBar from './ProgressBar';
import Scene from './Scene';
import Navigation from './Navigation';
import StepLayout from './StepLayouts';
import { smallScreenCss } from '../../styles/responsive-css';

const CREATE_TOUR_STEPS = [
  {
    title: 'Basic information',
    layouts: [StepLayout.Step1_1, StepLayout.Step1_2],
    image: '/mocks/places/cao-bang.jpg',
  },
  {
    title: 'Cost Calculation, (JPY)',
    layouts: [StepLayout.Step2],
    image: '/mocks/places/ha-long.jpg',
  },
  {
    title: 'Tour Advance',
    layouts: [StepLayout.Step3_1, StepLayout.Step3_2],
    image: '/mocks/places/hoi-an.jpg',
  },
  {
    title: 'Add photos of tour',
    layouts: [StepLayout.Step4],
    image: '/mocks/places/cat-ba.jpg',
  },
];

const MAIN_STEPS_MAP = (() => {
  const map = {};
  let stepIndex = 0;
  _.forEach(CREATE_TOUR_STEPS, (step, i) => {
    _.forEach(step.layouts, () => {
      map[++stepIndex] = i + 1;
    });
  });

  return map;
})();

const STEP_LAYOUTS = (() => {
  const map = {};
  let stepIndex = 0;
  _.forEach(CREATE_TOUR_STEPS, step => {
    _.forEach(step.layouts, layout => {
      map[++stepIndex] = layout;
    });
  });

  return map;
})();

const TOTAL_STEPS = _.sumBy(CREATE_TOUR_STEPS, step => step.layouts.length);

const Wrapper = styled.div`
  width: 100%;
  padding-top: 2rem;

  ${smallScreenCss(`
    padding-top: 1rem;
  `)}
`;

const CreateTourWizard = () => {
  const [tourCreationInfo, setTourCreationInfo] = useState({});
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const startCreateTour = useCallback(() => {
    setCurrentStepNumber(1);
  }, []);

  const goBack = useCallback(() => {
    if (currentStepNumber !== 0) {
      setCurrentStepNumber(currentStepNumber - 1);
    }
  }, [currentStepNumber]);

  const goForward = useCallback(() => {
    if (currentStepNumber < TOTAL_STEPS) {
      setCurrentStepNumber(currentStepNumber + 1);
    }
  }, [currentStepNumber]);

  const onUpdate = useCallback(
    newTourCreationInfo => {
      setTourCreationInfo(newTourCreationInfo);
    },
    [tourCreationInfo]
  );

  return (
    <>
      {currentStepNumber === 0 && <StartCreateTour onStart={startCreateTour} />}
      {currentStepNumber !== 0 && (
        <Wrapper>
          <ProgressBar
            currentStepNumber={MAIN_STEPS_MAP[currentStepNumber]}
            steps={CREATE_TOUR_STEPS}
          />
          <Scene
            tourCreationInfo={tourCreationInfo}
            layout={STEP_LAYOUTS[currentStepNumber]}
            onUpdate={onUpdate}
            imgSrc={CREATE_TOUR_STEPS[MAIN_STEPS_MAP[currentStepNumber] - 1].image}
          />
          <br />
          <Navigation
            currentStepNumber={currentStepNumber}
            totalSteps={TOTAL_STEPS}
            onBack={goBack}
            onNext={goForward}
          />
        </Wrapper>
      )}
    </>
  );
};

export default CreateTourWizard;
