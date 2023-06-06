import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyCode } from '../../actions/auth';
import { Link, Navigate } from 'react-router-dom';
import Alert from '../layout/Alert';

const LoginVerification = ({
  auth,
  role,
  isAuthenticated,
  verifyCode,
  currentEmail,
}) => {
  const [code, setCode] = useState('');

  const onChange = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Current email from state: ', currentEmail);
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
          To continue, enter the 6-digit code sent to your e-mail address.
          Please check your e-mail for a verification code.
        </p>
        <br />
        <br />
        <form
          onSubmit={onSubmit}
          style={{ radius: '10px', width: '300px', margin: '0 auto' }}
        >
          <input
            type='text'
            name='code'
            value={code}
            onChange={onChange}
            placeholder='Enter verification code'
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
            required
          />
          <br />
          <br />
          <br />
          <input type='submit' className='btn btn-primary' value='Submit' />
        </form>
      </div>
      <Alert />
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
