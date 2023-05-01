import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {getAds, deleteJob} from '../../actions/job';
import Alert from '../layout/Alert';
import Spinner from '../layout/Spinner';

const MyAdvertisements = ({getAds, deleteJob, job: {jobs, loading}}) => {
    useEffect(() => {
        getAds();
      }, [getAds]);
    return (
        <section className='container'>
            <Alert/>
            <h1 className='large text-primary'>My Advertisements</h1>
            <Link to='/advertise-job'  className='btn btn-primary my-1'>
          Give Advertisement
        </Link>
            {loading ? (
        <Spinner />
      ) : (
        <Fragment>
        {jobs.length > 0 ? (
        <Fragment>
        {jobs.map((jobitem) => (  
          <div className="bg-white p-1 my-1">
          <div> 
            <p><strong>Job Title</strong>: {jobitem.title}
            <button onClick={() => deleteJob(jobitem._id)} style = {{float: 'right'}}
            className='btn btn-danger'><i className="fas fa-trash-alt text-light"></i ></button>
            <button style = {{float: 'right'}}
            className='btn btn-primary'>See Applicants</button>          
            </p>
          </div>
          <div> 
            <p><strong>Job Status</strong>: {jobitem.status}</p>
          </div>
          <div> 
            <p><strong>Job Description</strong>: {jobitem.description}</p>
          </div>
          </div>
        
        ))}
        </Fragment>)
        : 
        ( <p>No job advertisements yet</p>)
         } </Fragment>  
)}

        </section>
    )
}
MyAdvertisements.propTypes = {
    getAds: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    job: state.job,
  });
  
  export default connect(mapStateToProps, { getAds, deleteJob })(MyAdvertisements);