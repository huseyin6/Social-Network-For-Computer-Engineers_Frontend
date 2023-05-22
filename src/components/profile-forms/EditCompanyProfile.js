import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile, getCurrentCompany } from '../../actions/companyProfile';
import Alert from '../layout/Alert';

const EditCompanyProfile = ({editProfile, 
    getCurrentCompany, 
    companyProfile: { companyProfile , loading }, 
}) => {
    const [formData, setFormData] = useState({
        website: '',
        location: '',
        about: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });
    const navigate = useNavigate();
    const [displaySocialInputs, toggleSocialInputs] = useState(false);  
    
    const {
        website,
        location,
        about,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram 
    } = formData;        
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value}); 
    useEffect(()=> {
        getCurrentCompany();
        setFormData({
            website:  loading || !companyProfile.website ? '' : companyProfile.website, 
            location: loading || !companyProfile.location ? '' : companyProfile.location, 
            about: loading || !companyProfile.about ? '' : companyProfile.about, 
            twitter: loading || !companyProfile.twitter ? '' : companyProfile.twitter, 
            facebook: loading || !companyProfile.facebook ? '' : companyProfile.facebook, 
            linkedin: loading || !companyProfile.linkedin ? '' : companyProfile.linkedin,
            youtube: loading || !companyProfile.youtube ? '' : companyProfile.youtube,  
            instagram: loading || !companyProfile.instagram ? '' : companyProfile.instagram, 
        });
      },[loading, getCurrentCompany]);    
    
    const onSubmit = (e) => {
        e.preventDefault();
        editProfile(formData, navigate);
    };
return (
<section className='container'>
      <Alert/>
      <h1 className='large text-primary'>Edit Profile</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <small className='form-text smaller'>
          Website
        </small>
        <div className='form-group'>
          <input
            type='text'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
        </div>
        <small className='form-text smaller'>
          Location
        </small>
        <div className='form-group'>
          <input
            type='text'
            placeholder='City/State'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <small className='form-text smaller'>
          About
        </small>
        <div className='form-group'>
          <textarea
            cols='30'
            rows='5'
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

        <input type='submit' className='btn btn-primary my-1' value='Submit'/>
        <Link className='btn btn-light my-1' to='/dashboardCompany'>
          Go Back
        </Link>
      </form>
    </section>
); 
};

EditCompanyProfile.propTypes = {
editProfile: PropTypes.func.isRequired,
getCurrentCompany: PropTypes.func.isRequired,
companyProfile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    companyProfile: state.companyProfile
});

export default connect(mapStateToProps, { editProfile, getCurrentCompany })(
    EditCompanyProfile
);