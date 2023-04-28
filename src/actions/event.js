import axios from '../axios';
import { setAlert } from './alert';
import {
  GET_EVENTS,
  EVENT_ERROR,
  UPDATE_ATTENDANCY,
  GET_EVENT,
} from './types';

// Get events
export const getEvents = () => async (dispatch) => {
    try {
      const res = await axios.get('/events');
      dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  
// Attend Event
export const attendEvent = (id) => async (dispatch) => {
  console.log('Attending event with ID:', id);
  try {
    const res = await axios.put(`/events/attend/${id}`);
    console.log('Received response:', res.data);

    dispatch({
      type: UPDATE_ATTENDANCY,
      payload: { id, attendees: res.data },
    });
    dispatch(setAlert('Attended Event', 'success'));
  } catch (err) {
    console.error('Error:', err.response);
    // Check the error message and dispatch the setAlert action accordingly
    if (err.response.data.msg === 'You Have Already Attended This Event') {
      dispatch(setAlert('You Have Already Attended This Event', 'danger'));
    } else if (err.response.data.msg === 'Event Is Full') {
      dispatch(setAlert('Event Is Full', 'danger'));
    }

    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
  
  
  // Get event
  export const getEvent = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`/events/${id}`);//Eventsten o eventi çek
  
      dispatch({
        type: GET_EVENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };