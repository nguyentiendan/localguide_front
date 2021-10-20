import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Modal, Form, Select, DatePicker, Button, Divider } from 'antd';
import { CompactPicker } from 'react-color';
import * as API from '../../../apis';

const styleWrapper = {
  form: {
    textAlign: 'right',
  },
  formButton: {
    marginRight: '8px',
  },
};

const useStyles = makeStyles(styleWrapper);

const AddEventModal = ({ show, handleCancel, uid, data }) => {  
  const [form] = Form.useForm();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState('#0062B1');
  const [tourDate, setTourDate] = useState([]);

  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY/MM/DD';

  const handleChangeColor = color => {
    setBackground(color.hex);
  };

  const handleChangeDate = (dateString) => {
    setTourDate(dateString);
  };

  const onFinish = async values => {
    if (loading) {
      return;
    }
    const { tourId } = values;
    // set color
    if (values.color === undefined) {
      var color = background;
    } else {
      var color = values.color.hex;
    }

    // set date
    if (values.eventDate === undefined) {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      var startDate = date + " 12:00:00";
      var endDate = date + " 12:00:00";
    } else {
      const start = new Date(tourDate[0]);
      const end = new Date(tourDate[1]);
      var startDate = `${start.getFullYear()}-${`0${start.getMonth() + 1}`.slice(-2)}-${`0${start.getDate()}`.slice(-2)}` + " 12:00:00";
      var endDate = `${end.getFullYear()}-${`0${end.getMonth() + 1}`.slice(-2)}-${`0${end.getDate()}`.slice(-2)}` + " 12:00:00";
    }

    try {
      setLoading(true);
      const { message, status } = await API.createTourEvent({
        uid,
        tourId,
        color,
        startDate,
        endDate,
      });
      // var status = true
      if (status === true) {
        Modal.info({
          title: 'Thank you',
          content: (
            <div>
              <p>Tour Event have create successful</p>
            </div>
          ),
          closable: false,
          keyboard: false,
          centered: true,
          okText: 'Close',
          onOk() {
            handleCancel();
          },
        });
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      //console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        title="Create Event"
        visible={show}
        centered="true"
        onCancel={handleCancel}
        style={{ width: '100%' }}
        footer={null}
      >
        <Form
          form={form}
          name="event"
          scrollToFirstError
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <span>Select tour to add event</span>
          <br />
          <Form.Item name="tourId" rules={[{ required: true, message: 'Please select tour!' }]}
          >
            <Select placeholder="Select tour" allowClear style={{ width: '400px' }}>
              {data &&
                data.map((d, index) => {
                  return (
                    <Select.Option value={d.id} key={index}>
                      {d.name} - {d.status === 1 ? 'Actived' : 'Not active'}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item>
            <span>Select color for event</span>
            <Form.Item name="color">
              <CompactPicker color={background} onChangeComplete={handleChangeColor} />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <span>Select date of event</span>
            <Form.Item name="eventDate">
              <RangePicker format={dateFormat} onChange={handleChangeDate} />
            </Form.Item>
          </Form.Item>

          <Divider />
          <Form.Item className={classes.form}>
            <Button key="cancel" onClick={handleCancel} className={classes.formButton}>
              Cancel
            </Button>
            <Button key="submit" type="primary" htmlType="submit">
              Add event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

AddEventModal.propTypes = {
  show: PropTypes.bool,
  handleCancel: PropTypes.func,
  uid: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,      
      name: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      maxPax: PropTypes.number,
      minPax: PropTypes.number,
    })
  ),  
};

AddEventModal.defaultProps = {  
  handleCancel: () => {}, 
};

export default AddEventModal;
