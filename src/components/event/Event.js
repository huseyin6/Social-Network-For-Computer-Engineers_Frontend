import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EventItem from '../events/EventItem'
import { getEvent } from '../../actions/event';

const Event = ({ getEvent, event: { event, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getEvent(id);
  }, [getEvent, id]);

  return loading || event === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <Link to='/events' className='btn'>
        Back To Events
      </Link>
      <EventItem event={event} showActions={false} />
    </section>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { getEvent })(Event);