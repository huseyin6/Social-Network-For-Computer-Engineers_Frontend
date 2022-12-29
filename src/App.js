import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import Alert from './components/layout/Alert';
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
          <Alert />
          <section className='container'>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route exact path='/dashboard' element={<PrivateRoute Component={Dashboard} />} />  
              <Route exact path='/create-profile' element={<PrivateRoute Component={CreateProfile} />} /> 
              <Route exact path='/edit-profile' element={<PrivateRoute Component={EditProfile} />} />   
              <Route exact path='/add-experience' element={<PrivateRoute Component={AddExperience} />} />  
              <Route exact path='/add-education' element={<PrivateRoute Component={AddEducation} />} />  
            </Routes>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
