import {
    GET_QUESTIONS,
    QUESTION_ERROR,
    UPDATE_LIKES,
    DELETE_QUESTION,
    ADD_QUESTION,
    GET_QUESTION,
    ADD_COMMENT,
    REMOVE_COMMENT,
  } from '../actions/types';
  
  const initialState = {
    questions: [],
    question: null,
    loading: true,
    error: {},
  };
  
  function questionReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_QUESTIONS:
        return {
          ...state,
          questions: payload,
          loading: false,
        };
      case GET_QUESTION:
        return {
          ...state,
          question: payload,
          loading: false,
        };
      case ADD_QUESTION:
        return {
          ...state,
          questions: [payload, ...state.questions],
          loading: false,
        };
      case DELETE_QUESTION:
        return {
          ...state,
          questions: state.questions.filter(
            (question) => question._id !== payload
          ),
          loading: false,
        };
      case QUESTION_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case UPDATE_LIKES:
        return {
          ...state,
          questions: state.questions.map((question) =>
            question._id === payload.id
              ? { ...question, likes: payload.likes }
              : question
          ),
          loading: false,
        };
      case ADD_COMMENT:
        return {
          ...state,
          question: { ...state.question, comments: payload },
          loading: false,
        };
      case REMOVE_COMMENT:
        return {
          ...state,
          question: {
            ...state.question,
            comments: state.question.comments.filter(
              (comment) => comment._id !== payload
            ),
          },
          loading: false,
        };
      default:
        return state;
    }
  }
  
  export default questionReducer;