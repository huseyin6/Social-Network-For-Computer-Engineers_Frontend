import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {
  getProfileById,
  scoreEngineer,
  getEngineerScore,
  getProfileAndScore,
} from '../../actions/profile';
import { Link, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import Experience from './Experience';
import Education from './Education';
import ReactStars from 'react-rating-stars-component';
import AnimatedSwitch from '../../AnimatedSwitch';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // replace '#root' with the id of your application's root element

const Profile = ({
  getProfileById,
  getEngineerScore,
  getProfileAndScore,
  scoreEngineer,
  profile: { profile, loading, engineerScore },
  auth,
}) => {
  const { id } = useParams();
  const [hasRated, setHasRated] = useState(false);
  const [userRating, setUserRating] = useState(0); // Add this line to keep track of user's rating

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  useEffect(() => {
    console.log('Profile:', profile); // Debug line
    console.log('Auth User ID:', auth.user?._id); // Debug line
    if (profile) {
      const userScore = profile.scores.find(
        (score) => score.user === auth.user?._id
      );
      console.log('User Score:', userScore); // Debug line
      if (userScore) {
        setHasRated(true);
        console.log('User Score Value:', userScore.score); // Debug line
        setUserRating(userScore.score);
      }
    }
  }, [profile, auth]);

  const [modalTimeout, setModalTimeout] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const ratingChanged = (newRating) => {
    if (hasRated) {
      setModalMessage('Engineer already rated');
      setModalIsOpen(true);
      setTimeout(() => {
        setModalIsOpen(false);
      }, 2000);
    } else {
      scoreEngineer(profile._id, newRating)
        .then(() => {
          setHasRated(true);
          setUserRating(newRating); // Update userRating state
          setModalMessage('You have successfully rated this engineer!');
          setModalIsOpen(true);
          setTimeout(() => {
            setModalIsOpen(false);
          }, 2000);
        })

        .catch((error) => {
          console.error('Error rating engineer:', error);
        });
    }
  };

  const closeModal = () => {
    clearTimeout(modalTimeout); // clear the timeout if the modal is manually closed
    setModalIsOpen(false);
  };

  const calculateAverageScore = () => {
    if (profile && profile.scores.length > 0) {
      const totalScore = profile.scores.reduce(
        (total, score) => total + score.score,
        0
      );
      return (totalScore / profile.scores.length).toFixed(1); // toFixed(1) ensures that the result is rounded to 1 decimal place
    }
    return 0; // default score
  };

  return (
    <AnimatedSwitch>
      <section className='container2'>
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn2 btn-dark'>
                  Edit Profile
                </Link>
              )}
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id !== profile.user._id && (
                <div>
                  <div className='rating'>
                    {console.log(userRating)}
                    <ReactStars
                      count={5}
                      value={userRating} // Use average score here
                      size={28}
                      activeColor='#ffd700'
                      onChange={ratingChanged}
                      edit={!hasRated}
                      half={true} // allows half-star ratings
                    />
                    <p>
                      {profile.scores.length} rated <br />
                      Average Score: {calculateAverageScore()}
                      <br />
                      {hasRated && `Your Score: ${userRating}`}
                    </p>
                  </div>
                </div>
              )}

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                overlay: {
                  backgroundColor: 'transparent',
                },
                content: {
                  color: 'black',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                },
              }}
            >
              <h2>{modalMessage}</h2>
            </Modal>

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
                      <Education key={education._id} education={education} />
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

export default connect(mapStateToProps, {
  getProfileById,
  scoreEngineer,
  getEngineerScore,
  getProfileAndScore,
})(Profile);
