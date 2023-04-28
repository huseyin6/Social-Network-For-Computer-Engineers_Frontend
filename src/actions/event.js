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