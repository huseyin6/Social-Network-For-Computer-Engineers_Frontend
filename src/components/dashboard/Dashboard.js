import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Experience from '../profile/Experience';
import Education from '../profile/Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Alert from '../layout/Alert';
import ProfileTop from '../profile/ProfileTop';
import ProfileAbout from '../profile/ProfileAbout';
import Spinner from '../layout/Spinner';
import AnimatedSwitch from '../../AnimatedSwitch';
// import backgroundGif from '../../Background.gif';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth,
  profile: { profile, loading },
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfile();
      setIsLoading(false);
    };

    fetchData();
  }, [getCurrentProfile]);

  if (isLoading) {
    return (
      <AnimatedSwitch>
        <div className='container'>
        <Spinner/>
        </div>
      </AnimatedSwitch>
    );
  }

  return (
    <AnimatedSwitch>
      <section className='container2'>
        <Alert />
        {loading === true ? (
          <Spinner />
        ) : (
          <Fragment>
            {profile !== null ? (
              <Fragment>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Link to='/edit-profile' className='btn btn-white'>
                      <i className='fas fa-edit text-primary'></i> Edit Profile
                    </Link>
                  )}
                <div className='profile-grid my-1'>
                  <ProfileTop profile={profile} />
                  <ProfileAbout profile={profile} />
                  <div className='profile-exp bg-white p-2'>
                    <h2 className='text-primary'>
                      Experience {''}
                      {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                          <Link to='/add-experience' className='btn btn-light'>
                            <i className='fas fa-plus text-primary'></i>
                          </Link>
                        )}
                    </h2>
                    {profile.experience.length > 0 ? (
                      <Fragment>
                        {profile.experience.map((experience) => (
                          <Experience
                            key={experience._id}
                            experience={experience}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <h4>No experience credentials</h4>
                    )}
                  </div>

                  <div className='profile-edu bg-white p-2'>
                    <h2 className='text-primary'>
                      Education {''}
                      {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                          <Link to='/add-education' className='btn btn-light'>
                            <i className='fas fa-plus text-primary'></i>
                          </Link>
                        )}
                    </h2>
                    {profile.education.length > 0 ? (
                      <Fragment>
                        {profile.education.map((education) => (
                          <Education
                            key={education._id}
                            education={education}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <h4>No education credentials</h4>
                    )}
                  </div>
                </div>
                 <div className='my-2'>
                  <button
                    onClick={() => deleteAccount()}
                    className='btn btn-danger'
                  >
                    <i className='fas fa-trash-alt text-light'></i> Delete
                    Account
                  </button>
                </div> 
              </Fragment>
            ) : (
              <div className='container'>
                <div className='text-center'>
                <p className='larger'>Please create a profile first</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                  Create Profile
                </Link>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </section>
    </AnimatedSwitch>
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
