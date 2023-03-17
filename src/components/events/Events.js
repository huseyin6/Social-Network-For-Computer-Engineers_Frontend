import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../../actions/question';

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
        <p className='p.a'/>
        <p className='p.a'/>
        <img src="https://images-prod.dazeddigital.com/640/0-58-1080-720/azure/dazed-prod/1320/8/1328021.jpg" 
        height="100" max width="%75"
        alt=""></img >

        <input type='submit' className='btn2' value='Details' /*onClick={}*/ />
        <input type='submit' className='btn2' value='Attend' /*onClick={}*/ />


        <img src="https://assets.dicebreaker.com/chess-playing-hand.jpeg/BROK/thumbnail/1600x900/quality/100/chess-playing-hand.jpeg" 
        height="100" max width="%50"
        alt="Lady Gaga Concert"></img>

        <input type='submit' className='btn2' value='Details' /*onClick={}*/ />
        <input type='submit' className='btn2' value='Attend' /*onClick={}*/ />
        
     

        <img src="https://gaiadergi.com/wp-content/uploads/2016/01/Agac-dikimi-isine-girmek-3.jpg" 
        height="100" max width="%50"
        alt="Lady Gaga Concert"></img>

        <input type='submit' className='btn2' value='Details' /*onClick={}*/ />
        <input type='submit' className='btn2' value='Attend' /*onClick={}*/ />

        <img src="https://www.ucf.edu/news/files/2022/03/game-design.jpg" 
        height="100" max width="%50"
        alt="Lady Gaga Concert"></img>

        <input type='submit' className='btn2' value='Details' /*onClick={}*/ />
        <input type='submit' className='btn2' value='Attend' /*onClick={}*/ />

     
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
