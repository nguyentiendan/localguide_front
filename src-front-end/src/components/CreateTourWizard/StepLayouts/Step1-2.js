import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Row, Col, Select } from 'antd';

import vnCities from '../../../../mockdata/vietnam-cities.json';
import jpCities from '../../../../mockdata/japan-cities.json';

const durationOptions = [0.5, ..._.pull(_.times(11, Number), 0)];
const paxOptions = _.pull(_.times(41, Number), 0);

const Wrapper = styled.div`
  height: 100%;
  padding-right: 1.25rem;
`;

const SubTitle = styled.h3`
  font-weight: normal;
`;

const COUNTRIES = ['Japan', 'Vietnam'];

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const country = useMemo(() => tourCreationInfo.country, [tourCreationInfo]);
  const city = useMemo(() => tourCreationInfo.city, [tourCreationInfo]);
  const duration = useMemo(() => tourCreationInfo.duration, [tourCreationInfo]);
  const minPax = useMemo(() => tourCreationInfo.minPax, [tourCreationInfo]);
  const maxPax = useMemo(() => tourCreationInfo.maxPax, [tourCreationInfo]);

  const updateCountry = useCallback(
    selectedCountry => {
      onUpdate({
        ...tourCreationInfo,
        country: selectedCountry,
        city: undefined,
      });
    },
    [onUpdate, tourCreationInfo]
  );

  const updateCity = useCallback(
    selectedCity => {
      onUpdate({
        ...tourCreationInfo,
        city: selectedCity,
      });
    },
    [onUpdate, tourCreationInfo]
  );

  const updateDuration = useCallback(
    newDuration => {
      if (newDuration > 0) {
        onUpdate({
          ...tourCreationInfo,
          duration: +newDuration,
        });
      }
    },
    [onUpdate, tourCreationInfo]
  );

  const updateMinPax = useCallback(
    newMinPax => {
      if (newMinPax > 0) {
        onUpdate({
          ...tourCreationInfo,
          minPax: +newMinPax,
        });
      }
    },
    [onUpdate, tourCreationInfo]
  );

  const updateMaxPax = useCallback(
    newMaxPax => {
      if (newMaxPax > 0) {
        onUpdate({
          ...tourCreationInfo,
          maxPax: +newMaxPax,
        });
      }
    },
    [onUpdate, tourCreationInfo]
  );

  return (
    <Wrapper>
      <SubTitle>Country and city of tour</SubTitle>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a country"
        optionFilterProp="children"
        onChange={updateCountry}
        value={country}
        size="large"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {_.map(COUNTRIES, c => (
          <Select.Option key={c} value={c}>
            {c}
          </Select.Option>
        ))}
      </Select>
      <br />
      <br />
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a city"
        optionFilterProp="children"
        onChange={updateCity}
        value={city}
        size="large"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {country &&
          _.map(country === 'Japan' ? jpCities : vnCities, c => (
            <Select.Option key={c} value={c}>
              {c}
            </Select.Option>
          ))}
      </Select>
      <br />
      <br />
      <br />
      <Row gutter={16}>
        <Col span={10}>
          <SubTitle>Tour Duration</SubTitle>
          <Select
            style={{ width: 200 }}
            placeholder="Select duration"
            onChange={updateDuration}
            value={duration}
            size="large"
          >
            {_.map(durationOptions, d => (
              <Select.Option key={d} value={d}>
                {`${d === 0.5 ? 'Half' : d} day${d > 1 ? 's' : ''}`}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={10}>
          <SubTitle>Pax number</SubTitle>
          <Select placeholder="Select min pax" onChange={updateMinPax} value={minPax} size="large">
            {_.map(paxOptions, m => (
              <Select.Option key={m} value={m}>
                {`${m}`}
              </Select.Option>
            ))}
          </Select>
          &nbsp;-&nbsp;
          <Select placeholder="Select max pax" onChange={updateMaxPax} value={maxPax} size="large">
            {_.map(
              _.filter(paxOptions, p => p >= minPax),
              m => (
                <Select.Option key={m} value={m}>
                  {`${m}`}
                </Select.Option>
              )
            )}
          </Select>
        </Col>
      </Row>
    </Wrapper>
  );
};

StepLayout.propTypes = {
  tourCreationInfo: PropTypes.shape({
    country: PropTypes.string,
    city: PropTypes.string,
    duration: PropTypes.number,
    minPax: PropTypes.number,
    maxPax: PropTypes.number,
  }),
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
