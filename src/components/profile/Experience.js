import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Experience = ({ experience, deleteExperience, auth,
  profile: { profile }, }) => {
  return (
    <Fragment>
      <h3 className='text-dark'>{experience.company} 
        {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && ( 
        <button onClick={() => deleteExperience(experience._id)} style = {{float: 'right'}}
        className='btn btn-danger'><i className="fas fa-trash-alt text-light"></i ></button>
        )}  
        </h3>
      <p>
        {formatDate(experience.from)} - {experience.to ? formatDate(experience.to) : 'Now'}
      </p>
      <p>
        <strong>Title: </strong> {experience.title}
      </p>
      {experience.location && (
        <p>
        <strong>Location: </strong> {experience.location}
        </p>)}
      {experience.description && (
        <p>
        <strong>Description: </strong> {experience.description}
        </p>)}
      <br/>
  </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { deleteExperience })(Experience);
