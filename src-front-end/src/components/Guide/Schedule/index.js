import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Modal } from 'antd';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import useAuth from '../../../utils/useAuth';
import * as API from '../../../apis';

const Schedule = uid => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const calendarRef = React.createRef();

  const [currentEvents, setCurrentEvents] = useState([]);

  const [startDay, setStartDay] = useState();
  const [tour, setTour] = useState();
  const [calendarEvents, setCalendarEvents] = useState([
    {
      id:17,
      title: 'Atlanta Monster',
      //start: new Date('2021-08-10').toISOString().replace(/T.*$/, ''),
      //end: new Date('2021-08-12').toISOString().replace(/T.*$/, ''),
      start: '2021/08/10',
      end: '2021/08/12',
      color: '#cccccc',
      uid: '99999998',
    },
    {
      title: 'My Favorite Murder',
      start: new Date('2021-08-21').toISOString().replace(/T.*$/, ''),
      uid: '99999999',
    },
  ]);

  /* const handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  } */

  const handleDateSelect = selectInfo => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    console.log(calendarApi);
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setStartDay();
  };

  const addTourModal = e => {
    setShowModal(true);
    setStartDay(e.startStr);

    /* let calendarApi = e.view.calendar
    calendarApi.addEvent({
      id: createEventId(),
      tour,
      start: e.startStr,
      end: e.endStr,
      allDay: e.allDay
    }) */
  };

  const handleEventClick = clickInfo => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = events => {
    setCurrentEvents(events);
  };

  const onSelectTour = value => {
    setTour(value);
  };

  const onAddEvent = () => {
    // console.log(tour)
    // console.log(startDay)

    const arr = {
      title: tour,
      start: new Date(startDay).toISOString().replace(/T.*$/, ''),
      uid: '99999998',
    };

    calendarEvents.push(arr);
    setCalendarEvents(calendarEvents);

    const api = calendarRef.current.getApi();
    const calendarApi = api.view.calendar;

    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: createEventId(),
      tour,
      start: startStr,
      end: startStr,
      // allDay: e.allDay
    });

    console.log(calendarApi);

    /* let calendarApi = e.view.calendar
    calendarApi.addEvent({
      id: createEventId(),
      tour,
      start: e.startStr,
      end: e.endStr,
      allDay: e.allDay
    }) */

    setShowModal(false);
  };

  console.log(calendarEvents);

  return (
    <div style={{ justifyContent: 'center' }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        editable
        selectable
        selectMirror
        dayMaxEvents
        weekends
        // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        events={calendarEvents}
        // select={addTourModal}
        select={handleDateSelect}
        // eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        eventAdd={function(e) {
          console.log('EVENT ADD');
          console.log(e);
        }}

        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
      />
      <div>
        <Modal
          title="Add Tour"
          visible={showModal}
          okText="Add"
          onCancel={handleCancel}
          // onOk={onAddEvent}
          onOk={() => {
            form
              .validateFields()
              .then(values => {
                onAddEvent(values);
              })
              .catch(info => {
                // console.log('Validate Failed:', info);
              });
          }}
          style={{ width: 300 }}
        >
          <Form form={form} scrollToFirstError>
            <Form.Item>
              Start date : {startDay} <br />
              <Select
                placeholder="Select active tour and add schedule"
                onChange={onSelectTour}
                allowClear
              >
                <Select.Option value="Tour 1">Tour 1</Select.Option>
                <Select.Option value="Tour 2">Tour 2</Select.Option>
                <Select.Option value="Tour 3">Tour 3</Select.Option>
                <Select.Option value="Tour 4">Tour 4</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Schedule;

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
