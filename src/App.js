import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
<<<<<<< Updated upstream
=======
import Questions from './components/questions/Questions';
import Question from './components/question/Question';
import Events from './components/events/Events';
import Event from './components/event/Event';
>>>>>>> Stashed changes
import AddExperience from './components/profile-forms/AddExperience';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import AddEducation from './components/profile-forms/AddEducation';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
// import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/profiles' element={<Profiles />} />
            <Route
              exact
              path='/dashboard'
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              exact
              path='/create-profile'
              element={<PrivateRoute component={CreateProfile} />}
            />
            <Route
              exact
              path='/edit-profile'
              element={<PrivateRoute component={EditProfile} />}
            />
            <Route
              exact
              path='/add-experience'
              element={<PrivateRoute component={AddExperience} />}
            />
            <Route
              exact
              path='/add-education'
              element={<PrivateRoute component={AddEducation} />}
            />
            <Route
              exact
              path='/posts'
              element={<PrivateRoute component={Posts} />}
            />
            <Route
              path='posts/:id'
              element={<PrivateRoute component={Post} />}
            />
<<<<<<< Updated upstream
=======
            <Route
              exact
              path='/questions'
              element={<PrivateRoute component={Questions} />}
            />
            <Route
              path='questions/:id'
              element={<PrivateRoute component={Question} />}
            />
            <Route
              path='events'
              element={<PrivateRoute component={Events} />}
            />
            <Route
              path='events/:id'
              element={<PrivateRoute component={Event} />}
            />
>>>>>>> Stashed changes
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
