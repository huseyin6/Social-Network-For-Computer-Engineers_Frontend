import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CompanyProfileItem = ({
  companyProfile: {
    company: { _id, name, avatar },
    location,
  },
}) => {
  return (
    <div className='profile'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <Link to={`/company-profile/${_id}`} className='medium text-primary'>
          {name}
        </Link>
        {/* <p>
          {status} {company && <span> at {company}</span>}
        </p> */}
        <p>{location && <span>{location}</span>}</p>
      </div>
    </div>
  );
};

CompanyProfileItem.propTypes = {
  companyProfile: PropTypes.object.isRequired,
};

export default CompanyProfileItem;
