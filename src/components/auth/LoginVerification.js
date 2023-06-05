import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyCode } from '../../actions/auth';
import { Link,Navigate } from 'react-router-dom';
import Alert from '../layout/Alert';


const LoginVerification = ({ auth,role, isAuthenticated, verifyCode,currentEmail }) => {
  const [code, setCode] = useState('');

  const onChange = (e) => {
    setCode(e.target.value);
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Current email from state: ", currentEmail); 
    verifyCode(currentEmail, code);
  };

  if (isAuthenticated && role === 'engineer') {
    return <Navigate to='/dashboard' />;
  }

  if (isAuthenticated && role === 'company') {
    return <Navigate to='/dashboardCompany' />;
  }

  return (
    <section className='verification'>
      <div className='verification-container'>
        <h1 className='x-large text-primary'>Account Verification</h1>
        <p className='lead'>
          <i className='fas fa-user-check'></i> Verify Your Account
        </p>
        <p>
          It looks like your account hasn't been verified yet. Please check your email for a verification code.
        </p>
        <form onSubmit={onSubmit}>
          <input 
            type='text' 
            name='code' 
            value={code} 
            onChange={onChange} 
            placeholder='Enter verification code' 
            required 
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <Alert/>
    </section>
  );
};

LoginVerification.propTypes = {
  role: PropTypes.string,
  isVerified: PropTypes.bool,
  verifyCode: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
  isVerified: state.auth.isVerified,
  currentEmail: state.auth.currentEmail,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { verifyCode })(LoginVerification);
