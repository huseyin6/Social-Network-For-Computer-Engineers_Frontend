import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentCompany, deleteAccount } from '../../actions/companyProfile';
import Alert from '../layout/Alert';
import CompanyProfileTop from '../profile/CompanyProfileTop';
import Spinner from '../layout/Spinner';
import AnimatedSwitch from '../../AnimatedSwitch';
// import backgroundGif from '../../Background.gif';

const DashboardCompany = ({
  getCurrentCompany,
  deleteAccount,
  auth,
  companyProfile: { companyProfile, loading },
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentCompany();
      setIsLoading(false);
    };

    fetchData();
  }, [getCurrentCompany]);

  if (isLoading) {
    return (
      <AnimatedSwitch>
        <div className='container'>
          <h1 className='large text-primary'>Profile</h1>
          <p>Loading...</p>
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
            {companyProfile !== null ? (
              <Fragment>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  loading === false &&
                  auth.user._id === companyProfile.company._id && (
                    <Link to='/edit-company-profile' className='btn btn-white'>
                      <i className='fas fa-edit text-primary'></i> Edit Profile
                    </Link>
                  )}
                <div className='profile-grid my-1'>
                  <CompanyProfileTop companyProfile={companyProfile} />
                  <div className='profile-about bg-white p-2'>
                    {companyProfile.about && (
                      <Fragment>
                        <h2 className='text-primary'>About</h2>
                        <p>{companyProfile.about}</p>
                        <br />
                      </Fragment>
                    )}
                  </div>
                </div>
                {/* <div className='my-2'>
                  <button
                    onClick={() => deleteAccount()}
                    className='btn btn-danger'
                  >
                    <i className='fas fa-trash-alt text-light'></i> Delete
                    Account
                  </button>
                </div> */}
              </Fragment>
            ) : (
              <>
                <p>You have not yet setup a profile, please add some info</p>
                <Link
                  to='/create-company-profile'
                  className='btn btn-primary my-1'
                >
                  Create Profile
                </Link>
              </>
            )}
          </Fragment>
        )}
      </section>
    </AnimatedSwitch>
  );
};

DashboardCompany.propTypes = {
  getCurrentCompany: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  companyProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  companyProfile: state.companyProfile,
});

export default connect(mapStateToProps, { getCurrentCompany, deleteAccount })(
  DashboardCompany
);
