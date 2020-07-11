import React, { useState, useCallback, useMemo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import StartCreateTour from './StartCreateTour';
import ProgressBar from './ProgressBar';
import Scene from './Scene';
import Navigation from './Navigation';
import StepLayout from './StepLayouts';
import { smallScreenCss } from '../../styles/responsive-css';
import { createTour, updateTour } from '../../apis';
import { useRequiredUser } from '../../utils/useAuth';

const CREATE_TOUR_STEPS = [
  {
    title: 'Basic information',
    layouts: [StepLayout.Step1_1, StepLayout.Step1_2],
    image: '/mocks/places/cao-bang.jpg',
    validation: tour => !tour.tourName,
  },
  {
    title: 'Cost Calculation, (JPY)',
    layouts: [StepLayout.Step2],
  },
  {
    title: 'Tour Advance',
    layouts: [StepLayout.Step3_1, StepLayout.Step3_2],
    image: '/mocks/places/hoi-an.jpg',
  },
  {
    title: 'Add photos of tour',
    layouts: [StepLayout.Step4],
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

const transformTourData = tourCreationInfo => ({
  name: tourCreationInfo.tourName,
  short_desc: tourCreationInfo.tourShortDescription,
  country: tourCreationInfo.country,
  city: tourCreationInfo.city,
  day: tourCreationInfo.duration,
  minpax: tourCreationInfo.minPax,
  maxpax: tourCreationInfo.maxPax,
  guidefee: tourCreationInfo.guideFee,
  total: 0,
  content: tourCreationInfo.tourDescription,
  cover: '',
  tag: tourCreationInfo.tags.join(','),
});

const Wrapper = styled.div`
  width: 100%;
  padding-top: 2rem;

  ${smallScreenCss(`
    padding-top: 1rem;
  `)}
`;

const CreateTourWizard = () => {
  const { user } = useRequiredUser();
  const [loading, setLoading] = useState(false);
  const [tourCreationInfo, setTourCreationInfo] = useState({
    duration: 1,
    minPax: 1,
    maxPax: 1,
    tags: [],
  });
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const startCreateTour = useCallback(() => {
    setCurrentStepNumber(1);
  }, []);

  const saveOrUpdateTour = async () => {
    if (!tourCreationInfo || !tourCreationInfo.tourName) {
      return;
    }

    const isNew = !tourCreationInfo.id || !tourCreationInfo.uid;
    setLoading(true);
    try {
      if (isNew) {
        await createTour(transformTourData(tourCreationInfo));
      } else {
        await updateTour(transformTourData(tourCreationInfo));
      }
    } catch (ignore) {
      setLoading(false);
      // throw new Error();
    }
    setLoading(false);
  };

  const goBack = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      await saveOrUpdateTour();
      if (currentStepNumber !== 0) {
        setCurrentStepNumber(currentStepNumber - 1);
      }
    } catch (e) {
      // ignore
    }
  }, [currentStepNumber, loading, tourCreationInfo]);

  const goForward = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      await saveOrUpdateTour();
      if (currentStepNumber < TOTAL_STEPS) {
        setCurrentStepNumber(currentStepNumber + 1);
      }
    } catch (e) {
      // ignore
    }
  }, [currentStepNumber, loading, tourCreationInfo]);

  const onUpdate = useCallback(
    newTourCreationInfo => {
      const tour = { ...newTourCreationInfo };
      if (tour.maxPax < tour.minPax) {
        tour.maxPax = undefined;
      }
      if (tour.tourDayFees) {
        _.forEach(tour.tourDayFees, dayFee => {
          _.forEach([...dayFee.transportations, ...dayFee.meals, ...dayFee.others], t => {
            if (t) {
              if (t.quantity < tour.minPax || t.quantity > tour.maxPax) {
                // eslint-disable-next-line no-param-reassign
                t.quantity = undefined;
              }
              if (t.unit < 0) {
                // eslint-disable-next-line no-param-reassign
                t.unit = 0;
              }
            }
          });
        });
      }
      if (tour.guideFee && tour.guideFee < 0) {
        tour.guideFee = 0;
      }
      setTourCreationInfo(tour);
    },
    [tourCreationInfo]
  );

  const isNextDisabled = useMemo(() => {
    if (currentStepNumber === 0) {
      return false;
    }
    const { validation } = CREATE_TOUR_STEPS[MAIN_STEPS_MAP[currentStepNumber] - 1];
    if (validation) {
      return validation(tourCreationInfo);
    }
    return false;
  }, [tourCreationInfo, currentStepNumber]);

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
            user={user}
            tourCreationInfo={tourCreationInfo}
            layout={STEP_LAYOUTS[currentStepNumber]}
            onUpdate={onUpdate}
            imgSrc={CREATE_TOUR_STEPS[MAIN_STEPS_MAP[currentStepNumber] - 1].image}
          />
          <br />
          <Navigation
            isNextDisabled={isNextDisabled}
            currentStepNumber={currentStepNumber}
            totalSteps={TOTAL_STEPS}
            onBack={goBack}
            onNext={goForward}
            loading={loading}
          />
        </Wrapper>
      )}
    </>
  );
};

export default CreateTourWizard;
