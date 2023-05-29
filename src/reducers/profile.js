import {
  GET_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GET_SCORE,
  GET_PROFILE_AND_SCORE,
  SEARCH_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
  engineerScore: null,
  searchResults: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
      case SEARCH_PROFILE:
      return {
        ...state,
        searchResults: payload,
        loading: false,
      };
    case GET_SCORE:
      return {
        ...state,
        engineerScore: payload,
        profile: null,
      };
    case GET_PROFILE_AND_SCORE:
      return {
        ...state,
        engineerScore: payload.score,
        profile: payload.profile,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        repos: [],
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
