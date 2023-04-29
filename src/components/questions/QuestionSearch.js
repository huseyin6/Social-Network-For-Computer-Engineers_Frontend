import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';
import QuestionForm from './QuestionForm';
import { Link, Navigate , useNavigate, useParams } from 'react-router-dom';
import { searchQA } from '../../actions/question';

const QuestionSearch = ({ searchQA, question : {searchqa} }) => {
  const { key } = useParams();
  useEffect(() => {
    searchQA(key);
  }, [searchQA, key]);
  console.log(searchqa);
  const [text, setText] = useState(key);
  const navigate = useNavigate();
  return (
    <section className='container'>
      <h1 className='large text-primary'>Q&A</h1>
      <form onSubmit={(e) => {
          e.preventDefault();
          navigate(`/questions/search/${text}`);
          setText('');
        }}>
        <input
          type='text'
          value={text}
          placeholder='Search'
          onChange={(e) => setText(e.target.value)}
        />
        <input type='submit' className='btn2 btn-primary my-1' value='Submit' />
        </form> 
      <QuestionForm />
      <div className='posts'>
        {searchqa.length > 0 ? (
          <Fragment>
        {searchqa.map((question) => (
          <QuestionItem key={question._id} question={question} />
        ))}
        </Fragment>) : (
          <div>No results found</div>
        )}
      </div>
    </section>
  );
};

QuestionSearch.propTypes = {
  question: PropTypes.object.isRequired,
  searchQA : PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps, { searchQA })(QuestionSearch);
