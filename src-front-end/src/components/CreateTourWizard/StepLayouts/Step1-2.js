import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Row, Col, Select, Spin } from 'antd';

import * as API from '../../../apis';

const durationOptions = [0.5, ..._.pull(_.times(11, Number), 0)];
const paxOptions = _.pull(_.times(41, Number), 0);

const Wrapper = styled.div`
  height: 100%;
  padding-right: 1.25rem;
`;

const SubTitle = styled.h3`
  font-weight: normal;
`;

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState();
  const country = useMemo(() => tourCreationInfo.country, [tourCreationInfo]);
  const countryCode = useMemo(() => {
    if (!countryOptions || !country) {
      return undefined;
    }
    const selectedCountry = _.find(countryOptions, c => c.name === country);
    return selectedCountry && selectedCountry.code;
  }, [country, countryOptions]);
  const city = useMemo(() => tourCreationInfo.city, [tourCreationInfo]);
  const duration = useMemo(() => tourCreationInfo.duration, [tourCreationInfo]);
  const minPax = useMemo(() => tourCreationInfo.minPax, [tourCreationInfo]);
  const maxPax = useMemo(() => tourCreationInfo.maxPax, [tourCreationInfo]);

  const updateCountry = useCallback(
    selectedCountry => {
      onUpdate({
        ...tourCreationInfo,
        country: selectedCountry.label,
        city: undefined,
      });
      setSelectedCountryCode(selectedCountry.value);
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

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await API.getAllCountry();
        setCountryOptions(data);
      } catch (e) {
        // ignore
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!selectedCountryCode) {
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const { data } = await API.getCityOfCountry(selectedCountryCode);
        setCityOptions(data);
      } catch (e) {
        // ignore
      }
      setLoading(false);
    })();
  }, [selectedCountryCode]);

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <SubTitle>Country and city of tour</SubTitle>
        <Select
          showSearch
          labelInValue
          style={{ width: 200 }}
          placeholder="Select a country"
          optionFilterProp="children"
          onChange={updateCountry}
          value={countryCode && { value: countryCode }}
          size="large"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {_.map(countryOptions, c => (
            <Select.Option key={c.code} value={c.code}>
              {c.name}
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
            _.map(cityOptions, ({ city_name: cityName }) => (
              <Select.Option key={cityName} value={cityName}>
                {cityName}
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
            <Select
              placeholder="Select min pax"
              onChange={updateMinPax}
              value={minPax}
              size="large"
            >
              {_.map(paxOptions, m => (
                <Select.Option key={m} value={m}>
                  {`${m}`}
                </Select.Option>
              ))}
            </Select>
            &nbsp;-&nbsp;
            <Select
              placeholder="Select max pax"
              onChange={updateMaxPax}
              value={maxPax}
              size="large"
            >
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
    </Spin>
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
