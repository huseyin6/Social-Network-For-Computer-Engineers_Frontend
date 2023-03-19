import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';
import QuestionForm from './QuestionForm';
import { getQuestions } from '../../actions/question';

const Questions = ({ getQuestions, question: { questions } }) => {
  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <section className='container'>
      <h1 className='large text-primary'>Q&A</h1>
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
};

const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps, { getQuestions })(Questions);
