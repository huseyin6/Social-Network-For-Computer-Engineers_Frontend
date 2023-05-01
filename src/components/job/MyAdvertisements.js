import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {getAds} from '../../actions/job';
import Alert from '../layout/Alert';
import Spinner from '../layout/Spinner';

const MyAdvertisements = ({getAds, job: {jobs, loading}}) => {
    useEffect(() => {
        getAds();
      }, [getAds]);
    return (
        <section className='container'>
            <h1 className='large text-primary'>My Advertisements</h1>
            <Link to='/advertise-job'  className='btn btn-primary my-1'>
          Give Advertisement
        </Link>
            {loading ? (
        <Spinner />
      ) : (
        <div className='posts'>
        {jobs.map((jobitem) => (
        <Fragment>
          <div> 
            <p>Job Title: {jobitem.title}</p>
          </div>
          <div> 
            <p>Job Status: {jobitem.status}</p>
          </div>
          <div> 
            <p>Job Description: {jobitem.description}</p>
          </div>
        </Fragment>
        ))}
        </div>
)}
        </section>

    )
}
MyAdvertisements.propTypes = {
    getAds: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    job: state.job,
  });
  
  export default connect(mapStateToProps, { getAds })(MyAdvertisements);