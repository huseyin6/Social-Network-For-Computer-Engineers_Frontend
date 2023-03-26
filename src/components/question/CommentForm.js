import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/question';

const CommentForm = ({ questionId, addComment }) => {
  const [description, setDescription] = useState('');

  return (
    <div className='post-form'>

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
        <div>
        <input type='submit' className='btn btn-primary my-1' value='Submit' />
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
