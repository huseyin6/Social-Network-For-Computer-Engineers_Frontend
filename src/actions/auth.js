import axios from '../axios';
import {
  // REGISTER_FAIL,
  // REGISTER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_FAIL_USER,
  REGISTER_COMPANY,
  REGISTER_COMPANY_FAIL,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_FAIL_COMPANY,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_COMPANY_PROFILE,
  VERIFICATION_FAIL,
  // VERIFICATION_SUCCESS,
  GO_BACK,
  GO_BACK_FAIL,
  SET_CURRENT_NAME,
  SET_CURRENT_PASSWORD,
  SET_CURRENT_EMAIL,
} from './types';

import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

export const setCurrentEmail = (email) => ({
  type: SET_CURRENT_EMAIL,
  payload: email,
});

export const setCurrentName = (name) => ({
  type: SET_CURRENT_NAME,
  payload: name,
});

export const setCurrentPassword = (password) => ({
  type: SET_CURRENT_PASSWORD,
  payload: password,
});

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await axios.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const verifyCode = (email, code) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, code });

  try {
    const response = await axios.post('/auth/verify', body, config);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setAuthToken(response.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });

      dispatch(loadUser());
    }
  } catch (error) {
    // Call setAlert function here
    dispatch(setAlert('Invalid Verification Code', 'danger'));

    dispatch({
      type: VERIFICATION_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post('/auth', body, config);

    dispatch({
      type: LOGIN,
      payload: response.status,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, 'danger'));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const response = await axios.post('/users', body, config);

      dispatch({
        type: REGISTER_USER,
        payload: response.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, 'danger'));
        });
      }

      dispatch({
        type: REGISTER_USER_FAIL,
      });
    }
  };

export const goBack = async (dispatch) => {
  try {
    dispatch({
      type: GO_BACK,
    });
  } catch (error) {
    dispatch({
      type: GO_BACK_FAIL,
    });
  }
};

export const registerComp =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      name,
      email,
      password,
    });

    try {
      const response = await axios.post('/users/company', body, config);

      dispatch({
        type: REGISTER_COMPANY,
        payload: response.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, 'danger'));
        });
      }

      dispatch({
        type: REGISTER_COMPANY_FAIL,
      });
    }
  };

// Verify User
export const verifyUser = (name, email, password, code) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    email,
    password,
    code,
  });

  try {
    const res = await axios.post('/users/verify-user', body, config);

    localStorage.setItem('token', res.data.token);
    setAuthToken(res.data.token);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert('Invalid Verification Code', 'danger'));
    dispatch({
      type: REGISTER_FAIL_USER,
      payload: err.response.data,
    });
  }
};

// Verify Company
export const verifyCompany =
  (name, email, password, code) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      name,
      email,
      password,
      code,
    });

    try {
      const res = await axios.post('/users/verify-company', body, config);
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      dispatch({
        type: REGISTER_COMPANY_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      dispatch(setAlert('Invalid Verification Code', 'danger'));
      dispatch({
        type: REGISTER_FAIL_COMPANY,
        payload: err.response.data,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_COMPANY_PROFILE });
  dispatch({ type: LOGOUT });
  dispatch({ type: GO_BACK });
};
