import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  COMPANY_ACCOUNT_DELETED,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
} from '../actions/types';

const initalState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  role: '',
  isVerified: false,  
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        role: payload.role,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        role: '',
      };

    case COMPANY_ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        role: '',
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        role: payload.role,
        isVerified: payload.isVerified, // Update 'isVerified' when a user is loaded
      };

    case VERIFICATION_SUCCESS:
      return {
        ...state,
        isVerified: true,  // Set 'isVerified' to true when verification is successful
      };

    case VERIFICATION_FAIL:
      return {
        ...state,
        isVerified: false,  // Set 'isVerified' to false when verification fails
      };

    default:
      return state;
  }
}

