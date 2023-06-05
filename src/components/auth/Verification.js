import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { verifyCompany,verifyUser } from '../../actions/auth';
import { Link} from 'react-router-dom';
import Alert from '../layout/Alert';
import { code } from 'react-code-blocks';

const Verification = ({ auth,role, isAuthenticated,currentName,currentPassword, verifyUser,verifyCompany,currentEmail,isVerified }) => {
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
  const [error, setError] = useState(''); // Error state for invalid code
  const [navigateTo, setNavigateTo] = useState(null); // State to manage navigation
  const [forceUpdate, setForceUpdate] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
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

  const onChange = (e) => {
    setCode(e.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onSubmit = (e) => {
    
    console.log(role);
    e.preventDefault();
    if (role === 'engineer'){
      console.log(currentEmail)
      console.log(code)
      console.log(currentName)
      console.log(currentPassword)
      verifyUser(currentName,currentEmail,currentPassword,code);

    }
    if (role === 'company'){
      verifyCompany(currentName,currentEmail,currentPassword, code);
    }
    
  };


  if (timeRemaining > 0) {

    console.log(isAuthenticated)
    console.log(isVerified)
    if(isAuthenticated&&isVerified){

      if (role === 'engineer') {

        return <Navigate to='/dashboard' />;
      } 
      else if (role === 'company') {
        return <Navigate to='/dashboardCompany' />;
      }
  }
  }   
  
  else {
    setError('Invalid verification code');
  }

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
          value={code}
          onChange={onChange}
          required
          />
      </div>
      <input type="submit" onClick={onSubmit} className='btn btn-primary' value='Verify' />
      </form>
      <p className='my-1'>
        Verification code expires in {formatTime(timeRemaining)}
      </p>
    </div>
    <Alert/>
  </section>
);

};

Verification.propTypes = {
  role: PropTypes.string,
  isVerified: PropTypes.bool,
  verifyUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  verifyCompany: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role, // Updated path to role with optional chaining
  currentEmail: state.auth.currentEmail,
  isVerified: state.auth.isVerified,
  currentName: state.auth.currentName,
  currentPassword: state.auth.currentPassword,
});

export default connect(mapStateToProps, {verifyUser,verifyCompany})(Verification);