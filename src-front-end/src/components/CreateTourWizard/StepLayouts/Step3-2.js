/* eslint-disable camelcase */
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import map from "lodash/fp/map";
import flatten from "lodash/fp/flatten";
import sortBy from "lodash/fp/sortBy";
import flow from "lodash/fp/flow";
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Input, Row, Spin, Tabs, TimePicker } from 'antd';
import moment from 'moment';

import { createTourSchedule } from '../../../apis';

const Wrapper = styled.div`
  height: 100%;
`;

const FieldTitle = styled.h4`
  font-weight: normal;
  line-height: 32px;
  margin: 0;
`;

const OptionalTitle = styled(FieldTitle)`
  font-style: italic;
`;

const transformTourSchedule = ({ day, pickUpAt, finishAt, schedule }) => {
  return {
    day: day + 1,
    pickup: [
      {
        pickupTime:
          typeof pickUpAt.time !== 'string'
            ? pickUpAt.time && moment(pickUpAt.time).format('HH:mm')
            : pickUpAt.time,
        pickupLocation: pickUpAt.place,
        finishTime:
          typeof finishAt?.time !== 'string'
            ? finishAt.time && moment(finishAt.time).format('HH:mm')
            : finishAt.time,
        finishLocation: finishAt.place,
      },
    ],
    schedule: flow(
      filter(({ time, place }) => time && time[0] && time[1] && place),
      map(({ time, place }) => ({
        from: time && time[0] && moment(time[0]).format('HH:mm'),
        to: time && time[1] && moment(time[1]).format('HH:mm'),
        location: place,
      }))
    )([schedule])
  };
};

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const duration = useMemo(() => tourCreationInfo.duration || 0, [tourCreationInfo]);
  const daySchedules = useMemo(() => {
    const initDaySchedules = _.times(Math.ceil(duration), _.constant({}));
    const currentDaySchedules = tourCreationInfo.daySchedules || [];
    return _.map(
      initDaySchedules,
      (daySchedule, i) =>
        currentDaySchedules[i] || {
          ...daySchedule,
          day: i,
          pickUpAt: {
            time:
              tourCreationInfo.pickup &&
              (tourCreationInfo.pickup[i + 1]?.Pickup[0].pickup_time || '0'),
            place:
              tourCreationInfo.pickup &&
              (tourCreationInfo.pickup[i + 1]?.Pickup[0].pickup_location || ''),
          },
          finishAt: {
            time:
              tourCreationInfo.pickup &&
              (tourCreationInfo.pickup[i + 1]?.Pickup[0].finish_time || '0'),
            place:
              tourCreationInfo.pickup &&
              (tourCreationInfo.pickup[i + 1]?.Pickup[0].finish_location || ''),
          },
          schedule:
            (tourCreationInfo.schedule &&
              tourCreationInfo.schedule[i + 1]?.Schedule?.map(item => {
                return {
                  $uuid: uuidv4(),
                  from: item.from || '0',
                  to: item.to || '0',
                  place: item.location,
                };
              })) ||
            [],
        }
    );
  }, [tourCreationInfo]);
  const pickUpAt = useMemo(() => daySchedules[currentDay] && daySchedules[currentDay].pickUpAt, [
    daySchedules,
    currentDay,
  ]);
  const finishAt = useMemo(() => daySchedules[currentDay] && daySchedules[currentDay].finishAt, [
    daySchedules,
    currentDay,
  ]);
  const schedule = useMemo(() => daySchedules[currentDay] && daySchedules[currentDay].schedule, [
    daySchedules,
    currentDay,
  ]);

  const updatePickUpAt = useCallback(
    newPickUpAt => {
      const currentDaySchedule = daySchedules[currentDay];
      _.assign(currentDaySchedule.pickUpAt, newPickUpAt);
      onUpdate({
        ...tourCreationInfo,
        daySchedules: _.cloneDeep(daySchedules),
      });
    },
    [onUpdate, pickUpAt, tourCreationInfo]
  );

  const updateFinishAt = useCallback(
    newFinishAt => {
      const currentDaySchedule = daySchedules[currentDay];
      _.assign(currentDaySchedule.finishAt, newFinishAt);
      onUpdate({
        ...tourCreationInfo,
        daySchedules: _.cloneDeep(daySchedules),
      });
    },
    [onUpdate, pickUpAt, tourCreationInfo]
  );

  const updateSchedule = useCallback(
    newSchedule => {
      const currentDaySchedule = daySchedules[currentDay];
      const currentSchedule = _.find(
        currentDaySchedule.schedule,
        s => s.$uuid === newSchedule.$uuid
      );
      if (currentSchedule) {
        _.assign(currentSchedule, newSchedule);
      }
      onUpdate({
        ...tourCreationInfo,
        daySchedules: _.cloneDeep(daySchedules),
      });
    },
    [onUpdate, schedule, tourCreationInfo]
  );

  const addSchedule = useCallback(() => {
    schedule.push({
      $uuid: uuidv4(),
    });
    onUpdate({
      ...tourCreationInfo,
      daySchedules: _.cloneDeep(daySchedules),
    });
  }, [onUpdate, schedule, daySchedules]);

  const saveDaySchedule = useCallback(
    async daySchedule => {
      setLoading(true);
      try {
        await createTourSchedule({
          tourId: tourCreationInfo.id,
          ...transformTourSchedule(daySchedule),
        });
      } catch (e) {
        // ignore
      }
      setLoading(false);
    },
    [onUpdate, schedule, daySchedules, tourCreationInfo]
  );
  const format = 'HH:mm';
  return (
    <Spin spinning={loading}>
      <Wrapper>
        <OptionalTitle>Optional</OptionalTitle>
        <br />
        <Tabs defaultActiveKey={currentDay} onChange={day => setCurrentDay(day)}>
          {_.map(daySchedules, daySchedule => (
            <Tabs.TabPane tab={`Day ${daySchedule.day + 1}`} key={daySchedule.day}>
              <Row gutter={16}>
                <Col span={4}>
                  <FieldTitle>Time</FieldTitle>
                </Col>
                <Col span={5}>
                  <TimePicker
                    defaultValue={moment(pickUpAt?.time || '0', format)}
                    onChange={time => updatePickUpAt({ time })}
                    format={format}
                    minuteStep={5}
                  />
                </Col>
                <Col span={4}>
                  <FieldTitle style={{ textAlign: 'right' }}>Pick up at</FieldTitle>
                </Col>
                <Col span={10}>
                  <Input
                    placeholder="Place"
                    value={pickUpAt.place}
                    onChange={e => updatePickUpAt({ place: e.target.value })}
                  />
                </Col>
              </Row>
              <br />
              {(!schedule || schedule.length <= 0) && (
                <Row gutter={16} style={{ marginBottom: 8 }}>
                  <Col span={4}>
                    <FieldTitle>Schedule</FieldTitle>
                  </Col>
                  <Col>
                    <Button size="small" onClick={() => addSchedule()} style={{ marginTop: 5 }}>
                      +
                    </Button>
                  </Col>
                </Row>
              )}
              {_.map(schedule, (s, i) => {
                return (
                  <Row gutter={16} style={{ marginBottom: 8 }} key={s.$uuid}>
                    <Col span={4}>{i === 0 && <FieldTitle>Schedule</FieldTitle>}</Col>
                    <Col span={7}>
                      <TimePicker.RangePicker
                        defaultValue={[moment(s.from || 0, format), moment(s.to || 0, format)]}
                        onChange={time => updateSchedule({ $uuid: s.$uuid, time })}
                        format={format}
                        minuteStep={5}
                        placeholder={['From', 'To']}
                      />
                    </Col>
                    <Col span={10} push={2}>
                      <Input
                        placeholder="Place"
                        value={s.place}
                        onChange={e => updateSchedule({ $uuid: s.$uuid, place: e.target.value })}
                      />
                    </Col>
                  </Row>
                );
              })}
              {schedule && schedule.length > 0 && (
                <Row gutter={16}>
                  <Col push={4}>
                    <Button size="small" onClick={() => addSchedule()}>
                      +
                    </Button>
                  </Col>
                </Row>
              )}
              <br />
              <Row gutter={16}>
                <Col span={4}>
                  <FieldTitle>Time</FieldTitle>
                </Col>
                <Col span={5}>
                  <TimePicker
                    defaultValue={moment(finishAt?.time || '0', format)}
                    onChange={time => updateFinishAt({ time })}
                    format={format}
                    minuteStep={5}
                  />
                </Col>
                <Col span={4}>
                  <FieldTitle style={{ textAlign: 'right' }}>Finish at</FieldTitle>
                </Col>
                <Col span={10}>
                  <Input
                    placeholder="Place"
                    value={finishAt.place}
                    onChange={e => updateFinishAt({ place: e.target.value })}
                  />
                </Col>
              </Row>
              <br />
              <Row justify="end">
                <Col pull={1}>
                  <Button type="primary" onClick={() => saveDaySchedule(daySchedule)}>
                    {`Save day ${daySchedule.day + 1}`}
                  </Button>
                </Col>
              </Row>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Wrapper>
    </Spin>
  );
};

StepLayout.propTypes = {
  tourCreationInfo: PropTypes.shape({
    id: PropTypes.number,
    duration: PropTypes.number,
    pickup: PropTypes.shape({}),
    schedule: PropTypes.shape({}),
    daySchedules: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number,
        pickUpAt: PropTypes.shape({
          place: PropTypes.string,
          time: PropTypes.string,
        }),
        finishAt: PropTypes.shape({
          place: PropTypes.string,
          time: PropTypes.string,
        }),
        schedule: PropTypes.arrayOf(
          PropTypes.shape({
            $uuid: PropTypes.string,
            place: PropTypes.string,
            time: PropTypes.string,
          })
        ),
      })
    ),
  }),
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
