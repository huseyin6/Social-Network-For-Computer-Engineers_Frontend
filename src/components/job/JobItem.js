import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const JobItem = ({ job }) => {
  const {
    _id,
    title,
    company,
    location,
    description,
  } = job;

  return (
    <div className='job bg-white p-2'>
      <h3>{title}</h3>
      <p>
        <strong>Company: </strong>
        {company}
      </p>
      <p>
        <strong>Location: </strong>
        {location}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
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