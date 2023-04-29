import React, { useState,setAlert ,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attendEvent } from '../../actions/event';
import 'animate.css';

const EventItem = ({
  role,
  attendEvent,
  event: {
    _id,
    title,
    description,
    image,
    date,
    location,
    attendees,
    capacity,
  },
}) => {
  const [alert, setAlert] = useState({ show: false, msg: '' });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        setAlert({ show: false, msg: '' });
      }, 3000);
    }
  }, [alert]);

  return (
    <div className='post2 bg-white p-1 my-1'>
      <div>
        <h4>{title}</h4>
      </div>
      <div className='container3'>
        <img className='img' src={image} alt='' />
        <div className='imgtext'>
          <h5>{date}</h5>
        </div>
        <div className='imgtext'>
          <h5>{location}</h5>
        </div>
      </div>

      <div className={`popup popup-${_id} animate__animated animate__fadeIn`}>
        <div className='popup-content'>
          <span
            className='close'
            onClick={() => {
              document.querySelector(`.popup-${_id}`).style.display = 'none';
            }}
          >
            &times;
          </span>
          <p>{description}</p>
          <p>Current Attendees: {attendees.length}/{capacity}</p>
        </div>
      </div>

      <button
        type='button'
        className='btn3 btn-light' width='%50'
        onClick={() => {
          document.querySelector(`.popup-${_id}`).style.display = 'block';
        }}
      >
        <i className='fas fa-question' />{' '}
      </button>


      {
        showPopup && (
          <div className="attended-popup animate__animated animate__fadeIn">
            Attended Event
          </div>
        )
      }

      {
        // Add a condition here to render the "Attend" button only for engineers
        role === 'engineer' && (
          <button
            class="btn2 btn2-white btn2-animate small text-primary"
            onClick={() =>
              attendEvent(_id, () => {
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
              })
            }
          >
            Attend
          </button>
        )
      }

      <div
        className={`alert-dialog animate__animated ${
          alert.show ? 'animate__fadeIn' : 'animate__fadeOut'
        }`}
      >
        {alert.msg}
      </div>
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  attendEvent: PropTypes.func.isRequired,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  role: state.auth.role,
});

export default connect(mapStateToProps, { attendEvent })(EventItem);
