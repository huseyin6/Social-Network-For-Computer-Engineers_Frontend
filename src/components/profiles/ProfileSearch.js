import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { searchProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import AnimatedSwitch from '../../AnimatedSwitch';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileSearch = ({
  searchProfiles,
  profile: { searchResults, loading },
}) => {
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await searchProfiles(key);
      setIsLoading(false);
    };
    fetchData();
  }, [searchProfiles, key]);

  const [text, setText] = useState(key);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className='container'>
        <Spinner/>
      </div>
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
              }}
            >
              <input
                className='my-input'
                type='text'
                value={text}
                placeholder='Search Engineers'
                onChange={(e) => setText(e.target.value)}
              />
              <button type='submit' className='btn btn-primary my-1'>
                <i class='fa fa-search' aria-hidden='true'></i>
              </button>
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
