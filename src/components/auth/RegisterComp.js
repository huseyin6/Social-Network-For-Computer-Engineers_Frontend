import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerComp } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { useNavigate } from 'react-router-dom';
import { setCurrentEmail,setCurrentName,setCurrentPassword } from '../../actions/auth';

const RegisterComp = ({ setAlert, registerComp, isAuthenticated ,setCurrentEmail,setCurrentName,setCurrentPassword, role, isVerified,isCodeSent }) => {
    const [data, setData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
    });
  
    const { name, email, password, password2 } = data;
    const onChange = (el) =>
      setData({ ...data, [el.target.name]: el.target.value });
  
      const clickSubmit = async (e) => {
        e.preventDefault();
        setCurrentEmail(email);
        setCurrentPassword(password);
        setCurrentName(name);
        if (password !== password2) {
          setAlert('Passwords do not match', 'danger');
        } else {
          registerComp({ name, email, password })
        }
      };
  
      if (!isAuthenticated && isCodeSent) {
        return <Navigate to='/Verification' />;
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
    setCurrentEmail: PropTypes.func.isRequired,
    setCurrentName: PropTypes.func.isRequired,
    setCurrentPassword: PropTypes.func.isRequired,
    role: PropTypes.string,
    isVerified: PropTypes.bool,
    isCodeSent: PropTypes.bool,
    
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    isVerified: state.auth.isVerified,
    isCodeSent: state.auth.isCodeSent,
  });
  

  const mapDispatchToProps = dispatch => ({
    registerComp: (name, email, password) => dispatch(registerComp( name, email, password)),
    setCurrentEmail: email => dispatch(setCurrentEmail(email)),
    setCurrentName: name => dispatch(setCurrentName(name)),
    setCurrentPassword: password => dispatch(setCurrentPassword(password))
  });

  export default connect(mapStateToProps, { setAlert, registerComp,setCurrentEmail,setCurrentName,setCurrentPassword })(RegisterComp);