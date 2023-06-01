import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Link, Navigate } from 'react-router-dom';
import Alert from '../layout/Alert';
/*import axios from 'axios';*/
const Login = ({ login, isAuthenticated, role, isVerified }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const onChange = (el) =>
    setData({ ...data, [el.target.name]: el.target.value });

  const clickSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated && role === 'engineer' && isVerified) {
    // console.log('LOG: Role:', role);
    return <Navigate to='/dashboard' />;
  }

  if (isAuthenticated && role === 'company' && isVerified) {
    // console.log('LOG: Role:', role);
    return <Navigate to='/dashboardCompany' />;
  }

  if (isAuthenticated && !isVerified) {
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
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
  isVerified: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
  isVerified: state.auth.isVerified,
});

export default connect(mapStateToProps, { login })(Login);
