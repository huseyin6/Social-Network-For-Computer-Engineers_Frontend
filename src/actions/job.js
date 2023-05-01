import axios from '../axios';
import { setAlert } from './alert';
import { ADVERTISE_JOB, GET_ADS, JOB_ERROR } from './types';
export const advertiseJob = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        const res = await axios.post('/job', formData);
    
        dispatch({
          type: ADVERTISE_JOB,
          payload: res.data,
        });
    
        dispatch(setAlert('Job Advertisement is given', 'success'));
      } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
          type: JOB_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
    } 
}
export const getAds = () => async (dispatch) => {
    try {
        const res = await axios.get('/job/myads');
        console.log(res.data);
        dispatch({
          type: GET_ADS,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: JOB_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
    } 
}
