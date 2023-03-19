import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions/question';

const QuestionForm = ({ addQuestion }) => {
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  //   const { description, codeBlock, language } = formData;

  //   const onChange = (e) =>
  //     setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className='post-form'>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addQuestion({ description, code, language });
          setDescription('');
          setCode('');
          setLanguage('');
        }}
      >
        <textarea
          name='description'
          cols='30'
          rows='5'
          placeholder='Type your question...'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          name='language'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>* Select Your Sample Code's Language</option>
          <option value='bash'>Bash</option>
          <option value='c'>C</option>
          <option value='cpp'>C++</option>
          <option value='csharp'>C#</option>
          <option value='dart'>Dart</option>
          <option value='erlang'>Erlang</option>
          <option value='go'>Go</option>
          <option value='html'>HTML</option>
          <option value='java'>Java</option>
          <option value='javascript'>Javascript</option>
          <option value='jsx'>JSX</option>
          <option value='Kotlin'>Kotlin</option>
          <option value='lisp'>Lisp</option>
          <option value='makefile'>makefile</option>
          <option value='mathlab'>mathlab</option>
          <option value='objectivec'>ObjectiveC</option>
          <option value='php'>PHP</option>
          <option value='python'>Python</option>
          <option value='r'>R</option>
          <option value='ruby'>Ruby</option>
          <option value='rust'>Rust</option>
          <option value='scala'>Scala</option>
          <option value='sql'>SQL</option>
          <option value='swift'>Swift</option>
          <option value='typescript'>Typescript</option>
        </select>
        <textarea
          name='code'
          cols='50'
          rows='5'
          placeholder='Type your code...'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div>
        <input type='submit' className='btn btn-primary my-1' value='Submit' />
        </div>
      </form>
    </div>
  );
};

QuestionForm.propTypes = {
  addQuestion: PropTypes.func.isRequired,
};

export default connect(null, { addQuestion })(QuestionForm);
