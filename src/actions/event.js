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
  export const attendEvent = (id) => async (dispatch) => {//Şu anki userın İD sini nasıl çekerim anlamadım
    console.log('het');
    try {
      const res = await axios.put(`/events/attend/${id}`);//Bu fonksiyon backenddeki events in attend bölümüne user ın id sini koyacak
      dispatch({
        type: UPDATE_ATTENDANCY,
        payload: { id, attendees: res.data },//attendees içine id yi koyacak
      });
      dispatch(setAlert('Question Removed', 'success'));
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },//Eğer event konulurken hata verirse 
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