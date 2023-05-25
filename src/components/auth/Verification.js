import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const Verification = ({ isAuthenticated, role }) => {
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
  const [verificationCode, setVerificationCode] = useState('');
  const [storedCode, setStoredCode] = useState(null); // Store the verification code
  const [error, setError] = useState(''); // Error state for invalid code
  const [navigateTo, setNavigateTo] = useState(null); // State to manage navigation
  const [dummy, setDummy] = useState(false); // add this state
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    const generateCode = Math.floor(100000 + Math.random() * 900000).toString();
    setStoredCode(generateCode);
  
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setNavigateTo('/login');
      setForceUpdate(prev => !prev); // forces a rerender
    }
  }, [timeRemaining, forceUpdate]);
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(''); // Clear the error
      }, 2000); // After 2 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onChange = (el) => setVerificationCode(el.target.value);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onVerify = (e) => {
    e.preventDefault();
    if (verificationCode === storedCode && timeRemaining > 0) {
      if (role === 'engineer') {
        setNavigateTo('/dashboard');
      } else if (role === 'company') {
        setNavigateTo('/dashboardCompany');
      }
    } else {
      setError('Invalid verification code');
    }
  };

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

return (
  <section className='verification'>
    <div className='verification-container'>
      <h1 className='x-large text-primary'>Verification</h1>
      <p className='lead'>Please enter the verification code sent to your email.</p>
      
      {error && <div className="alert alert-danger" style={{fontSize: '0.8em', marginBottom: '1em'}}>{error}</div>} 
      {/* Moved error display to the top and added inline styles to make it smaller and add space below */}

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
      <input type="submit" onClick={onVerify} className='btn btn-primary' value='Verify' />
      </form>
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
  role: state.auth?.user?.role, // Updated path to role with optional chaining
});

export default connect(mapStateToProps, {})(Verification);