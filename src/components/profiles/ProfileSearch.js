import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { searchProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import AnimatedSwitch from '../../AnimatedSwitch';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileSearch = ({ searchProfiles, profile: { searchResults, loading } }) => {
    const {key} = useParams();
  useEffect(() => {
    searchProfiles(key);
  }, [searchProfiles, key]);
  const [text, setText] = useState(key);
  const navigate = useNavigate();
  return (
    <AnimatedSwitch>
    <section className='container'>
    {loading ? (
        <Spinner />
      ) : (
        <Fragment>
      <h1 className='large text-primary'>Engineers</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/profiles/search/${text}`);
        }}
      >
        <input
          className='my-input'
          type='text'
          value={text}
          placeholder='Search Engineers'
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit' className='btn btn-primary my-1' ><i class="fa fa-search" aria-hidden="true"></i></button>
      </form>
      <br />
      <hr />
      <br />
      <div className='profiles'>
            {searchResults.length > 0 ? (
              searchResults.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
            <div>No results found</div>
            )}
          </div>
          
          </Fragment>)}
    </section>
    </AnimatedSwitch>    
    );
};

ProfileSearch.propTypes = {
    searchProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { searchProfiles })(ProfileSearch);
