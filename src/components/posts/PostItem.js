import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike,addDislike , deletePost } from '../../actions/post'; //Dislike will be added

const PostItem = ({
  addLike,
  addDislike,//Dislike
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, dislikes, comments, date }//We need ot add dislike future
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>

      <button
        onClick={() => addLike(_id)}//Implement remove like functionality in addlike function
        type="button"
        className="btn btn-light"
      >
        <i className="fas fa-thumbs-up" />{' '}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>
      
      <button
        onClick={() => addDislike(_id)} //It also needs to increase dislikes length and amount
        type="button"
        className="btn btn-light"
      >
        <i className="fas fa-thumbs-down" />{' '}
        <span>{dislikes.length > 0 && <span>{dislikes.length}</span>}</span> 
      </button>

      <Link to={`/posts/${_id}`} className="btn btn-primary">
        Discussion{' '}
        {comments.length > 0 && (
          <span className="comment-count">{comments.length}</span>
        )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deletePost(_id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired,//Adddislike will be implemented
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, addDislike, deletePost })( // Adddislike will be implementedd
  PostItem
);