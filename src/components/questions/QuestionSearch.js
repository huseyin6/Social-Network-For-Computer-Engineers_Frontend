import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';
import QuestionForm from './QuestionForm';
import { useNavigate, useParams } from 'react-router-dom';
import { searchQA } from '../../actions/question';
import Spinner from '../layout/Spinner';

const QuestionSearch = ({ searchQA, question: { searchqa } }) => {
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await searchQA(key);
      setIsLoading(false);
    };
    fetchData();
  }, [searchQA, key]);

  const [text, setText] = useState(key);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className='container'>
        <Spinner/>
      </div>
    );
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Q&A</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/questions/search/${text}`);
        }}
      >
        <input
          className='my-input'
          type='text'
          value={text}
          placeholder='Search Question'
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit' className='btn btn-primary my-1'>
          <i class='fa fa-search' aria-hidden='true'></i>
        </button>
      </form>
      <br />
      <hr />
      <br />
      <QuestionForm />
      <div className='posts'>
        {searchqa.length > 0 ? (
          <Fragment>
            {searchqa.map((question) => (
              <QuestionItem key={question._id} question={question} />
            ))}
          </Fragment>
        ) : (
          <div>No results found</div>
        )}
      </div>
    </section>
  );
};

QuestionSearch.propTypes = {
  question: PropTypes.object.isRequired,
  searchQA: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps, { searchQA })(QuestionSearch);
