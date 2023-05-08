import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {deleteJob, getApplicants} from '../../actions/job';
import 'animate.css';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';

const AdvertisementItem = ({auth, jobitem, deleteJob, getApplicants, job: {applicants}}) => {
    return (
    <div className="bg-white p-1 my-1">
        <div> 
            <p><strong>Job Title</strong>: {jobitem.title}
            <button onClick={() => deleteJob(jobitem._id)} style = {{float: 'right'}}
            className='btn btn-danger'><i className="fas fa-trash-alt text-light"></i ></button>

        <div className={`popup popup-${jobitem._id} animate__animated animate__fadeIn`}>
        <div className='popup-content'>
          <span
            className='close'
            onClick={() => {
              document.querySelector(`.popup-${jobitem._id}`).style.display = 'none';
            }}
          >
            &times;
          </span>
          <div>
          {applicants === null ? (
            <Spinner/>
          ): 
          (<Fragment>
            {applicants.map((applicant) => (
            <ProfileItem key={applicant._id} profile={applicant} />
          ))}</Fragment>)}
          </div>
         </div>
        </div>
      {jobitem.applicants.length > 0 && (
      <button
        type='button'
        className='btn btn-primary'
        style = {{float: 'right'}}
        onClick={() => {
          getApplicants(jobitem._id);
          document.querySelector(`.popup-${jobitem._id}`).style.display = 'block';
        }}
      >
       See Applicants
      </button> )}
        </p>
        </div>
        <div>
            <Fragment>
            {jobitem.applicants.length > 0 ? (
            <Fragment>
            <p>{jobitem.applicants.length} applicants</p>
            </Fragment>) : (
              <p>No applicants yet</p>
            )
            }
            </Fragment>
          </div>
          <div> 
            <p><strong>Job Status</strong>: {jobitem.status}</p>
          </div>
          <div> 
            <p><strong>Description</strong>: {jobitem.description}</p>
          </div>
          </div>
)
}
AdvertisementItem.propTypes = {
    getApplicants: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    jobitem: PropTypes.object.isRequired,
    job: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    job: state.job
  });
  
  export default connect(mapStateToProps, {deleteJob, getApplicants })(AdvertisementItem);