import {
    GET_EVENTS,
    EVENT_ERROR,
    UPDATE_ATTENDANCY,
    GET_EVENT,
  } from '../actions/types';
  
  const initialState = {
    events: [],
    event: null,
    loading: true,
    error: {},
  };
  
  function eventReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_EVENTS:
        return {
          ...state,
          events: payload,
          loading: false,
        };
      case GET_EVENT:
        return {
          ...state,
          event: payload,
          loading: false,
        };
      case EVENT_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case UPDATE_ATTENDANCY:
        return {
          ...state,
          events: state.events.map((event) =>
            event._id === payload.id
              ? { ...event, attendances: payload.attendances }
              : event
          ),
          loading: false,
        };
      default:
        return state;
    }
  }
  
  export default eventReducer;