import React from 'react';
import PropTypes from 'prop-types';

const CompanyProfileTop = ({
    companyProfile: {
        company: { _id, name, avatar },
        location,
        social,
        website
      },
}) => {
  return (
    <div className='profile-top bg-white p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h2 className='larger text-primary'>{name}</h2>
      <p>{location ? <span>{location}</span> : null}</p>
      <div className='icons my-1'>
        {website ? (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe text-dark fa-2x' />
          </a>
        ) : null}
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

CompanyProfileTop.propTypes = {
  companyProfile: PropTypes.object.isRequired,
};

export default CompanyProfileTop;
