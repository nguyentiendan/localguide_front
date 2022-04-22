import React, { useState } from 'react';
import { Modal, message } from 'antd';
import FullCalendar,  { formatDate }  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PropTypes from 'prop-types';
import * as API from '../../../apis';

const AllEventModal = ({ show, handleCancel, data }) => {
  const [loading, setLoading] = useState(false);
  const calendarRef = React.createRef();
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleEvents = events => {
    setCurrentEvents(events);
  };

  const confirmDeleteEvent = info => {
    Modal.confirm({
      title: 'Confirmation',
      content: (
        <div>
          <p>Are you sure delete this event?</p>
          <p>
            Tour name:<b>{info.event.title} </b>
          </p>
          <p>            
            Date : {formatDate(info.event.startStr,{year: 'numeric', month: 'numeric', day: 'numeric'})} ~ {formatDate(info.event.endStr,{year: 'numeric', month: 'numeric', day: 'numeric'})}
          </p>
        </div>
      ),
      closable: true,
      centered: true,
      okText: 'Delete',
      onOk() {
        handleDeleteEvent(info);
      },
      onCancel() {},
    });
  };

  // Delete event
  const handleDeleteEvent = async info => {
    const { uid } = info.event.extendedProps;
    const { id } = info.event;
    setLoading(true);
    const { status } = await API.deleteEvent({ uid, id });
    if (status === true) {
      info.event.remove();
    }
    message.success('Delete success');
    setLoading(false);
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
          selectMirror={true}
          dayMaxEvents={true}
          weekends
          events={data}
          eventContent={renderEventContent} // custom render function
          eventClick={confirmDeleteEvent}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        />
      </Modal>
    </div>
  );
};

AllEventModal.propTypes = {
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
};

AllEventModal.defaultProps = {  
  handleCancel: () => {}, 
};

export default AllEventModal;
