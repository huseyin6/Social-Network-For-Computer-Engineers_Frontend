import axios from 'axios';
import { GET_RECOMMENDED_JOBS, RECOMMENDATION_ERROR } from './types';

// Get recommended jobs
export const getRecommendedJobs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/job/recommendations');

    dispatch({
      type: GET_RECOMMENDED_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECOMMENDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};