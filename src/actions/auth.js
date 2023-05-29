import axios from '../axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_COMPANY_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

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
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post('/auth', body, config);
    // console.log('LOGIN RES:', response.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
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


export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const response = await axios.post('/api/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, 'danger'));
      });
    }

    dispatch({
      type: REGISTER_FAIL,
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
    const response = await axios.post('/api/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, 'danger'));
      });
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

  

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_COMPANY_PROFILE });
  dispatch({ type: LOGOUT });
};
