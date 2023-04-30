import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts, searchPost } from '../../actions/post';

const Posts = ({ getPosts, searchPost, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [search, setSearch] = useState('');
  return (
    <section className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchPost({ search });
          setSearch('');
        }}
      >
        <input
          className='my-input'
          type='text'
          value={search}
          placeholder='Search Post'
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type='submit' className='btn btn-primary my-1' value='Search' />
      </form>
      <br />
      <hr />
      <br />
      <PostForm />
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  searchPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts, searchPost })(Posts);
