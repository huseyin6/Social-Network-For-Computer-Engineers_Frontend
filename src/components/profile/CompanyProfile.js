import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCompanyById, deleteAccount } from '../../actions/companyProfile';
import { Link, useParams } from 'react-router-dom';
import CompanyProfileTop from '../profile/CompanyProfileTop';

const CompanyProfile = ({ getCompanyById, deleteAccount, companyProfile: { companyProfile, loading}, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getCompanyById(id);
    }, [getCompanyById, id]);
  console.log(companyProfile);
  return (
    <section className='container2'>
      {companyProfile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          {auth.isAuthenticated &&
            auth.loading === false &&
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
        </Fragment>
      )}
    </section>
  );
};

CompanyProfile.propTypes = {
  getCompanyById: PropTypes.func.isRequired,
  companyProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount:  PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
companyProfile: state.companyProfile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCompanyById, deleteAccount })(CompanyProfile);
