import axios from '../axios';
import { setAlert } from './alert';

import {
  COMPANY_PROFILE_ERROR,
  CLEAR_COMPANY_PROFILE,
  GET_COMPANY_PROFILES,
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
