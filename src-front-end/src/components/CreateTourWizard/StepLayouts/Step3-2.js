import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Input, Row, TimePicker } from 'antd';

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

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const pickUpAt = useMemo(() => tourCreationInfo.pickUpAt || {}, [tourCreationInfo]);
  const finishAt = useMemo(() => tourCreationInfo.finishAt || {}, [tourCreationInfo]);
  const schedule = useMemo(() => tourCreationInfo.schedule || [], [tourCreationInfo]);

  const updatePickUpAt = useCallback(
    newPickUpAt => {
      onUpdate({
        ...tourCreationInfo,
        pickUpAt: {
          ..._.assign(pickUpAt, newPickUpAt),
        },
      });
    },
    [onUpdate, pickUpAt, tourCreationInfo]
  );

  const updateFinishAt = useCallback(
    newFinishAt => {
      onUpdate({
        ...tourCreationInfo,
        finishAt: {
          ..._.assign(finishAt, newFinishAt),
        },
      });
    },
    [onUpdate, pickUpAt, tourCreationInfo]
  );

  const updateSchedule = useCallback(
    newSchedule => {
      const currentSchedule = _.find(schedule, s => s.$uuid === newSchedule.$uuid);
      if (currentSchedule) {
        _.assign(currentSchedule, newSchedule);
        onUpdate({
          ...tourCreationInfo,
          schedule: [...schedule],
        });
      }
    },
    [onUpdate, schedule, tourCreationInfo]
  );

  const addSchedule = useCallback(() => {
    schedule.push({
      $uuid: uuidv4(),
    });
    onUpdate({
      ...tourCreationInfo,
      schedule: [...schedule],
    });
  }, [onUpdate, pickUpAt, tourCreationInfo]);

  return (
    <Wrapper>
      <OptionalTitle>Optional</OptionalTitle>
      <br />
      <Row gutter={16}>
        <Col span={4}>
          <FieldTitle>Pick up at</FieldTitle>
        </Col>
        <Col span={11}>
          <Input
            placeholder="Place"
            value={pickUpAt.place}
            onChange={e => updatePickUpAt({ place: e.target.value })}
          />
        </Col>
        <Col span={3}>
          <FieldTitle style={{ textAlign: 'right' }}>Time</FieldTitle>
        </Col>
        <Col span={5}>
          <TimePicker value={pickUpAt.time} onChange={time => updatePickUpAt({ time })} />
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

      {_.map(schedule, (s, i) => (
        <Row gutter={16} style={{ marginBottom: 8 }} key={s.$uuid}>
          <Col span={4}>{i === 0 && <FieldTitle>Schedule</FieldTitle>}</Col>
          <Col span={11}>
            <Input
              placeholder="Place"
              value={s.place}
              onChange={e => updateSchedule({ $uuid: s.$uuid, place: e.target.value })}
            />
          </Col>
          <Col span={3}>
            <FieldTitle style={{ textAlign: 'right' }}>Time</FieldTitle>
          </Col>
          <Col span={5}>
            <TimePicker
              value={s.time}
              onChange={time => updateSchedule({ $uuid: s.$uuid, time })}
            />
          </Col>
        </Row>
      ))}
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
          <FieldTitle>Finish at</FieldTitle>
        </Col>
        <Col span={11}>
          <Input placeholder="Place" />
        </Col>
        <Col span={3}>
          <FieldTitle style={{ textAlign: 'right' }}>Time</FieldTitle>
        </Col>
        <Col span={5}>
          <TimePicker value={finishAt.time} onChange={time => updateFinishAt({ time })} />
        </Col>
      </Row>
    </Wrapper>
  );
};

StepLayout.propTypes = {
  tourCreationInfo: PropTypes.shape({
    pickUpAt: PropTypes.shape({
      place: PropTypes.string,
      time: PropTypes.number,
    }),
    finishAt: PropTypes.shape({
      $uuid: PropTypes.string,
      place: PropTypes.string,
      time: PropTypes.number,
    }),
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        place: PropTypes.string,
        time: PropTypes.number,
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
