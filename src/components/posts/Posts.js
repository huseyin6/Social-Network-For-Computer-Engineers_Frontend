import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { useNavigate } from 'react-router-dom';
import AnimatedSwitch from '../../AnimatedSwitch';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const navigate = useNavigate();
  const [text, setText] = useState('');
  return (
    <AnimatedSwitch>
    <section className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/posts/search/${text}`);
          setText('');
        }}
      >
        <input
          className='my-input'
          type='text'
          value={text}
          placeholder='Search Post'
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit' className='btn btn-primary my-1' ><i class="fa fa-search" aria-hidden="true"></i></button>
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
    </AnimatedSwitch>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
