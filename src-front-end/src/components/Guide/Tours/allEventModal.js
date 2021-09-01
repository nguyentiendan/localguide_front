import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Form, Select, DatePicker, Button, Popconfirm,} from 'antd';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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

const AllEventModal = ({ show, handleCancel, uid, data}) => {
  const [form] = Form.useForm();  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const calendarRef = React.createRef();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  
  const handleEvents = events => {
    setCurrentEvents(events);
  };
  
  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleEventClick = clickInfo => {
    //if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //  clickInfo.event.remove();
    //}
  };
  
  const confirmDeleteEvent = async (info) => {        
    var uid = info.event.extendedProps.uid
    var id =  info.event.id
    Modal.confirm({
      title: 'Confirmation',
      content: (
        <div>
          <p>Are you sure delete this event?</p>  
          <p>Tour name:<b>{info.event.title} </b></p>
          <p>Date : {info.event.startStr}~{info.event.endStr}</p>
        </div>
      ),
      closable: true,
      centered: true,
      okText: 'OK',
      onOk() {        
        /*setLoading(true);
        const { status } = await API.deleteEvent({ uid, id });
        if (status === true) {
          info.event.remove();
        }
        message.success('Delete success');
        setLoading(false);*/
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <Modal
        title="All Event of all Tour"
        visible={show}
        centered="true"
        onCancel={handleCancel}                       
        width={750}
        footer={null}        
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          //editable
          //selectable
          selectMirror
          dayMaxEvents
          weekends
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          events={data}
          //select={handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          //eventClick={handleEventClick}
          eventClick={confirmDeleteEvent}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed          
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </Modal>      
    </div>
    
  );
};

export default AllEventModal;
