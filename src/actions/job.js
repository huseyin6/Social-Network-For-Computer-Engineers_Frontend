import axios from '../axios';
import { setAlert } from './alert';
import {
  ADVERTISE_JOB,
  GET_ADS,
  JOB_ERROR,
  DELETE_JOB,
  GET_APPLICANTS,
  GET_JOB,
} from './types';
import { GET_RECOMMENDED_JOBS, RECOMMENDATION_ERROR } from './types';
import {
  APPLY_JOB,
  ATTEND_JOB_ERROR,
  DECLINE_JOB,
  DECLINE_JOB_ERROR,
} from './types';

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
};

// Get recommended jobs
export const getRecommendedJobs = () => async (dispatch) => {
  try {
    const res = await axios.get('/job/recommendations');

    dispatch({
      type: GET_RECOMMENDED_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECOMMENDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Apply Job
export const applyJob = (id) => async (dispatch) => {
  console.log('Attending Job with id:', id);
  try {
    const res = await axios.put(`/job/apply/${id}`);
    console.log('Received response:', res.data);

    dispatch({
      type: APPLY_JOB,
      payload: { id, applicants: res.data },
    });
    dispatch(setAlert('Attended Job', 'success'));
  } catch (err) {
    console.error('Error:', err.response);
    // Check the error message and dispatch the setAlert action accordingly
    if (err.response.data.msg === 'Job has already been applied') {
      dispatch(setAlert('Job has already been applied', 'danger'));
    }
    dispatch({
      type: ATTEND_JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Attend Event
export const declineJob = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/job/decline/${id}`);
    console.log('Received response:', res.data);

    dispatch({
      type: DECLINE_JOB,
      payload: id,
    });
    dispatch(setAlert('Declined Job', 'danger'));
  } catch (err) {
    dispatch({
      type: DECLINE_JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

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
};
export const deleteJob = (id) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      await axios.delete(`/job/${id}`);
      dispatch({
        type: DELETE_JOB,
        payload: id,
      });
      dispatch(setAlert('Advertisement Removed', 'success'));
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
export const getApplicants = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/job/applicants/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_APPLICANTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getJob = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/job/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
