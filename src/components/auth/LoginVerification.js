import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyCode, getVerificationCode } from '../../actions/auth';
import { Link, Navigate } from 'react-router-dom';

const LoginVerification = ({ role, isVerified, verifyCode, getVerificationCode }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    getVerificationCode();
  }, [getVerificationCode]);

  const onChange = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    verifyCode(code);
  };

  if (isVerified && role === 'engineer') {
    return <Navigate to='/dashboard' />;
  }

  if (isVerified && role === 'company') {
    return <Navigate to='/dashboardCompany' />;
  }

  if (isVerified && role === 'engineer') {
    return <Navigate to='/dashboard' />;
  }

  if (isVerified && role === 'company') {
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
        <p>
          Can't find the code? Click <Link to='/resend'>here</Link> to resend the verification email.
        </p>
      </div>
    </section>
  );
};

LoginVerification.propTypes = {
  role: PropTypes.string,
  isVerified: PropTypes.bool,
  verifyCode: PropTypes.func.isRequired,
  getVerificationCode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
  isVerified: state.auth.isVerified,
});

export default connect(mapStateToProps, { verifyCode, getVerificationCode })(LoginVerification);
