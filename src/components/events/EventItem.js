import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { CopyBlock } from 'react-code-blocks';
import { attendEvent } from '../../actions/event';

const EventItem = ({
  auth,
  attendEvent,
  event: {
    _id,
    title,
    description,
    image,
    date,
    location,
    attendees,
  },
}) => (
  <div className='post2 bg-white p-1 my-1'>
    <div>
    
      
        <img className='round-img' src={image} alt='' />
        <h4>{title}</h4>
        <button
        type='button'
        className='btn2 btn-light' width='%50'
        >
        <i className='fas fa-question' />{' '}
      
        </button>
        <a href="#" class="btn2 btn2-white btn2-animate small text-primary" /*onClick={attendEvent(id,userID)}*/>Attend</a>
    
      
      
    </div>
  </div>
);

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  attendEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { attendEvent })(
  EventItem
);
