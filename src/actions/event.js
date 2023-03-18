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
        payload: { msg: err.response.statusText, status: err.response.status },//Look this part later
      });
    }
  };
  
  // Attend Event
  export const attendEvent = (id,userID) => async (dispatch) => {//Şu anki userın İD sini nasıl çekerim anlamadım
    console.log('Attend');
    try {
      const res = await axios.put(`/events/${id}/${userID}`);//Bu fonksiyon backenddeki events in attended bölümüne user ın id sini koyacak
  
      dispatch({
        type: UPDATE_ATTENDANCY,
        payload: { userID, attendances: res.data },//attendances içine bu payload ile id yi koyacak
      });
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