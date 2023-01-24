import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Alert from '../layout/Alert';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section className='container'>
      <Alert/>
      <h1 className='large text-primary'>Dashboard</h1>
      <h2 className='my-1 '>
       {user && user.name}
      </h2>
      {profile !== null ? (
        <>
          <DashboardActions /><br/>
          <p className='medium my-1'>Experience <Link to="/add-experience" className="btn btn-light">
         <i className='fas fa-plus text-primary'></i  ></Link></p>
          <Experience experience={profile.experience} />
          <p className='medium my-1'>Education <Link to="/add-education" className="btn btn-light">
         <i className='fas fa-plus text-primary'></i  ></Link></p>
          <Education education={profile.education} />

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
             Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
