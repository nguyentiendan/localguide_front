import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Divider, Input, Row, Select, Spin, Tabs, Typography } from 'antd';

import * as API from '../../../apis';

const Wrapper = styled.div`
  height: 100%;
`;

const FieldTitle = styled.h4`
  font-weight: normal;
  line-height: 32px;
  margin: 0;
`;

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const currencySymbol = useMemo(
    () => (tourCreationInfo._country && tourCreationInfo._country.symbol) || '',
    [tourCreationInfo]
  );
  const duration = useMemo(() => tourCreationInfo.duration || 0, [tourCreationInfo]);
  const tourDayFees = useMemo(() => {
    const initTourDayFees = _.times(Math.ceil(duration), _.constant({}));
    const currentTourDayFees = tourCreationInfo.tourDayFees || [];
    return _.map(
      initTourDayFees,
      (tourDayFee, i) =>
        currentTourDayFees[i] || {
          ...tourDayFee,
          day: i,
          transportations: (tourCreationInfo.transport &&
            tourCreationInfo.transport[i + 1]?.Trans?.map(item => {
              return {
                $uuid: uuidv4(),
                quantity: tourCreationInfo.minPax,
                from: item.from,
                to: item.to,
                by: item.vehicle,
                unit: item.unit,
              };
            })) || [{ $uuid: uuidv4(), quantity: tourCreationInfo.minPax }],
          meals: (tourCreationInfo.meal &&
            tourCreationInfo.meal[i + 1]?.Meal?.map(item => {
              return {
                $uuid: uuidv4(),
                quantity: tourCreationInfo.minPax,
                description: item.name,
                type: item.time,
                unit: item.unit,
              };
            })) || [{ $uuid: uuidv4(), quantity: tourCreationInfo.minPax }],
          others: (tourCreationInfo.other &&
            tourCreationInfo.other[i + 1]?.Other?.map(item => {
              return {
                $uuid: uuidv4(),
                quantity: tourCreationInfo.minPax,
                description: item.name,
                unit: item.unit,
              };
            })) || [{ $uuid: uuidv4(), quantity: tourCreationInfo.minPax }],
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
  const { minPax, maxPax } = tourCreationInfo;
  const quantityOptions = useMemo(() => _.times(maxPax - minPax + 1, i => i + minPax), [
    tourCreationInfo,
  ]);

  const total = useMemo(() => {
    let sum = 0;
    if (guideFee) {
      sum += +guideFee;
    }
    let totalInputFees = [];
    _.forEach(tourDayFees, day => {
      totalInputFees = totalInputFees.concat([
        ...(day.transportations || []),
        ...(day.meals || []),
        ...(day.others || []),
      ]);
    });

    _.forEach(totalInputFees, fee => {
      if (fee && !_.isNil(fee.quantity) && !_.isNil(fee.unit)) {
        sum += +fee.quantity * +fee.unit;
      }
    });

    return _.round(sum * 1.15, 2);
  }, [guideFee, transportations, meals, others, tourDayFees, currentDay]);

  const addNewTransportation = useCallback(() => {
    transportations.push({
      $uuid: uuidv4(),
      quantity: tourCreationInfo.minPax,
    });
    onUpdate({
      ...tourCreationInfo,
      tourDayFees: _.cloneDeep(tourDayFees),
    });
  }, [onUpdate, transportations, tourDayFees]);

  const addNewOther = useCallback(() => {
    others.push({
      $uuid: uuidv4(),
      quantity: tourCreationInfo.minPax,
    });
    onUpdate({
      ...tourCreationInfo,
      tourDayFees: _.cloneDeep(tourDayFees),
    });
  }, [onUpdate, others, tourDayFees]);

  const addNewMeal = useCallback(() => {
    meals.push({
      $uuid: uuidv4(),
      quantity: tourCreationInfo.minPax,
    });
    onUpdate({
      ...tourCreationInfo,
      tourDayFees: _.cloneDeep(tourDayFees),
    });
  }, [onUpdate, meals, tourDayFees]);

  const updateTourDayFees = useCallback(
    newUpdateFee => {
      const currentTransportation = _.find(transportations, t => t.$uuid === newUpdateFee.$uuid);
      const currentMeal = _.find(meals, meal => meal.$uuid === newUpdateFee.$uuid);
      const currentOther = _.find(others, other => other.$uuid === newUpdateFee.$uuid);
      if (currentTransportation) {
        _.assign(currentTransportation, newUpdateFee);
      } else if (currentMeal) {
        _.assign(currentMeal, newUpdateFee);
      } else if (currentOther) {
        _.assign(currentOther, newUpdateFee);
      }
      onUpdate({
        ...tourCreationInfo,
        tourDayFees: _.cloneDeep(tourDayFees),
      });
    },
    [onUpdate, transportations, meals, others, tourDayFees]
  );
  const updateGuideFee = useCallback(
    newGuideFee => {
      onUpdate({
        ...tourCreationInfo,
        total: Math.ceil(+total),
        guideFee: +newGuideFee,
      });
    },
    [onUpdate, tourCreationInfo]
  );

  const saveTourFee = useCallback(
    async tourDayFee => {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        await API.createTourFee({
          tourId: tourCreationInfo.id,
          day: tourDayFee.day + 1,
          transport: _.chain(tourDayFee.transportations)
            .filter(
              trans =>
                trans.from &&
                trans.to &&
                trans.by &&
                !_.isNil(trans.quantity) &&
                !_.isNil(trans.unit)
            )
            .map(trans => ({
              from: trans.from,
              to: trans.to,
              vehicle: trans.by,
              quantity: trans.quantity,
              unit: `${trans.unit}`,
            }))
            .value(),
          meal: _.chain(tourDayFee.meals)
            .filter(
              meal =>
                meal.description && meal.type && !_.isNil(meal.quantity) && !_.isNil(meal.unit)
            )
            .map(meal => ({
              name: meal.description,
              time: meal.type,
              quantity: meal.quantity,
              unit: `${meal.unit}`,
            }))
            .value(),
          other: _.chain(tourDayFee.others)
            .filter(other => other.description && !_.isNil(other.quantity) && !_.isNil(other.unit))
            .map(other => ({
              name: other.description,
              quantity: other.quantity,
              unit: `${other.unit}`,
            }))
            .value(),
        });
        onUpdate({
          ...tourCreationInfo,
          total: Math.ceil(+total),
        });
      } catch (e) {
        // ignore
      }
      setLoading(false);
    },
    [tourCreationInfo, tourDayFees, loading]
  );
  return (
    <Spin spinning={loading}>
      <Wrapper>
        <Tabs defaultActiveKey={currentDay} onChange={day => setCurrentDay(day)}>
          {_.map(tourDayFees, tourDayFee => (
            <Tabs.TabPane tab={`Day ${tourDayFee.day + 1}`} key={tourDayFee.day}>
              <Row gutter={16}>
                <Col span={14}>
                  <FieldTitle>Transportation</FieldTitle>
                </Col>
                <Col span={4}>
                  <FieldTitle>Quantity</FieldTitle>
                </Col>
                <Col span={5}>
                  <FieldTitle>Unit</FieldTitle>
                </Col>
                {_.map(tourDayFee.transportations, transportation => (
                  <div key={transportation.$uuid} style={{ display: 'flex', width: '100%' }}>
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
                    <Col span={4}>
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Select quantity"
                        onChange={val =>
                          updateTourDayFees({
                            $uuid: transportation.$uuid,
                            quantity: val,
                          })
                        }
                        value={transportation.quantity}
                      >
                        {_.map(quantityOptions, m => (
                          <Select.Option key={m} value={m}>
                            {`${m}`}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={5}>
                      <Input
                        placeholder="Unit"
                        type="number"
                        suffix={currencySymbol}
                        value={transportation.unit}
                        onChange={e =>
                          updateTourDayFees({
                            $uuid: transportation.$uuid,
                            unit: +e.target.value,
                          })
                        }
                      />
                    </Col>
                  </div>
                ))}
              </Row>
              {tourDayFee.transportations.length <= 3 && (
                <Row>
                  <Col span={24}>
                    <Button size="small" onClick={() => addNewTransportation()}>
                      +
                    </Button>
                  </Col>
                </Row>
              )}
              <br />
              <Row gutter={16}>
                <Col span={14}>
                  <FieldTitle>Entrance & Others fee</FieldTitle>
                </Col>
                <Col span={4}>
                  <FieldTitle>Quantity</FieldTitle>
                </Col>
                <Col span={5}>
                  <FieldTitle>Unit</FieldTitle>
                </Col>
                {_.map(tourDayFee.others, other => (
                  <div key={other.$uuid} style={{ display: 'flex', width: '100%' }}>
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
                    <Col span={4}>
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Select quantity"
                        onChange={val =>
                          updateTourDayFees({
                            $uuid: other.$uuid,
                            quantity: val,
                          })
                        }
                        value={other.quantity}
                      >
                        {_.map(quantityOptions, m => (
                          <Select.Option key={m} value={m}>
                            {`${m}`}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={5}>
                      <Input
                        placeholder="Unit"
                        type="number"
                        suffix={currencySymbol}
                        value={other.unit}
                        onChange={e =>
                          updateTourDayFees({
                            $uuid: other.$uuid,
                            unit: +e.target.value,
                          })
                        }
                      />
                    </Col>
                  </div>
                ))}
              </Row>
              {tourDayFee.others.length <= 3 && (
                <Row>
                  <Col span={24}>
                    <Button size="small" onClick={() => addNewOther()}>
                      +
                    </Button>
                  </Col>
                </Row>
              )}
              <br />
              <Row gutter={16}>
                <Col span={14}>
                  <FieldTitle>Meal fee</FieldTitle>
                </Col>
                <Col span={4}>
                  <FieldTitle>Quantity</FieldTitle>
                </Col>
                <Col span={5}>
                  <FieldTitle>Unit</FieldTitle>
                </Col>
                {_.map(tourDayFee.meals, meal => (
                  <div key={meal.$uuid} style={{ display: 'flex', width: '100%' }}>
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
                    <Col span={4}>
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Select quantity"
                        onChange={val =>
                          updateTourDayFees({
                            $uuid: meal.$uuid,
                            quantity: val,
                          })
                        }
                        value={meal.quantity}
                      >
                        {_.map(quantityOptions, m => (
                          <Select.Option key={m} value={m}>
                            {`${m}`}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={5}>
                      <Input
                        placeholder="Unit"
                        type="number"
                        suffix={currencySymbol}
                        value={meal.unit}
                        onChange={e =>
                          updateTourDayFees({
                            $uuid: meal.$uuid,
                            unit: +e.target.value,
                          })
                        }
                      />
                    </Col>
                  </div>
                ))}
              </Row>
              {tourDayFee.meals.length <= 3 && (
                <Row>
                  <Col span={24}>
                    <Button size="small" onClick={() => addNewMeal()}>
                      +
                    </Button>
                  </Col>
                </Row>
              )}
              <br />
              <Row justify="end">
                <Col pull={1}>
                  <Button type="primary" onClick={() => saveTourFee(tourDayFee)}>
                    {`Save day ${tourDayFee.day + 1}`}
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
            <FieldTitle>
              {`Tour in ${duration === 0.5 ? 'half' : duration} day${duration > 1 ? 's' : ''} with`}
            </FieldTitle>
          </Col>
          <Col span={4}>
            <FieldTitle style={{ textAlign: 'right' }}>Guide fee</FieldTitle>
          </Col>
          <Col span={4}>
            <Input
              placeholder="Fee"
              type="number"
              suffix={currencySymbol}
              value={guideFee || null}
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
              suffix={currencySymbol}
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
    </Spin>
  );
};

StepLayout.propTypes = {
  tourCreationInfo: PropTypes.shape({
    id: PropTypes.number,
    duration: PropTypes.number,
    meal: PropTypes.shape({}),
    transport: PropTypes.shape({}),
    other: PropTypes.shape({}),
    tourDayFees: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number,
        transportations: PropTypes.arrayOf(
          PropTypes.shape({
            $uuid: PropTypes.string,
            from: PropTypes.string,
            to: PropTypes.string,
            by: PropTypes.string,
            unit: PropTypes.number,
            quantity: PropTypes.number,
          })
        ),
        meals: PropTypes.arrayOf(
          PropTypes.shape({
            $uuid: PropTypes.string,
            description: PropTypes.string,
            type: PropTypes.string,
            unit: PropTypes.number,
            quantity: PropTypes.number,
          })
        ),
        others: PropTypes.arrayOf(
          PropTypes.shape({
            $uuid: PropTypes.string,
            description: PropTypes.string,
            unit: PropTypes.number,
            quantity: PropTypes.number,
          })
        ),
      })
    ),
    guideFee: PropTypes.number,
    minPax: PropTypes.number,
    maxPax: PropTypes.number,
    _country: PropTypes.shape({
      symbol: PropTypes.string,
    }),
  }),
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
