import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/question';

const CommentForm = ({ questionId, addComment }) => {
  const [description, setDescription] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(questionId, { description });
          setDescription('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Answer the question'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
