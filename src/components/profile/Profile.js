import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById, scoreEngineer, getEngineerScore, getProfileAndScore } from '../../actions/profile';
import { Link, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import Experience from './Experience';
import Education from './Education';
import ReactStars from "react-rating-stars-component";
import AnimatedSwitch from '../../AnimatedSwitch';

const Profile = ({ getProfileById, getEngineerScore, getProfileAndScore, scoreEngineer, profile: { profile, loading, engineerScore}, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileAndScore(id);
    }, [getProfileAndScore, id]);
  console.log(profile);
  const [score, setScore] = useState(5);
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setScore(newRating);
    scoreEngineer(profile._id, score);
  }
  return (
    <AnimatedSwitch>
    <section className='container2'>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id !== profile.user._id && (
            <div class="rating" >
            <ReactStars
            count={5}
            size={28}
            activeColor="#ffd700"
            onChange={ratingChanged}
            />
            </div>
          )}
          
           {profile.scores.length > 0 ? (
            <Fragment>
                <p>Score: {engineerScore.score.toFixed(2)} </p> 
                <p>{profile.scores.length} people voted </p>
            </Fragment>
            ) : (
                <p>No votes yet</p>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <Experience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <Education
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </section>
    </AnimatedSwitch>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  scoreEngineer: PropTypes.func.isRequired,
  getEngineerScore: PropTypes.func.isRequired,
  getProfileAndScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById,  scoreEngineer, getEngineerScore, getProfileAndScore})(Profile);
