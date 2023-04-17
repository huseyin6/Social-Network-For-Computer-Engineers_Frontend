import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Education = ({ education, deleteEducation, auth,
  profile: { profile }, }) => {
  return (
    <Fragment>
      <h3 className='text-dark'>{education.school} 
        {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && ( 
        <button onClick={() => deleteEducation(education._id)} style = {{float: 'right'}}
        className='btn btn-danger'><i className="fas fa-trash-alt text-light"></i ></button>
        )}  
        </h3>
      <p>
        {formatDate(education.from)} - {education.to ? formatDate(education.to) : 'Now'}
      </p>
      <p>
        <strong>Degree: </strong> {education.degree}
      </p>
      {education.fieldofstudy && (
        <p>
        <strong>Field of Study: </strong> {education.fieldofstudy}
        </p>)}
      {education.description && (
        <p>
        <strong>Description: </strong> {education.description}
        </p>)}
      <br/>
  </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { deleteEducation })(Education);
