import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCompanyProfiles } from '../../actions/companyProfile';
import CompanyProfileItem from './CompanyProfileItem';

const CompaniesProfiles = ({
  getCompanyProfiles,
  companyProfile: { companyProfiles, loading },
}) => {
  useEffect(() => {
    getCompanyProfiles();
  }, [getCompanyProfiles]);

  // console.log('LOG: COMPANIES:', profiles);
  return (
    <section className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Companies</h1>
          <div className='profiles'>
            {companyProfiles.length > 0 ? (
              companyProfiles.map((companyProfile) => (
                <CompanyProfileItem
                  key={companyProfile._id}
                  companyProfile={companyProfile}
                />
              ))
            ) : (
              <h4>No componies found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

CompaniesProfiles.propTypes = {
  getCompanyProfiles: PropTypes.func.isRequired,
  companyProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyProfile: state.companyProfile,
});

export default connect(mapStateToProps, { getCompanyProfiles })(
  CompaniesProfiles
);