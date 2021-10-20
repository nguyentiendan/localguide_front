import React, { useState } from 'react';
import { Modal } from 'antd';
import FullCalendar,  { formatDate }  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PropTypes from 'prop-types';

const CalendarModal = ({ show, handleCancel, data, name }) => {
  const calendarRef = React.createRef();
  const [currentEvents, setCurrentEvents] = useState([]);
  
  const handleEvents = events => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div style={{paddingLeft:10}}>
        <b>{eventInfo.event.title}</b>
      </div>
    );
  }
  
  return (
    <div>
      <Modal
        title={name}
        visible={show}
        centered="true"
        onCancel={handleCancel}
        width={750}
        footer={null}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          initialView="dayGridMonth"
          selectMirror={true}
          dayMaxEvents={true}
          weekends
          events={data}
          eventContent={renderEventContent} // custom render function
          // eventClick={}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          contentHeight={450}
        />
      </Modal>
    </div>
  );
};

CalendarModal.propTypes = {
  show: PropTypes.bool,
  handleCancel: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      color: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      title: PropTypes.string,
      tourId: PropTypes.number,
    })
  ),
  name: PropTypes.string,  
};

CalendarModal.defaultProps = {  
  handleCancel: () => {}, 
};

export default CalendarModal;
