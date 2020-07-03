import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Divider, Input, Row, Tabs, Typography } from 'antd';

const Wrapper = styled.div`
  height: 100%;
`;

const FieldTitle = styled.h4`
  font-weight: normal;
  line-height: 32px;
  margin: 0;
`;

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const [currentDay, setCurrentDay] = useState(0);
  const duration = useMemo(() => tourCreationInfo.duration || 0, [tourCreationInfo]);
  const tourDayFees = useMemo(() => {
    const initTourDayFees = _.times(duration, _.constant({}));
    const currentTourDayFees = tourCreationInfo.tourDayFees || [];
    return _.map(
      initTourDayFees,
      (tourDayFee, i) =>
        currentTourDayFees[i] || {
          ...tourDayFee,
          day: i,
          transportations: [{ $uuid: uuidv4() }],
          meals: [{ $uuid: uuidv4() }],
          others: [{ $uuid: uuidv4() }],
        }
    );
  }, [tourCreationInfo]);
  const transportations = useMemo(
    () => tourDayFees[currentDay] && tourDayFees[currentDay].transportations,
    [tourDayFees, currentDay]
  );
  const meals = useMemo(() => tourDayFees[currentDay] && tourDayFees[currentDay].meals, [
    tourDayFees,
    currentDay,
  ]);
  const others = useMemo(() => tourDayFees[currentDay] && tourDayFees[currentDay].others, [
    tourDayFees,
    currentDay,
  ]);
  const guideFee = useMemo(() => tourCreationInfo.guideFee, [tourCreationInfo]);

  const total = useMemo(() => {
    let sum = 0;
    if (guideFee) {
      sum += +guideFee;
    }
    _.forEach([...(transportations || []), ...(meals || []), ...(others || [])], fee => {
      if (fee && !_.isNil(fee.amount) && !_.isNil(fee.unit)) {
        sum += +fee.amount * +fee.unit;
      }
    });

    return _.round(sum * 1.15, 2);
  }, [guideFee, transportations, meals, others, tourDayFees, currentDay]);

  const addNewTransportation = useCallback(() => {
    transportations.push({
      $uuid: uuidv4(),
    });
    onUpdate({
      ...tourCreationInfo,
      tourDayFees: {
        ...tourDayFees,
        transportations: [...transportations],
      },
    });
  }, [onUpdate, transportations, tourDayFees]);

  const addNewOther = useCallback(() => {
    others.push({
      $uuid: others.length,
    });
    onUpdate({
      ...tourCreationInfo,
      tourDayFees: {
        ...tourDayFees,
        others: [...others],
      },
    });
  }, [onUpdate, others, tourDayFees]);

  const addNewMeal = useCallback(() => {
    meals.push({
      $uuid: uuidv4(),
    });
    onUpdate({
      ...tourCreationInfo,
      tourDayFees: {
        ...tourDayFees,
        meals: [...meals],
      },
    });
  }, [onUpdate, meals, tourDayFees]);

  const updateTourDayFees = useCallback(
    newUpdateFee => {
      const currentTransportation = _.find(transportations, t => t.$uuid === newUpdateFee.$uuid);
      const currentMeal = _.find(meals, meal => meal.$uuid === newUpdateFee.$uuid);
      const currentOther = _.find(others, other => other.$uuid === newUpdateFee.$uuid);
      if (currentTransportation) {
        _.assign(currentTransportation, newUpdateFee);
        onUpdate({
          ...tourCreationInfo,
          tourDayFees: {
            ...tourDayFees,
            transportations: [...transportations],
          },
        });
      } else if (currentMeal) {
        _.assign(currentMeal, newUpdateFee);
        onUpdate({
          ...tourCreationInfo,
          tourDayFees: {
            ...tourDayFees,
            meals: [...meals],
          },
        });
      } else if (currentOther) {
        _.assign(currentOther, newUpdateFee);
        onUpdate({
          ...tourCreationInfo,
          tourDayFees: {
            ...tourDayFees,
            others: [...others],
          },
        });
      }
    },
    [onUpdate, transportations, meals, others, tourDayFees]
  );

  const updateGuideFee = useCallback(
    newGuideFee => {
      onUpdate({
        ...tourCreationInfo,
        guideFee: newGuideFee,
      });
    },
    [onUpdate, tourCreationInfo]
  );

  return (
    <Wrapper>
      <Tabs defaultActiveKey={currentDay} onChange={day => setCurrentDay(day)}>
        {_.map(tourDayFees, tourDayFee => (
          <Tabs.TabPane tab={`Day ${tourDayFee.day + 1}`} key={tourDayFee.day}>
            <Row gutter={16}>
              <Col span={14}>
                <FieldTitle>Transportation</FieldTitle>
              </Col>
              <Col span={5}>
                <FieldTitle>Unit</FieldTitle>
              </Col>
              <Col span={4}>
                <FieldTitle>Amount</FieldTitle>
              </Col>
              {_.map(transportations, transportation => (
                <>
                  <Col span={14} style={{ marginBottom: 8 }}>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Input
                          placeholder="From"
                          value={transportation.from}
                          onChange={e =>
                            updateTourDayFees({
                              $uuid: transportation.$uuid,
                              from: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col span={8}>
                        <Input
                          placeholder="To"
                          value={transportation.to}
                          onChange={e =>
                            updateTourDayFees({
                              $uuid: transportation.$uuid,
                              to: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col span={8}>
                        <Input
                          placeholder="By"
                          value={transportation.by}
                          onChange={e =>
                            updateTourDayFees({
                              $uuid: transportation.$uuid,
                              by: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={5}>
                    <Input
                      placeholder="Unit"
                      type="number"
                      suffix="¥"
                      value={transportation.unit}
                      onChange={e =>
                        updateTourDayFees({
                          $uuid: transportation.$uuid,
                          unit: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col span={4}>
                    <Input
                      placeholder="Amount"
                      type="number"
                      value={transportation.amount}
                      onChange={e =>
                        updateTourDayFees({
                          $uuid: transportation.$uuid,
                          amount: e.target.value,
                        })
                      }
                    />
                  </Col>
                </>
              ))}
            </Row>
            <Row>
              <Col span={24}>
                <Button size="small" onClick={() => addNewTransportation()}>
                  +
                </Button>
              </Col>
            </Row>
            <br />
            <Row gutter={16}>
              <Col span={14}>
                <FieldTitle>Entrance & Others fee</FieldTitle>
              </Col>
              <Col span={5}>
                <FieldTitle>Unit</FieldTitle>
              </Col>
              <Col span={4}>
                <FieldTitle>Amount</FieldTitle>
              </Col>
              {_.map(others, other => (
                <>
                  <Col span={14} style={{ marginBottom: 8 }}>
                    <Input
                      placeholder="Snack in the train"
                      value={other.description}
                      onChange={e =>
                        updateTourDayFees({
                          $uuid: other.$uuid,
                          description: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col span={5}>
                    <Input
                      placeholder="Unit"
                      type="number"
                      suffix="¥"
                      value={other.unit}
                      onChange={e =>
                        updateTourDayFees({
                          $uuid: other.$uuid,
                          unit: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col span={4}>
                    <Input
                      placeholder="Amount"
                      type="number"
                      value={other.amount}
                      onChange={e =>
                        updateTourDayFees({
                          $uuid: other.$uuid,
                          amount: e.target.value,
                        })
                      }
                    />
                  </Col>
                </>
              ))}
            </Row>
            <Row>
              <Col span={24}>
                <Button size="small" onClick={() => addNewOther()}>
                  +
                </Button>
              </Col>
            </Row>
            <br />
            <Row gutter={16}>
              <Col span={14}>
                <FieldTitle>Meal fee</FieldTitle>
              </Col>
              <Col span={5}>
                <FieldTitle>Unit</FieldTitle>
              </Col>
              <Col span={4}>
                <FieldTitle>Amount</FieldTitle>
              </Col>
              {_.map(meals, meal => (
                <>
                  <Col span={14} style={{ marginBottom: 8 }}>
                    <Row gutter={16}>
                      <Col span={16}>
                        <Input
                          placeholder="City or restaurant name"
                          value={meal.description}
                          onChange={e =>
                            updateTourDayFees({
                              $uuid: meal.$uuid,
                              description: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col span={8}>
                        <Input
                          placeholder="Lunch"
                          value={meal.type}
                          onChange={e =>
                            updateTourDayFees({
                              $uuid: meal.$uuid,
                              type: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={5}>
                    <Input
                      placeholder="Unit"
                      type="number"
                      suffix="¥"
                      value={meal.unit}
                      onChange={e =>
                        updateTourDayFees({
                          $uuid: meal.$uuid,
                          unit: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col span={4}>
                    <Input
                      placeholder="Amount"
                      type="number"
                      value={meal.amount}
                      onChange={e =>
                        updateTourDayFees({
                          $uuid: meal.$uuid,
                          amount: e.target.value,
                        })
                      }
                    />
                  </Col>
                </>
              ))}
            </Row>
            <Row>
              <Col span={24}>
                <Button size="small" onClick={() => addNewMeal()}>
                  +
                </Button>
              </Col>
            </Row>
          </Tabs.TabPane>
        ))}
      </Tabs>
      <br />
      <Divider />
      <Row gutter={16}>
        <Col span={7}>
          <FieldTitle>{`Tour in ${duration} day${duration > 1 ? 's' : ''} with`}</FieldTitle>
        </Col>
        <Col span={4}>
          <FieldTitle style={{ textAlign: 'right' }}>Guide fee</FieldTitle>
        </Col>
        <Col span={4}>
          <Input
            placeholder="Fee"
            type="number"
            suffix="¥"
            value={guideFee}
            onChange={e => updateGuideFee(e.target.value)}
          />
        </Col>
        <Col span={3}>
          <FieldTitle style={{ textAlign: 'right' }}>Total</FieldTitle>
        </Col>
        <Col span={5}>
          <Input
            placeholder="Total"
            type="number"
            suffix="¥"
            style={{ pointerEvents: 'none' }}
            value={total}
          />
        </Col>
      </Row>
      <Row gutter={16} justify="end" style={{ marginTop: 8 }}>
        <Col pull={1}>
          <Typography.Text type="danger">15% Administration fee is added</Typography.Text>
        </Col>
      </Row>
    </Wrapper>
  );
};

StepLayout.propTypes = {
  tourCreationInfo: PropTypes.shape({
    duration: PropTypes.number,
    tourDayFees: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number,
        transportations: PropTypes.arrayOf(
          PropTypes.shape({
            $uuid: PropTypes.number,
            from: PropTypes.string,
            to: PropTypes.string,
            by: PropTypes.string,
            unit: PropTypes.number,
            amount: PropTypes.number,
          })
        ),
        meals: PropTypes.arrayOf(
          PropTypes.shape({
            $uuid: PropTypes.number,
            description: PropTypes.string,
            type: PropTypes.string,
            unit: PropTypes.number,
            amount: PropTypes.number,
          })
        ),
        others: PropTypes.arrayOf(
          PropTypes.shape({
            $uuid: PropTypes.number,
            description: PropTypes.string,
            unit: PropTypes.number,
            amount: PropTypes.number,
          })
        ),
      })
    ),
    guideFee: PropTypes.number,
  }),
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
