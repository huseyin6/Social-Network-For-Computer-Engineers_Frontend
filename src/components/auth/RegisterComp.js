import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerComp } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { useNavigate } from 'react-router-dom';

const RegisterComp = ({ setAlert, registerComp, isAuthenticated }) => {
    const [data, setData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
    });
  
    const { name, email, password, password2 } = data;
    const navigate = useNavigate();
    const onChange = (el) =>
      setData({ ...data, [el.target.name]: el.target.value });
  
      const clickSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
          setAlert('Passwords do not match', 'danger');
        } else {
          registerComp({ name, email, password })
            .then((response) => {
              if(response){
                navigate('/verification');
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };
  
    if (isAuthenticated) {
      return <Navigate to='/dashboardCompany' />;
    }
  
    return (
      <section className='landing'>
        <div className='form-container'>
          <h1 className='x-large text-primary'>Sign Up For Company</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create Your Account
          </p>
          <form className='form' onSubmit={(e) => clickSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(el) => onChange(el)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(el) => onChange(el)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={password}
                onChange={(el) => onChange(el)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                minLength='6'
                value={password2}
                onChange={(el) => onChange(el)}
                required
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Register' />
          </form>
          <p className='my-1'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
          <Alert />
        </div>
      </section>
    );
  };
  
  RegisterComp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerComp: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  
  export default connect(mapStateToProps, { setAlert, registerComp })(RegisterComp);