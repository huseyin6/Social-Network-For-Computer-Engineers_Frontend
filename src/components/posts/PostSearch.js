import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { searchPost } from '../../actions/post';
import { useNavigate, useParams } from 'react-router-dom';

const PostSearch = ({ searchPost, post: { searchposts } }) => {
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await searchPost(key);
      setIsLoading(false);
    };
    fetchData();
  }, [searchPost, key]);

  const [text, setText] = useState(key);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className='container'>
        <h1 className='large text-primary'>Posts</h1>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <section className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/posts/search/${text}`);
        }}
      >
        <input
          className='my-input'
          type='text'
          value={text}
          placeholder='Search Posts'
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit' className='btn btn-primary my-1'>
          <i class='fa fa-search' aria-hidden='true'></i>
        </button>
      </form>
      <br />
      <hr />
      <br />
      <PostForm />
      <div className='posts'>
        {searchposts.length > 0 ? (
          <Fragment>
            {searchposts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </Fragment>
        ) : (
          <div>No results found</div>
        )}
      </div>
    </section>
  );
};
PostSearch.propTypes = {
  post: PropTypes.object.isRequired,
  searchPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { searchPost })(PostSearch);
