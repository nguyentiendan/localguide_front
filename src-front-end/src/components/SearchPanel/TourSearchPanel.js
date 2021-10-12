import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import { Form, InputNumber, Select, Slider, Button, Row, Col } from 'antd';
import _ from 'lodash';

import colors from '../../assets/styles/colors';
import * as API from '../../apis';
import { DEFAULTPRICEVALUE, DEFAULTPRICESTEP } from '../../constants/keys';

const Wrapper = styled.div`
  position: relative;
  padding: 0 12px;
  border: none;
  background: ${colors.white};
  border-radius: 6px;
  margin-bottom: 15px;
`;

const Label = styled.p`
  line-height: 20px;
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  color: #2e2e2e;
  padding: 3px 0;
  text-align: left;
  margin-bottom: 0;
`;

function TourSearchPanel(props) {
  const {
    className,
    onChangeTag,
    onChangeCountry,
    onChangeCity,
    onChangeLength,
    onChangePrice,
    onChangeMin,
    onChangeMax,
    onChangeReset,
    selectTag,
    rootCountry,
    rootCity,
    selectCountry,
    selectCity,
    selectLength,
    selectPriceValue,
    form,
  } = props;
  const [tags, setTags] = useState([]);

  const colorStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
    }),
    multiValue: styles => ({
      ...styles,
      backgroundColor: '#F0E6E9',
    }),
    clearIndicator: styles => ({
      ...styles,
      padding: '2px',
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  const fetchTags = useCallback(async () => {
    const response = await API.getTag();
    const data = [];
    _.forEach(response.data, value => {
      data.push({ value, label: value });
    })
    setTags(data);
  });

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Wrapper className={className}>
      <Form form={form}>
        <Row justify="space-between" align="middle">
          <Col xs={24} lg={12}>
            <Label>Filter by Tour</Label>
          </Col>
          <Col xs={0} lg={6}>
            <Button type="link" block onClick={onChangeReset}>
              Clear
            </Button>
          </Col>
        </Row>
        <Form.Item noStyle>
          <Label>Tag</Label>
          <CreatableSelect
            placeholder="Select tag"
            isMulti
            closeMenuOnSelect={false}
            onChange={onChangeTag}
            options={tags}
            styles={colorStyles}
            value={selectTag}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Label>Country</Label>
          <Select
            labelInValue
            size="large"
            placeholder="Select Country"
            onChange={onChangeCountry}
            value={{ value: selectCountry && selectCountry.value }}
            style={{ width: '100%' }}
            getPopupContainer={node => node.parentNode}
          >
            {rootCountry?.map(item => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item noStyle>
          <Label>City</Label>
          <Select 
            size="large"
            placeholder="Select City"
            onChange={onChangeCity}
            value={selectCity}
            style={{ width: '100%' }}
            getPopupContainer={node => node.parentNode}
          >
            {rootCity?.map(item => (
              <Select.Option value={item.city_name} key={item.city_name}>
                {item.city_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item noStyle>
          <Label>Tour length</Label>
          <Select
            size="large"
            placeholder="Select Tour length"
            onChange={onChangeLength}
            value={selectLength}
            style={{ width: '100%' }}
            getPopupContainer={node => node.parentNode}
          >
            {[...Array(10)].map((_, i) => (
              <Select.Option value={i + 1} key={i}>
                {i + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item noStyle>
          <Label>Tour price</Label>
          <Slider
            range
            step={DEFAULTPRICESTEP}
            defaultValue={DEFAULTPRICEVALUE}
            min={DEFAULTPRICEVALUE[0]}
            max={DEFAULTPRICEVALUE[1]}
            value={selectPriceValue}
            style={{ width: '95%' }}
            onChange={onChangePrice}
          />
          <Row align="middle" justify="space-around">
            <Col xs={12} sm={6} lg={12}>
              <div style={{ display: 'flex', marginBottom: '3px' }}>
                <p style={{ margin: '0 5px 0 0' }}>Min</p>
                <InputNumber
                  size="small"
                  step={DEFAULTPRICESTEP}
                  min={DEFAULTPRICEVALUE[0]}
                  max={DEFAULTPRICEVALUE[1]}
                  style={{ margin: '0 5px', height: '25px' }}
                  value={selectPriceValue[0]}
                  onChange={onChangeMin}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} lg={12}>
              <div style={{ display: 'flex', marginBottom: '3px' }}>
                <p style={{ margin: '0 5px 0 0' }}>Max</p>
                <InputNumber
                  size="small"
                  step={DEFAULTPRICESTEP}
                  min={DEFAULTPRICEVALUE[0]}
                  max={DEFAULTPRICEVALUE[1]}
                  style={{ margin: '0 5px', height: '25px' }}
                  value={selectPriceValue[1]}
                  onChange={onChangeMax}
                />
              </div>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}

TourSearchPanel.propTypes = {
  className: PropTypes.string,
  onChangeTag: PropTypes.func,
  selectTag: PropTypes.arrayOf(PropTypes.shape({})),
  onChangeCountry: PropTypes.func,
  onChangeCity: PropTypes.func,
  onChangeLength: PropTypes.func,
  onChangePrice: PropTypes.func,
  onChangeMin: PropTypes.func,
  onChangeMax: PropTypes.func,
  onChangeReset: PropTypes.func,
  rootCountry: PropTypes.arrayOf(PropTypes.shape({})),
  rootCity: PropTypes.arrayOf(PropTypes.shape({})),
  selectCountry: PropTypes.shape({}),
  selectCity: PropTypes.string,
  selectLength: PropTypes.number,
  selectPriceValue: PropTypes.arrayOf(PropTypes.number),
  form: PropTypes.shape({}),
};

TourSearchPanel.defaultProps = {
  className: '',
  onChangeTag: () => {},
  selectTag: null,
  onChangeCountry: () => {},
  onChangeCity: () => {},
  onChangeLength: () => {},
  onChangePrice: () => {},
  onChangeMin: () => {},
  onChangeMax: () => {},
  onChangeReset: () => {},
  rootCountry: null,
  rootCity: null,
  selectCountry: null,
  selectCity: null,
  selectLength: null,
  selectPriceValue: null,
  form: null,
};

export default TourSearchPanel;
