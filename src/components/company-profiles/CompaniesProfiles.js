import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCompanyProfiles } from '../../actions/companyProfile';
import CompanyProfileItem from './CompanyProfileItem';
import AnimatedSwitch from '../../AnimatedSwitch';
import { useNavigate } from 'react-router-dom';
const CompaniesProfiles = ({
  getCompanyProfiles,
  companyProfile: { companyProfiles, loading },
}) => {
  useEffect(() => {
    getCompanyProfiles();
  }, [getCompanyProfiles]);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  return (
    <AnimatedSwitch>
    <section className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Companies</h1>
            <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/company-profiles/search/${text}`);
              setText('');
            }}
            >
            <input
              className='my-input'
              type='text'
              value={text}
              placeholder='Search Companies'
              onChange={(e) => setText(e.target.value)}
            />
            <button type='submit' className='btn btn-primary my-1' ><i class="fa fa-search" aria-hidden="true"></i></button>
            </form>
            <br />
            <hr />
            <br />          
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
