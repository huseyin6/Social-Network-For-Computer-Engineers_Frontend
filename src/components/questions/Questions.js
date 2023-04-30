import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';
import QuestionForm from './QuestionForm';
import { getQuestions, searchQA } from '../../actions/question';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Questions = ({ getQuestions, searchQA, question: { questions } }) => {
  useEffect(() => {
    getQuestions();
  }, [getQuestions]);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  return (
    <section className='container'>
      <h1 className='large text-primary'>Q&A</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/questions/search/${text}`);
          setText('');
        }}
      >
        <input
          className='my-input'
          type='text'
          value={text}
          placeholder='Search Question'
          onChange={(e) => setText(e.target.value)}
        />
        <input type='submit' className='btn btn-primary my-1' value='Search' />
      </form>
      <br />
      <hr />
      <br />
      <QuestionForm />
      <div className='posts'>
        {questions.map((question) => (
          <QuestionItem key={question._id} question={question} />
        ))}
      </div>
    </section>
  );
};

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  searchQA: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps, { getQuestions, searchQA })(Questions);
