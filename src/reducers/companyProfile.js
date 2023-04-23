import {
  CLEAR_COMPANY_PROFILE,
  COMPANY_PROFILE_ERROR,
  GET_COMPANY_PROFILES,
} from '../actions/types';

const initialState = {
  companyProfile: null,
  companyProfiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANY_PROFILES:
      return {
        ...state,
        companyProfiles: payload,
        loading: false,
      };
    case COMPANY_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        companyProfile: null,
      };
    case CLEAR_COMPANY_PROFILE:
      return {
        ...state,
        companyProfile: null,
        loading: false,
      };
    default:
      return state;
  }
}
