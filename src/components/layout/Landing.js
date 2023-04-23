import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/*import axios from 'axios';*/

const Landing = ({ isAuthenticated, role }) => {
  if (isAuthenticated && role === 'engineer') {
    // console.log('LOG: Role:', role);
    return <Navigate to='/dashboard' />;
  }

  if (isAuthenticated && role === 'company') {
    // console.log('LOG: Role:', role);
    return <Navigate to='/dashboardCompany' />;
  }

  return (
    <section className='landing'>
      <div className='landing-inner'>
        <h1 className='x-large'>C Cube</h1>
        <p className='lead'>Connect-Communicate-Collaborate</p>
        <p className='lead'>
          Create your profile, share posts
          <br /> and get help from other engineers
        </p>
        <br />
        <div className='buttons'>
          <Link to='/login' className='btn btn-light'>
            Login
          </Link>
          <Link to='/register' className='btn btn-primary'>
            Sign Up
          </Link>
          <Link to='/registerComp' className='btn btn-primary'>
            Sign Up For Company
          </Link>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps)(Landing);
