import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { applyJob, declineJob } from '../../actions/job';
import {
  addAppliedJob,
  addDeclinedJob,
  isJobAppliedOrDeclined,
} from '../../localStorageHelpers';

const JobItem = ({ job, applyJob, declineJob }) => {
  const {
    _id,
    title,
    company,
    description,
    date,
    status,
    applicants,
    declinedUsers,
  } = job;

  const [jobStatus, setJobStatus] = useState('notApplied');

  useEffect(() => {
    if (isJobAppliedOrDeclined(_id)) {
      setJobStatus('applied');
    }
  }, [_id]);

  const handleApply = async (id) => {
    await applyJob(id);
    addAppliedJob(id);
    setJobStatus('applied');
  };

  const handleDecline = async (id) => {
    await declineJob(id);
    addDeclinedJob(id);
    setJobStatus('declined');
  };

  if (jobStatus === 'declined') {
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
        <strong>Date </strong>
        {date}
      </p>
      <p>
        <strong>Status </strong>
        {status}
      </p>
      <p>
        <strong>Applicants </strong>
        {Array.isArray(applicants) ? applicants.length : 0}
      </p>
      <p>
        <strong>Declined </strong>
        {Array.isArray(declinedUsers) ? declinedUsers.length : 0}
      </p>
      {jobStatus === 'notApplied' && (
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
};

export default connect(null, { applyJob, declineJob })(JobItem);
