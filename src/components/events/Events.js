import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../../actions/question';

const Questions = ({ getQuestions, question: { questions } }) => {
  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <section className='container'>
      <h1 className='large text-primary'>Events</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the events page
      
        
        <img src="https://images-prod.dazeddigital.com/640/0-58-1080-720/azure/dazed-prod/1320/8/1328021.jpg" 
        height="100" max width="%50"
        
        
        

        alt="Lady Gaga Concert"></img>

        <input type='submit' className='btn btn-dark my-1' value='100€' /*onClick={}*/ />
        <input type='button' className='btn btn-dark my-1' value='Lady Gaga Concert' /*onClick={}*/ />
        <input type='submit' className='btn btn-dark my-1' value='Istanbul-IF Performance Hall' /*onClick={}*/ />
        
        <input type="checkbox" className='btn btn-dark my-1' />

        <img src="https://images-prod.dazeddigital.com/640/0-58-1080-720/azure/dazed-prod/1320/8/1328021.jpg" 
        height="100" max width="%50"
        
        
        

        alt="Lady Gaga Concert"></img>

        <input type='submit' className='btn btn-dark my-1' value='100€' /*onClick={}*/ />
        <input type='button' className='btn btn-dark my-1' value='Lady Gaga Concert' /*onClick={}*/ />
        <input type='submit' className='btn btn-dark my-1' value='Istanbul-IF Performance Hall' /*onClick={}*/ />
        
        <input type="checkbox" className='btn btn-dark my-1' />

        <img src="https://images-prod.dazeddigital.com/640/0-58-1080-720/azure/dazed-prod/1320/8/1328021.jpg" 
        height="100" max width="%50"
        
        
        

        alt="Lady Gaga Concert"></img>

        <input type='submit' className='btn btn-dark my-1' value='100€' /*onClick={}*/ />
        <input type='button' className='btn btn-dark my-1' value='Lady Gaga Concert' /*onClick={}*/ />
        <input type='submit' className='btn btn-dark my-1' value='Istanbul-IF Performance Hall' /*onClick={}*/ />
        
        <input type="checkbox" className='btn btn-dark my-1' />
      </p>
      
      
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
