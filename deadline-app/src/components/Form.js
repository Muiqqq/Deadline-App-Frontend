import React from 'react';

const Form = () => {
  return (
    <form>
      <input className='input-name' type='text' placeholder='Name' />
      <input className='input-date' type='date' placeholder='Date' />
      <label>Priority</label>
      <div id='priority'>
        <input type='radio' id='low' name='priority' />
        <input type='radio' id='medium' name='priority' />
        <input type='radio' id='high' name='priority' />
      </div>
      <input className='input-list' type='text' placeholder='Task List' />
      <textarea
        className='input-description'
        type='text'
        placeholder='Description'
      />
      <button className='form-button' type='submit'>
        Add
      </button>
    </form>
  );
};

export default Form;
