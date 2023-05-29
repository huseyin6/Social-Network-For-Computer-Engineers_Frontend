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

// Add this somewhere at the top of your file.
// You'll have to replace '/api/send-email' with your actual endpoint.
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const response = await axios.post('/api/send-email', {
      email,
      verificationCode,
    });
    console.log('Email sent successfully: ', response.data);
  } catch (error) {
    console.error('Failed to send verification email: ', error);
  }
};

// Then in your register function, you could define formData like this:
export const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const newUser = { name, email, password };
    const formData = newUser; // define formData here

    const body = JSON.stringify(newUser);

    try {
      const response = await axios.post('/users', body, config);
      console.log(response);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      dispatch(loadUser());
      // Generate verification code and send via email
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      sendVerificationEmail(formData.email, verificationCode);
      return Promise.resolve(response.data); // added line
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
      return Promise.reject(error); // added line
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
  
    const newComp = {
      name,
      email,
      password,
    };
  
    const body = JSON.stringify(newComp);
  
    try {
      const response = await axios.post('/users/company', body, config);
      console.log(response);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      dispatch(loadUser());
  
      // Generate verification code and send via email
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      sendVerificationEmail(newComp.email, verificationCode);
  
      return Promise.resolve(response.data);
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
      return Promise.reject(error);
    }
  };
  

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_COMPANY_PROFILE });
  dispatch({ type: LOGOUT });
};
