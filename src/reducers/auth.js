import {
  REGISTER_USER_SUCCESS,
  REGISTER_FAIL_USER,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_FAIL_COMPANY,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN,
  ACCOUNT_DELETED,
  COMPANY_ACCOUNT_DELETED,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  SET_CURRENT_EMAIL,
  GO_BACK,
  GO_BACK_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_COMPANY,
  SET_CURRENT_NAME,
  SET_CURRENT_PASSWORD,
  REGISTER_COMPANY_FAIL,
} from '../actions/types';

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
  role: '',
  isVerified: null,  
  currentEmail: '',
  isCodeSent:false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        isCodeSent: true,
        isAuthenticated: false,
        isVerified: false,
        role:'engineer',
        ...payload,
      };

    case REGISTER_USER_FAIL:
      return{
        ...state,
        ...payload,

      }

      case SET_CURRENT_NAME:
        console.log("Reducer received SET_CURRENT_NAME with payload: ", payload); // Debugging line
        return {
          ...state,
          currentName: payload,
        };

        case SET_CURRENT_PASSWORD:
          console.log("Reducer received SET_CURRENT_PASSWORD with payload: ", payload); // Debugging line
          return {
            ...state,
            currentPassword: payload,
          };

      case REGISTER_COMPANY:
        return {
          ...state,
          isCodeSent: true,
          isAuthenticated: false,
          role:'company',
          ...payload,
        };
  
      case REGISTER_COMPANY_FAIL:
        return{
          ...state,
          ...payload,
  
        }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isVerified: true,
        loading: false,
        role: payload.role,
      };
      case REGISTER_COMPANY_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          isVerified: true,
          loading: false,
          role: payload.role,
        };
    case LOGIN:
      return {
      ...state,
      isCodeSent: true,
      isAuthenticated: false,
      
      ...payload,
    };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        role: payload.role,
      };
    case GO_BACK:
      return {
        ...state,
        isCodeSent:false,
      };
    case GO_BACK_FAIL:
    case REGISTER_FAIL_USER:
      return {
        ...state,
        isVerified: false, 
      };
      case REGISTER_FAIL_COMPANY:
        return {
          ...state,
          isVerified: false, 
        };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
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
          isVerified: true,
          currentEmail: payload.currentEmail, 
        };
    case VERIFICATION_SUCCESS:
      return {
        ...state,
        isVerified: true, 
      };
 
    case VERIFICATION_FAIL:
      return {
        ...state,
        isVerified: false, 
      };
    case SET_CURRENT_EMAIL:
      console.log("Reducer received SET_CURRENT_EMAIL with payload: ", payload); // Debugging line
      return {
        ...state,
        currentEmail: payload,
      };
    default:
      return state;
  }
}
