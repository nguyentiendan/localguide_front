import React, { useState, useCallback, useMemo, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Modal } from 'antd';
import StartCreateTour from './StartCreateTour';
import ProgressBar from './ProgressBar';
import Scene from './Scene';
import Navigation from './Navigation';
import StepLayout from './StepLayouts';
import { smallScreenCss } from '../../assets/styles/responsive-css';
import {
  createTour,
  updateTour,
  getTourEditGuide,
  getAllCostTourEdit,
  getAllScheduleTourEdit,
  getTourPhotos,
} from '../../apis';
import { useRequiredUser } from '../../utils/useAuth';
import TourPreview from '../TourPreview';
import img from "../../assets/img/mocks/places/cat-ba.jpg"
import { AiOutlineSync } from 'react-icons/ai';

const CREATE_TOUR_STEPS = [
  {
    title: 'Basic information',
    layouts: [StepLayout.Step1_1, StepLayout.Step1_2],    
    image: img,
    validation: tour => !tour.tourName,
  },
  {
    title: 'Cost Calculation, (JPY)',
    layouts: [StepLayout.Step2],
  },
  {
    title: 'Tour Advance',
    layouts: [StepLayout.Step3_1, StepLayout.Step3_2],
    //image: '/mocks/places/hoi-an.jpg',
  },
  {
    title: 'Add photos of tour',
    layouts: [StepLayout.Step4],
    validation: tour => !tour.id,
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
  id: tourCreationInfo.id,
  name: tourCreationInfo.tourName,
  shortDesc: tourCreationInfo.tourShortDescription,
  recommend: tourCreationInfo.tourRecommend,
  country: tourCreationInfo.country,
  city: tourCreationInfo.city,
  day: tourCreationInfo.duration,
  minPax: tourCreationInfo.minPax,
  maxPax: tourCreationInfo.maxPax,
  guideFee: tourCreationInfo.guideFee,
  total: tourCreationInfo.total,
  content: tourCreationInfo.tourDescription,
  cover: '',
  tag: tourCreationInfo.tags.join(';'),
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2rem;
  min-height: 90vh;

  ${smallScreenCss(`tag
    padding-top: 1rem;
  `)}
`;

const CreateTourWizard = ({ location }) => {
  const { user } = useRequiredUser();
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [tourCreationInfo, setTourCreationInfo] = useState({
    duration: 1,
    minPax: 1,
    maxPax: 1,
    tags: [],
    total: 0,
  });
  const tourId = qs.parse(location?.search);
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
    const editTourCreationInfo = {
      ...tourCreationInfo,
      tags:
        typeof tourCreationInfo.tags === 'string'
          ? tourCreationInfo.tags.split(';')
          : tourCreationInfo.tags,
    };
    try {
      if (isNew) {
        const { data } = await createTour(transformTourData(tourCreationInfo));
        setTourCreationInfo({
          id: data.ID,
          uid: data.UID,
          ...tourCreationInfo,
        });
      } else {
        await updateTour(transformTourData(editTourCreationInfo));
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
  
  const goCancel = useCallback(async () => {
    if (loading) {
      return;
    }
    await navigate('app/my_tours');
  }, [loading]);

  const goForward = async () => {
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
  };

  const navigateToHomePage = useCallback(async () => {
    if (loading) {
      return;
    }
    await navigate('/');
  }, [loading]);

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
                t.quantity = undefined; // eslint-disable-line no-param-reassign
              }
              if (t.unit < 0) {
                t.unit = 0; // eslint-disable-line no-param-reassign
              } else if (!t.unit) {
                t.unit = undefined; // eslint-disable-line no-param-reassign
              }
            }
          });
        });
      }
      if (tour.guideFee && tour.guideFee < 0) {
        tour.guideFee = 0;
      }
      setTourCreationInfo({
        ...tourCreationInfo,
        ...tour,
      });
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

  const canSkipped = useMemo(() => {
    return (
      !tourCreationInfo.coverPhoto || !tourCreationInfo.photos || tourCreationInfo.photos.length < 1
    );
  }, [tourCreationInfo]);

  const onPreview = useCallback(() => {
    setPreviewVisible(true);
  }, [tourCreationInfo]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getTourEditGuide({ uid: user.uid, id: tourId.q });
        const res = await getAllCostTourEdit({ uid: user.uid, id: tourId.q });
        const resSchedule = await getAllScheduleTourEdit({ uid: user.uid, id: tourId.q });
        const resPhotos = await getTourPhotos({ uid: user.uid, id: tourId.q });
        setTourCreationInfo({
          ...tourCreationInfo,
          uid: data[0].uid,
          id: data[0].id,
          tourName: data[0].name,
          tourShortDescription: data[0].shortDesc,
          tourRecommend:data[0].recommend,
          tags: data[0].tag ? data[0].tag.split(';') : [],
          country: data[0].country,
          city: data[0].city,
          tourDescription: data[0].content,
          duration: data[0].day,
          minPax: data[0].minPax,
          maxPax: data[0].maxPax,
          guideFee: data[0].guideFee,
          coverPhoto: { name: data[0].cover },
          total: data[0].total,
          meal: res.meal,
          other: res.other,
          transport: res.transport,
          pickup: resSchedule.pickup,
          schedule: resSchedule.schedule,
          photos: resPhotos.data,
        });
      } catch (e) {
        // ignore
      }
      setLoading(false);
    };
    if (tourId.q) {
      fetchData();
    }
  }, [
    getTourEditGuide,
    setTourCreationInfo,
    setLoading,
    getAllCostTourEdit,
    getAllScheduleTourEdit,
  ]);

  return (
    <>
      {currentStepNumber === 0 && <StartCreateTour onStart={startCreateTour} location={location} />}
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
          <br />
          <br />
          <Navigation
            isNextDisabled={isNextDisabled}
            currentStepNumber={MAIN_STEPS_MAP[currentStepNumber]}
            totalSteps={CREATE_TOUR_STEPS.length}
            onBack={goBack}
            onNext={goForward}
            onCancel={goCancel}
            onPreview={onPreview}
            loading={loading}
            isFinished={currentStepNumber === TOTAL_STEPS}
            canSkipped={canSkipped}
            onFinish={navigateToHomePage}
          />

          <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
            {previewVisible && (
              <TourPreview uid={tourCreationInfo.uid} tourId={tourCreationInfo.id} />
            )}
          </Modal>
        </Wrapper>
      )}
    </>
  );
};

CreateTourWizard.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }),
};
CreateTourWizard.defaultProps = {
  location: {},
};

export default CreateTourWizard;
