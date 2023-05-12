import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCompanyProfiles } from '../../actions/companyProfile';
import CompanyProfileItem from './CompanyProfileItem';
import AnimatedSwitch from '../../AnimatedSwitch';

const CompaniesProfiles = ({
  getCompanyProfiles,
  companyProfile: { companyProfiles, loading },
}) => {
  useEffect(() => {
    getCompanyProfiles();
  }, [getCompanyProfiles]);

  // console.log('LOG: COMPANIES:', profiles);
  return (
    <AnimatedSwitch>
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
              <Spinner />
            )}
          </div>
        </Fragment>
      )}
    </section>
    </AnimatedSwitch>
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
