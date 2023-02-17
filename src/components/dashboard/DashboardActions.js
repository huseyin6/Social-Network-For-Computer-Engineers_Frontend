import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { login } from '../../actions/auth';
import { Link } from 'react-router-dom';
// import { createProfile } from '../../actions/profile';
const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-edit text-primary'></i> Edit Profile
      </Link>
    </div>
  );
};
export default DashboardActions;
