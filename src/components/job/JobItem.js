import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const JobItem = ({ job }) => {
  const {
    _id,
    title,
    company,
    description,
    date,
    status,
    applicants,
  } = job;

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
        {applicants}
      </p>
      <Link to={`/job/${_id}`} className='btn btn-primary'>
        View Job Details
      </Link>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobItem;