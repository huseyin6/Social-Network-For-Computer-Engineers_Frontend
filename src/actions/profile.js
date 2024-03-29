import axios from '../axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_SCORE,
  GET_PROFILE_AND_SCORE,
} from './types';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editProfile =
  (formData, navigate) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/profile', formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert('Profile Updated' , 'success')
      );
      navigate('/dashboard');

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getProfileAndScore = (id) => async (dispatch) => {
  try {
    const profile = await axios.get(`/profile/user/${id}`);
    const score = await axios.get(`/profile/score/${id}`);
    dispatch({
      type: GET_PROFILE_AND_SCORE,
      payload: { profile: profile.data, score: score.data },
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getEngineerScore = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/score/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_SCORE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.statusText);
  }
};

export const scoreEngineer = (id, sc) => async (dispatch) => {
  const formData = { score: sc };
  try {
    const res = await axios.put(`/profile/score/${id}`, formData);
    getProfileAndScore(id);

    // const profile = await axios.get(`/profile/user/${id}`);
    // const score = await axios.get(`/profile/score/${id}`);
    // dispatch({
    //   type: GET_PROFILE_AND_SCORE,
    //   payload: { profile: profile.data, score: score.data },
    // });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addExperience =
  (formData, navigate) =>
  async (dispatch) => {
    try {
      const res = await axios.put('/profile/experience', formData);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert('Experience added', 'success'));

      navigate('/dashboard');

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const addEducation =
  (formData, navigate) =>
  async (dispatch) => {
    try {
      const res = await axios.put('/profile/education', formData);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert('Education added', 'success'));

      navigate('/dashboard');
      
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const deleteExperience = (id) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this experience')) {
    try {
      const res = await axios.delete(`/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert('Experience Removed', 'success'));
      
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this education?')) {
    try {
      const res = await axios.delete(`/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete your account? This can not be undone!'
    )
  ) {
    try {
      await axios.delete(`/profile`);

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });

      // dispatch(setAlert('Account deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
