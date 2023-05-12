import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { applyJob, declineJob, getJob } from '../../actions/job';

const JobItem = ({ job, applyJob, declineJob, getJob, auth }) => {
  const {
    _id,
    title,
    company,
    description,
    date,
    companyName,
    status,
    applicants,
    declinedUsers,
  } = job;

  const userId = auth.user ? auth.user._id : null;

  const hasUserApplied = applicants.find(applicant => applicant.user === userId);
  const hasUserDeclined = declinedUsers.find(user => user.user === userId);

  const handleApply = async (id) => {
    if (!hasUserApplied) {
      await applyJob(id);
      getJob(id); // re-fetch the job
    }
  };

  const handleDecline = async (id) => {
    if (!hasUserDeclined) {
      await declineJob(id);
      getJob(id); // re-fetch the job
    }
  };

  if (hasUserDeclined) {
    return null;
  }


  return (
    <div className='job bg-white p-2'>
      <h3>{title}</h3>
      <p>
        <strong>Company: </strong>
        {company}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
      <p>
        <strong>Date: </strong>
        {date}
      </p>
      <p>
        <strong>Status: </strong>
        {status}
      </p>
      <p>
        <strong>Applicants: </strong>
        {applicants.length}
      </p>
      <p>
        <strong>Declined: </strong>
        {declinedUsers.length}
      </p>
      {!hasUserApplied && (
        <>
          <button
            onClick={() => handleApply(_id)}
            type='button'
            className='btn btn-primary'
          >
            Apply
          </button>
          <button
            onClick={() => handleDecline(_id)}
            type='button'
            className='btn btn-danger'
          >
            Decline
          </button>
        </>
      )}
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  applyJob: PropTypes.func.isRequired,
  declineJob: PropTypes.func.isRequired,
  getJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { applyJob, declineJob, getJob })(JobItem);
