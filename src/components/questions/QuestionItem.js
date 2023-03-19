import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { CopyBlock } from 'react-code-blocks';
import { addLike, deleteQuestion } from '../../actions/question';

const QuestionItem = ({
  auth,
  addLike,
  deleteQuestion,
  question: {
    _id,
    description,
    code,
    language,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
  },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{description}</p>
      {code && language && (
        <CopyBlock
          text={code}
          language={language}
          showLineNumbers={true}
          wrapLines
          theme={'dracula'}
        />
      )}
      <p className='post-date'>Posted on {formatDate(date)}</p>
      <button
        onClick={() => addLike(_id)}
        type='button'
        className='btn btn-light'
      >
        <i className='fas fa-thumbs-up' />{' '}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>

      <Link to={`/questions/${_id}`} className="btn btn-light">
      <i class="fa fa-comment" aria-hidden="true"></i>
        {' '}{comments.length > 0 && (
          <span >{comments.length}</span>
        )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteQuestion(_id)}
          type='button'
          className="btn btn-light"
        >
          <i className="fas fa-trash-alt"></i >
        </button>
      )}
    </div>
  </div>
);

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, deleteQuestion })(
  QuestionItem
);
