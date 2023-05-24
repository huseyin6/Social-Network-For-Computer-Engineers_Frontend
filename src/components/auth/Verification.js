import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const Verification = ({ isAuthenticated, role }) => {
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
  const [verificationCode, setVerificationCode] = useState('');
  const [storedCode, setStoredCode] = useState(null); // Store the verification code
  const [error, setError] = useState(''); // Error state for invalid code

  useEffect(() => {
    // Generate a random 6-digit code when component mounts
    const generateCode = Math.floor(100000 + Math.random() * 900000).toString();
    setStoredCode(generateCode);

    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      return <Navigate to='/login' />;
    }
  }, [timeRemaining]);

  const onChange = (el) => setVerificationCode(el.target.value);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onVerify = (e) => {
    e.preventDefault();
    if (verificationCode === storedCode) {
      if (role === 'engineer') {
        return <Navigate to='/dashboard' />;
      } else if (role === 'company') {
        return <Navigate to='/dashboardCompany' />;
      }
    } else {
      // Show an error message
      setError('Invalid verification code');
    }
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
        <h1 className='x-large text-primary'>Verification</h1>
        <p className='lead'>Please enter the verification code sent to your email.</p>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='form-group'>
            <input
            type='text'
            placeholder='Verification Code'
            name='verificationCode'
            value={verificationCode}
            onChange={onChange}
            required
            />
        </div>
        <button onClick={onVerify} className='btn btn-primary' value='Verify' />
        </form>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error when the code is invalid */}
        <p className='my-1'>
          Verification code expires in {formatTime(timeRemaining)}
        </p>
      </div>
    </section>
  );
};

Verification.propTypes = {
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.user.role, // Updated path to role
});

export default connect(mapStateToProps, {})(Verification);