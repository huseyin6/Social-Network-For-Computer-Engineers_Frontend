import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <section className='landing'>
        <div className='landing-inner'>
          <h1 className='x-large'>C Cube</h1>
          <p className='lead'>Connect-Communicate-Collaborate</p>
          <p className='lead'>
            Create your profile, share posts<br/> and get help from
            other engineers
          </p>
          <div className='buttons'>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
          </div>
        </div>

    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
