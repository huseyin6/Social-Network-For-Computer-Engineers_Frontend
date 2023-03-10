import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import QuestionItem from '../questions/QuestionItem';
import CommentForm from '../question/CommentForm';
import CommentItem from '../question/CommentItem';
import { getQuestion } from '../../actions/question';

const Question = ({ getQuestion, question: { question, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getQuestion(id);
  }, [getQuestion, id]);

  return loading || question === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <Link to='/questions' className='btn'>
        Back To Q&A
      </Link>
      <QuestionItem question={question} showActions={false} />
      <CommentForm questionId={question._id} />
      <div className='comments'>
        {question.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            questionId={question._id}
          />
        ))}
      </div>
    </section>
  );
};

Question.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps, { getQuestion })(Question);
