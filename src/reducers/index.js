import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import question from './question';
import event from './event';
import companyProfile from './companyProfile';
import job from './job';
export default combineReducers({
  alert,
  auth,
  profile,
  post,
  question,
  event,
  companyProfile,
  job,
});
