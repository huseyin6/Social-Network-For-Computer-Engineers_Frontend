import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <div className='profile-about bg-white p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>Bio</h2>
        <p>{bio}</p>
        <br />
      </Fragment>
    )}
    <h2 className='text-primary'>Skills</h2>
    <div className='skills'>
      {skills ?
      <Fragment>
      {skills.map((skill, index) => (
        <div key={index} className='pr1'>
         {skill}
        </div>     
      ))}
       </Fragment> : null}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
