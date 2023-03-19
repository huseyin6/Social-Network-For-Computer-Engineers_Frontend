import axios from '../axios';
import { setAlert } from './alert';
import {
  GET_QUESTIONS,
  QUESTION_ERROR,
  UPDATE_LIKES,
  DELETE_QUESTION,
  ADD_QUESTION,
  GET_QUESTION,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// Get questions
export const getQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get('/questions');
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  console.log('het');
  try {
    const res = await axios.put(`/questions/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete question
export const deleteQuestion = (id) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this question?')) {
  try {
    await axios.delete(`/questions/${id}`);

    dispatch({
      type: DELETE_QUESTION,
      payload: id,
    });

    dispatch(setAlert('Question Removed', 'success'));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
};

// Add question
export const addQuestion = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const res = await axios.post('/questions', formData);

    dispatch({
      type: ADD_QUESTION,
      payload: res.data,
    });

    dispatch(setAlert('Question Created', 'success'));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get question
export const getQuestion = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/questions/${id}`);

    dispatch({
      type: GET_QUESTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (questionId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/questions/comment/${questionId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (questionId, commentId) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this comment?')) {
  try {
    await axios.delete(`/questions/comment/${questionId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
};
