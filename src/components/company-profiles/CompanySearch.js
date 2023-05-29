import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { searchCompanies } from '../../actions/companyProfile';
import CompanyProfileItem from './CompanyProfileItem';
import AnimatedSwitch from '../../AnimatedSwitch';
import { useNavigate, useParams } from 'react-router-dom';

const CompanySearch = ({ searchCompanies, companyProfile: { searchResults, loading } }) => {
    const {key} = useParams();
  useEffect(() => {
    searchCompanies(key);
  }, [searchCompanies, key]);
  const [text, setText] = useState(key);
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
            {searchResults.length > 0 ? (
              searchResults.map((company) => (
                <CompanyProfileItem key={company._id} companyProfile={company} />
              ))
            ) : (
            <div>No results found</div>
            )}
          </div>
          
          </Fragment>)}
    </section>
    </AnimatedSwitch>    
    );
};

CompanySearch.propTypes = {
    searchCompanies: PropTypes.func.isRequired,
  companyProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    companyProfile: state.companyProfile,
});

export default connect(mapStateToProps, { searchCompanies })(CompanySearch);
