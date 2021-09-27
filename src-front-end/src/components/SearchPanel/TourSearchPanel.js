import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import { Form, InputNumber, Select, Slider, Button, Row, Col } from 'antd';

// import Button from '../Button';
import colors from '../../assets/styles/colors';
import * as API from '../../apis';

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

function TourSearchPanel({ className }) {
  const [rootCity, setRootCity] = useState([]);
  const [rootCountry, setRootCountry] = useState([]);
  const [inputValue, setInputValue] = useState([500, 1000]);
  const [form] = Form.useForm();

  const handleChange = newValue => {
    console.log(newValue);
  };

  const tagOptions = [
    { value: 'temple', label: 'temple' },
    { value: 'beer', label: 'beer' },
    { value: 'tower', label: 'tower' },
    { value: 'music', label: 'music' },
  ];

  const colorStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      width: '250px',
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

  const fetchCountry = useCallback(async () => {
    const resCountry = await API.getAllCountry();
    setRootCountry(resCountry.data);
  }, [API.getAllCountry, setRootCountry]);

  useEffect(() => {
    fetchCountry();
  }, []);

  const handleSelectCountryAndCity = value => {
    const fetchCity = async () => {
      if (value) {
        console.log(value);
        form.setFieldsValue({ country: value.label });
        const resCity = await API.getCityOfCountry(value.value);
        console.log(resCity.data);
        setRootCity(resCity.data);
        form.setFieldsValue({ city: null });
      }
    };
    fetchCity();
  };

  const onChange = value => {
    console.log(value);
    setInputValue([value[0], value[1]]);
  };

  // const onChangeMin = value => {
  //   console.log(value);
  //   const [min, max] = inputValue;
  //   onChange([value, max]);
  // }
  // const onChangeMax = value => {
  //   console.log(value);
  //   const [min, max] = inputValue;
  //   onChange([min, value]);
  // }

  const onReset = () => {
    form.resetFields();
    setInputValue([500, 1000]);
  };

  return (
    <Wrapper className={className}>
      <Form form={form}>
        <Row justify="space-between">
          <Col span={12}>
            <Label>Filter by Tour</Label>
          </Col>
          <Col span={6}>
            <Button type="link" block onClick={onReset}>
              Clear
            </Button>
          </Col>
        </Row>
        <Form.Item noStyle name="tag">
          <Label>Tag</Label>
          <CreatableSelect
            placeholder="Select tag"
            isMulti
            closeMenuOnSelect={false}
            onChange={handleChange}
            options={tagOptions}
            styles={colorStyles}
          />
        </Form.Item>
        <Form.Item noStyle name="country">
          <Label>Country</Label>
          <Select
            labelInValue
            size="large"
            placeholder="Select Country"
            style={{ width: '250px' }}
            onChange={handleSelectCountryAndCity}
          >
            {rootCountry?.map(item => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item noStyle name="city">
          <Label>City</Label>
          <Select
            size="large"
            placeholder="Select City"
            style={{ width: '250px' }}
            onChange={value => ({
              city: value,
            })}
          >
            {rootCity?.map(item => (
              <Select.Option value={item.city_name} key={item.city_name}>
                {item.city_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item noStyle name="length">
          <Label>Tour length</Label>
          <Select
            size="large"
            placeholder="Select Tour length"
            style={{ width: '222px' }}
            onChange={value => ({
              length: value,
            })}
          >
            <Select.Option value={1} key={1}>
              1
            </Select.Option>
            <Select.Option value={2} key={2}>
              2
            </Select.Option>
            <Select.Option value={3} key={3}>
              3
            </Select.Option>
            <Select.Option value={4} key={4}>
              4
            </Select.Option>
            <Select.Option value={5} key={5}>
              5
            </Select.Option>
            <Select.Option value={6} key={6}>
              6
            </Select.Option>
            <Select.Option value={7} key={7}>
              7
            </Select.Option>
            <Select.Option value={8} key={8}>
              8
            </Select.Option>
            <Select.Option value={9} key={9}>
              9
            </Select.Option>
            <Select.Option value={10} key={10}>
              10
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item noStyle name="price">
          <Label>Tour price</Label>
          <Slider
            range
            step={100}
            defaultValue={[500, 1000]}
            min={100}
            max={1500}
            value={inputValue}
            onChange={onChange}
          />
          Min
          <InputNumber
            size="small"
            min={100}
            max={1500}
            style={{ margin: '0 5px', width: '30%' }}
            value={inputValue[0]}
            readOnly
            // onChange={onChangeMin}
          />
          Max
          <InputNumber
            size="small"
            min={100}
            max={1500}
            style={{ margin: '0 5px', width: '30%' }}
            value={inputValue[1]}
            readOnly
            // onChange={onChangeMax}
          />
        </Form.Item>
      </Form>
    </Wrapper>
  );
}

TourSearchPanel.propTypes = {
  className: PropTypes.string,
};

TourSearchPanel.defaultProps = {
  className: '',
};

export default TourSearchPanel;
