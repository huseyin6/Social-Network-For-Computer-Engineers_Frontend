import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attendEvent } from '../../actions/event';

const EventItem = ({
  attendEvent,
  event: {
    _id,
    title,
    description,
    image,
    date,
    location,
    attendees,
  
  }
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
        
        <div className='popup'>
          <div className='popup-content'>
            <span className='close' onClick={() => {
              document.querySelector('.popup').style.display = 'none';
            }}>&times;</span>
              <p>{description}</p>
          </div>
        </div>

        <button
        type='button'
        className='btn3 btn-light' width='%50'
        onClick={() => {
          document.querySelector('.popup').style.display = 'block';
        }}
        >
        <i className='fas fa-question' />{' '}
        </button>
        
        <button class="btn2 btn2-white btn2-animate small text-primary" onClick={attendEvent(_id)}>Attend</button>
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
