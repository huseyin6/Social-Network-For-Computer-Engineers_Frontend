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
        <h4>{title}</h4>
        </div>
        <div class="container3">
        <img className='img' src={image} alt='' />
        <div class="imgtext">
        <h5>{date}</h5>
        </div>
        <div class="imgtext">
        <h5>{location}</h5>
        </div>
        </div>
        <button
        type='button'
        className='btn3 btn-light' width='%50'
        >
        <i className='fas fa-question' />{' '}
        </button>
        <a href="#" class="btn2 btn2-white btn2-animate small text-primary" onClick={attendEvent(_id)}>Attend</a>
    
      
      
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
