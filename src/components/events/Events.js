import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventItem from './EventItem';
import { getEvents } from '../../actions/event';

const Events = ({ getEvents, event: { events } }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);
  return (
    <section className='eventcontainer'>
      <h1 className='large text-primary'>Events</h1>
      <div className='posts'>
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { getEvents })(Events);
