import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import AnimatedSwitch from '../../AnimatedSwitch';
import { useNavigate } from 'react-router-dom';
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getProfiles();
      setIsLoading(false);
    };
    fetchData();
  }, [getProfiles]);

  if (isLoading) {
    return (
      <AnimatedSwitch>
        <div className='container'>
          <Spinner/>
        </div>
      </AnimatedSwitch>
    );
  }
  return (
    <AnimatedSwitch>
    <section className='container'>
          <h1 className='large text-primary'>Engineers</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/profiles/search/${text}`);
              setText('');
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
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <div>No results found</div>
            )}
          </div>

    </section>
    </AnimatedSwitch>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
