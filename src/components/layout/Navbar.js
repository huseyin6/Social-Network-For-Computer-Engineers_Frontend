import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { goBack, logout } from '../../actions/auth';
import { useLocation } from 'react-router-dom';

const Navbar = ({ auth: { isAuthenticated, loading, role }, logout }) => {
  const location = useLocation();
  if (location.pathname === '/verification') {
    return null; // or return a minimal version of the Navbar
  }

  const engineerLinks = (
    <ul>
      <li>
        <Link to='/company-profiles'>Companies</Link>
      </li>
      <li>
        <Link to='/profiles'>Engineers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/questions'>Q&A</Link>
      </li>
      <li>
        <Link to='/events'>Events</Link>
      </li>
      <li>
        <Link to='/recommendations'>Recommendations</Link>
      </li>
      <li>
      <Link to="/videos">Videos</Link>
      </li>
      
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />
          <span className='hide-sm'> Profile</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </ul>
  );

  const companyLinks = (
    <ul>
      <li>
        <Link to='/company-profiles'>Companies</Link>
      </li>
      <li>
        <Link to='/my-ads'>My Advertisements</Link>
      </li>
      <li>
        <Link to='/profiles'>Engineers</Link>
      </li>
      <li>
        <Link to='/events'>Events</Link>
      </li>
      <li>
        <Link to='/dashboardCompany'>
          <i className='fas fa-user' />
          <span className='hide-sm'> Profile</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestsLinks = (
    <ul>
      <li>
        <Link to='/login' onClick={goBack()} >Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/profiles'>Engineers</Link>
      </li>
      <li>
        <Link to='/company-profiles'>Companies</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/' onClick={goBack()}>C^3</Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated && role === 'engineer' && engineerLinks}
          {isAuthenticated && role === 'company' && companyLinks}
          {!isAuthenticated && guestsLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
