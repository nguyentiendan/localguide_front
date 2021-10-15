import React, { useState, } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Form, message,} from 'antd';
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

const EventModal = ({ show, handleCancel, data}) => {  
  const [loading, setLoading] = useState(false);
  const calendarRef = React.createRef();
  const [currentEvents, setCurrentEvents] = useState([]);
  
  const handleEvents = events => {
    setCurrentEvents(events);
  };
  
  const confirmDeleteEvent = (info) => {            
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
      okText: 'Delete',
      onOk() {        
        handleDeleteEvent(info)        
      },
      onCancel() {},
    });
  };

  //Delete event
  const handleDeleteEvent = async (info) => {    
    var uid = info.event.extendedProps.uid
    var id =  info.event.id
    setLoading(true);
    const { status } = await API.deleteEvent({ uid, id });    
    if (status === true) {
      info.event.remove();
    }
    message.success('Delete success');
    setLoading(false);
  };

  return (
    <div>
      <Modal
        title="All Event of Tour"
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
          selectMirror
          dayMaxEvents
          weekends
          events={data}
          eventClick={confirmDeleteEvent}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed                    
        />
      </Modal>      
    </div>
    
  );
};

export default EventModal;
