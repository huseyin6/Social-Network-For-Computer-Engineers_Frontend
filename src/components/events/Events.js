import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../../actions/question';
import { attendEvent } from '../../actions/event';

const Questions = ({ getQuestions, question: { questions } }) => {
  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <section className='eventcontainer'>
      <h1 className='large text-primary'>Events</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the events page
        <p className='p.a'/>
        <div className='bg-primary p'>
        <h4>Attend an Event...</h4>
        </div> 
        <p className='p.a'/>
        <p className='p.a'/>
        <p className='p.a'/>

        <div className="posts">

        <div className="post2 bg-white p-1 my-1">
        <img src="https://assets.dicebreaker.com/chess-playing-hand.jpeg/BROK/thumbnail/1600x900/quality/100/chess-playing-hand.jpeg" 
        height="100" max width="%50"
        alt="Lady Gaga Concert"></img>
        

        <button
        type='button'
        className='btn2 btn-light' width='%50'
        >
        <i className='fas fa-question' />{' '}
      
        </button>
        <a href="#" class="btn2 btn2-white btn2-animate small text-primary" /*onClick={attendEvent(id,userID)}*/>Attend</a>
        </div>
     
        <div className="post2 bg-white p-1 my-1">
        <img src="https://gaiadergi.com/wp-content/uploads/2016/01/Agac-dikimi-isine-girmek-3.jpg" 
        height="100" max width="%50"
        alt="Lady Gaga Concert"></img>

        <button
        type='button'
        className='btn2 btn-light' width='%50'
        >
        <i className='fas fa-question' />{' '}
      
        </button>
        <a href="#" class="btn2 btn2-white btn2-animate small text-primary" /*onClick={attendEvent(id,userID)}*/>Attend</a>
        </div>
        
        <div className="post2 bg-white p-1 my-1">
        <img src="https://www.ucf.edu/news/files/2022/03/game-design.jpg" 
        height="100" max width="%50"
        alt="Lady Gaga Concert"></img>

        <button
        type='button'
        className='btn2 btn-light' width='%50'
        >
        <i className='fas fa-question' />{' '}
      
        </button>
        <a href="#" class="btn2 btn2-white btn2-animate small text-primary" /*onClick={attendEvent(id,userID)}*/>Attend</a>
        </div>

      
        
        </div> 
      
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
