import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Link, Navigate } from 'react-router-dom';
import Alert from '../layout/Alert';
import { setCurrentEmail } from '../../actions/auth';

const Login = ({ login, setCurrentEmail, isAuthenticated, role, isVerified,isCodeSent }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const onChange = (el) =>
    setData({ ...data, [el.target.name]: el.target.value });

    const clickSubmit = async (e) => {
      e.preventDefault();
      console.log("Setting current email: ", email); 
      setCurrentEmail(email);  
      login(email, password);
    };
    
  if (isAuthenticated && role === 'engineer' && isVerified) {
  
    return <Navigate to='/dashboard' />;
  }

  if (isAuthenticated && role === 'company' && isVerified) {
    
    return <Navigate to='/dashboardCompany' />;
  }


  console.log(isCodeSent);
  if (isCodeSent && !isAuthenticated) {
    return <Navigate to='/LoginVerification' />;
  }
  
  return (
    <section className='landing'>
      <div className='form-container'>
        <h1 className='x-large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign Into Your Account
        </p>
        <form className='form' onSubmit={(e) => clickSubmit(e)}>
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
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
        <Alert />
      </div>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setCurrentEmail: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
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
  login: (email, password) => dispatch(login(email, password)),
  setCurrentEmail: email => dispatch(setCurrentEmail(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
