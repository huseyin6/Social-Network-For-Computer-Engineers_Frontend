import axios from '../axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_COMPANY_PROFILE,
  VERIFICATION_FAIL,
  VERIFICATION_SUCCESS,
  GO_BACK,
  GO_BACK_FAIL,
  SET_CURRENT_EMAIL,
} from './types';

import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

export const setCurrentEmail = email => ({
  type: SET_CURRENT_EMAIL,
  payload: email,
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
    dispatch(setAlert("Invalid Verification Code", 'danger'));
    
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

export const goBack = async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

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
  dispatch({ type: GO_BACK});
};
