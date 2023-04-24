import axios from '../axios';
import { setAlert } from './alert';

import {
  COMPANY_PROFILE_ERROR,
  CLEAR_COMPANY_PROFILE,
  GET_COMPANY_PROFILES,
  GET_COMPANY_PROFILE
} from './types';

export const getCompanyProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_COMPANY_PROFILE });

  try {
    const res = await axios.get('/companyprofile');
    // console.log('res', res.data);
    dispatch({
      type: GET_COMPANY_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getCurrentCompany = () => async (dispatch) => {
  console.log("profile exists");
  try {
    const res = await axios.get('/companyprofile/us');
    console.log(res.data); 
    dispatch({
      type: GET_COMPANY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/companyprofile', formData, config);

      dispatch({
        type: GET_COMPANY_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );
      if (!edit) {
        navigate('/dashboardCompany');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: COMPANY_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const deleteAccount = (id) => async (dispatch) => {
 
};
export const getCompanyById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/companyprofile/company/${id}`);
    dispatch({
      type: GET_COMPANY_PROFILE,
      payload: res.data,
    });

  } catch (err) {
    dispatch({
      type: COMPANY_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

