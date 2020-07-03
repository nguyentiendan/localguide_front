import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Input, Row, Col, Select } from 'antd';

import vnCities from '../../../../mockdata/vietnam-cities.json';
import jpCities from '../../../../mockdata/japan-cities.json';

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
          <Input
            placeholder="Duration"
            value={duration}
            onChange={e => updateDuration(e.target.value)}
            type="number"
            addonAfter="day(s)"
            size="large"
            style={{ maxWidth: 170 }}
          />
        </Col>
        <Col span={10}>
          <SubTitle>Maximum pax number</SubTitle>
          <Input
            placeholder="Max pax"
            value={maxPax}
            onChange={e => updateMaxPax(e.target.value)}
            type="number"
            size="large"
            style={{ maxWidth: 100 }}
          />
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
    maxPax: PropTypes.number,
  }),
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
