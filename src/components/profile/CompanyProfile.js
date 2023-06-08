import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCompanyById } from '../../actions/companyProfile';
import { Link, useParams } from 'react-router-dom';
import CompanyProfileTop from '../profile/CompanyProfileTop';
import PageNotFound from '../layout/PageNotFound';
import AnimatedSwitch from '../../AnimatedSwitch';

const CompanyProfile = ({ getCompanyById,  companyProfile: { companyProfile, loading}, auth }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getCompanyById(id);
      setIsLoading(false);
    };
    fetchData();
  }, [getCompanyById, id]);

  console.log(companyProfile);
  if (isLoading) {
    return (
      <AnimatedSwitch>
        <div className='container2'>
          <Spinner/>
        </div>
      </AnimatedSwitch>
    );
  }
  return (
    <section className='container2'>
      {companyProfile === null ? (
        <PageNotFound/>
      ) : (
        <Fragment>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === companyProfile.company._id && (
              <Link to='/edit-company-profile' className='btn btn-dark'>
                Edit Profile
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

};

const mapStateToProps = (state) => ({
companyProfile: state.companyProfile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCompanyById })(CompanyProfile);
