import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Select, Spin, message } from 'antd';
import UploadPassport from '../../Input/UploadPassport';
import * as API from '../../../apis';

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  && {
    .ant-form-item {
      width: 100%;
    }
  }
`;

const formItemLayout = {
  labelCol: {
    xs: {
      // mobile
      span: 24,
    },
    sm: {
      // pc
      span: 6, // label size
    },
  },
  wrapperCol: {
    xs: {
      // mobile
      span: 24,
    },
    sm: {
      // pc
      span: 12, // input box size
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      // mobile
      span: 24,
      offset: 5,
    },
    sm: {
      // pc
      span: 24,
      offset: 10,
    },
  },
};

const { Option } = Select;

function GuideOtherInfo({ uid }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [toggle, setToggle] = useState(false);
  const [photo, setPhoto] = useState();

  const fetchBankInfo = async () => {
    setLoading(true);
    const res = await API.getBankInfo(uid);
    setInfo(res.data);
    if (res.data.id == 0) {
      setToggle(true);
    }
    if (res.data.passport == '') {
      setPhoto('');
      // setPhoto([{photo:''}] )
    } else {
      // setPhoto([{photo:res.data.passport}] )
      setPhoto(res.data.passport);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBankInfo();
  }, []);

  const onFinishOther = async values => {
    setLoading(true);
    const key = 'updatable';

    if (loading) {
      return;
    }
    try {
      if (info.id == 0) {
        const { status } = await API.createBank({
          ...values,
          uid,
        });
        if (status == true) {
          message.success({
            content: 'Your bank info has been created !',
            key,
            duration: 2,
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
          });
        }
      } else {
        const { status } = await API.updateBank({
          ...values,
          uid,
        });
        if (status == true) {
          message.success({
            content: 'Update successful !',
            key,
            duration: 2,
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <FormWrapper
          form={form}
          {...formItemLayout}
          name="other"
          onFinish={onFinishOther}
          scrollToFirstError
        >
          <Form.Item style={{ justifyContent: 'center', paddingTop: '20px', paddingBottom: '0px' }}>
            <h2>Other Info</h2>
          </Form.Item>

          <Form.Item
            name="bankname"
            label="Bank name"
            key={info.bankname === '' ? 'bank' : info.bankname}
            initialValue={info.bankname}
            rules={[
              {
                required: true,
                message: 'Please select your bank!',
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Bank name"
              style={{ width: '200px' }}
              onChange={value => {
                form.setFieldsValue({ bankname: value });
              }}
              allowClear
            >
              <Select.Option value="UFJ">UFJ</Select.Option>
              <Select.Option value="SMBC">SMBC</Select.Option>
              <Select.Option value="Mizuho">Mizuho</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="branchname"
            label="Branch name"
            rules={[
              {
                required: true,
                message: 'Please input branch of bank!',
              },
            ]}
            key={info.branchname === '' ? 'branch' : info.branchname}
            initialValue={info.branchname}
          >
            <Input placeholder="Branch name" size="large" allowClear />
          </Form.Item>

          <Form.Item
            name="account"
            label="Account number"
            rules={[
              {
                required: true,
                message: 'Please input your account number!',
              },
            ]}
            key={info.account === '' ? 'account' : info.account}
            initialValue={info.account}
          >
            <Input
              placeholder="Account number"
              size="large"
              allowClear
              style={{ width: '200px' }}
              maxLength="9"
            />
          </Form.Item>

          <Form.Item name="passport" label="Passport or ID card">
            <UploadPassport uid={uid} passport={photo} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              size="middle"
              type="primary"
              htmlType="submit"
              style={{ alignContent: 'center' }}
            >
              {toggle === true ? 'Add bank info' : 'Update Info'}
            </Button>
          </Form.Item>
        </FormWrapper>
      </Spin>
    </div>
  );
}

GuideOtherInfo.propTypes = {};

export default GuideOtherInfo;
