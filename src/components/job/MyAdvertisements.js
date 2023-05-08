import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getAds} from '../../actions/job';
import Alert from '../layout/Alert';
import Spinner from '../layout/Spinner';
import AdvertisementItem from './AdvertisementItem';

const MyAdvertisements = ({getAds,  job: {jobs, loading}}) => {
    useEffect(() => {
        getAds();
      }, [getAds]);
    return (
        <section className='container'>
          <Alert/>
          <h1 className='large text-primary'>My Advertisements</h1>
          <Link to='/advertise-job'  className='btn btn-primary my-1'> Give Advertisement </Link>
          {loading ? (
          <Spinner />
          ) : (
          <Fragment>
          {jobs.length > 0 ? (
          <Fragment>
          {jobs.map((jobitem) => (  
            <AdvertisementItem key={jobitem._id} jobitem={jobitem}/>  
          ))}
          </Fragment>
          ) : 
          ( <p>No job advertisements yet</p>)
          } </Fragment>  
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