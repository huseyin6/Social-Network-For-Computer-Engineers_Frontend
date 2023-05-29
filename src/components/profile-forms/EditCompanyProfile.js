import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentCompany } from '../../actions/companyProfile';
import Alert from '../layout/Alert';

const EditCompanyProfile = ({
  createProfile,
  getCurrentCompany,
  companyProfile: { companyProfile, loading },
  navigate,
}) => {
  const [formData, setFormData] = useState({
    website: '',
    location: '',
    about: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    website,
    location,
    about,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  useEffect(() => {
    getCurrentCompany();
    setFormData({
      website: loading || !companyProfile.website ? '' : companyProfile.website,
      location:
        loading || !companyProfile.location ? '' : companyProfile.location,
      about: loading || !companyProfile.about ? '' : companyProfile.about,
      twitter: loading || !companyProfile.social.twitter ? '' : companyProfile.social.twitter,
      facebook:
        loading || !companyProfile.social.facebook ? '' : companyProfile.social.facebook,
      linkedin:
        loading || !companyProfile.social.linkedin ? '' : companyProfile.social.linkedin,
      youtube: loading || !companyProfile.social.youtube ? '' : companyProfile.social.youtube,
      instagram:
        loading || !companyProfile.social.instagram ? '' : companyProfile.social.instagram,
    });
  }, [loading, getCurrentCompany]);

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, true);
  };
  return (
    <section className='container'>
      <Alert />
      <h1 className='large text-primary'>Edit Profile</h1>
      <small>* Required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of company'
            name='about'
            value={about}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='my-1'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' value='Submit' />
        <Link className='btn btn-light my-1' to='/dashboardCompany'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

EditCompanyProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentCompany: PropTypes.func.isRequired,
  companyProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyProfile: state.companyProfile,
});

export default connect(mapStateToProps, { createProfile, getCurrentCompany })(
  EditCompanyProfile
);
