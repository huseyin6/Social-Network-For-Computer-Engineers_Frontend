import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RegisterComp from './components/auth/RegisterComp';
import Dashboard from './components/dashboard/Dashboard';
import DashboardCompany from './components/dashboard/DashboardCompany';
import CreateProfile from './components/profile-forms/CreateProfile';
import CreateCompanyProfile from './components/profile-forms/CreateCompanyProfile';
import EditCompanyProfile from './components/profile-forms/EditCompanyProfile';
import Profiles from './components/profiles/Profiles';
import CompanyProfiles from './components/company-profiles/CompaniesProfiles';
import Profile from './components/profile/Profile';
import CompanyProfile from './components/profile/CompanyProfile';
import Questions from './components/questions/Questions';
import QuestionSearch from './components/questions/QuestionSearch';
import Question from './components/question/Question';
import Events from './components/events/Events';
import AddExperience from './components/profile-forms/AddExperience';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PostSearch from './components/posts/PostSearch';
import Videos from './components/videos/Videos';
import AddEducation from './components/profile-forms/AddEducation';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import AdvertiseJob from './components/job/AdvertiseJob';
import MyAdvertisements from './components/job/MyAdvertisements';
import AnimatedBackground from './AnimatedBackground';
import './App.css';
// import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import Alert from './components/layout/Alert';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import './Animatiions.css';
import Recommendations from './components/recommendations/Recommendations';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}



const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  /*   <Route exact path='/dashboardCompany' element={<PrivateRoute component={DashboardComp} />} />     Bu com. silinebilir */

  return (
    
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/registerComp' element={<RegisterComp />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/profiles' element={<Profiles />} />
            <Route path='/company-profile/:id' element={<CompanyProfile />} />
            <Route path='/company-profiles' element={<CompanyProfiles />} />
            <Route path='/questions/search/:key' element={<QuestionSearch />} />
            <Route path='/posts/search/:key' element={<PostSearch />} />
            <Route
              exact
              path='/dashboardCompany'
              element={<PrivateRoute component={DashboardCompany} />}
            />
            <Route 
              exact 
              path='/videos' 
              element={<PrivateRoute component={Videos} /> }
            />
            <Route
            exact
            path='/recommendations'
            element={<PrivateRoute component={Recommendations} />}
            />
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
              path='/create-company-profile'
              element={<PrivateRoute component={CreateCompanyProfile} />}
            />
            <Route
              exact
              path='/edit-profile'
              element={<PrivateRoute component={EditProfile} />}
            />
            <Route
              exact
              path='/edit-company-profile'
              element={<PrivateRoute component={EditCompanyProfile} />}
            />
            <Route
              exact
              path='/advertise-job'
              element={<PrivateRoute component={AdvertiseJob} />}
            />
            <Route
              exact
              path='/my-ads'
              element={<PrivateRoute component={MyAdvertisements} />}
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
              exact
              path='/events'
              element={<PrivateRoute component={Events} />}
            />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
