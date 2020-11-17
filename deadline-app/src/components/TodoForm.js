import React from 'react';

// NOTE! TodoForm now generates random id for added items for item removal to work.
// Refactor this when using database.

function TodoForm(props) {
  const inputChange = (e) => {
    props.onInputChange(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (props.todoFormState.name === '') return;
    props.onFormSubmit(props.todoFormState);
  };

  return (
    <form>
      <input
        onChange={inputChange}
        name='name'
        value={props.todoFormState.name}
        type='text'
        placeholder='Name'
      />
      <input
        onChange={inputChange}
        name='date'
        type='date'
        value={props.todoFormState.date}
        placeholder='Date'
      />
      <label>
        Priority
        <div id='priority' onChange={inputChange}>
          <div>
            <label for='3'>Low</label>
            <input type='radio' id='low' name='priority' value='3' />
          </div>
          <div>
            <label for='2'>Medium</label>
            <input type='radio' id='medium' name='priority' value='2' />
          </div>
          <div>
            <label for='1'>High</label>
            <input type='radio' id='high' name='priority' value='1' />
          </div>
        </div>
      </label>
      <input
        onChange={inputChange}
        name='list'
        type='text'
        value={props.todoFormState.list}
        placeholder='Task List'
      />
      <textarea
        onChange={inputChange}
        name='description'
        type='text'
        value={props.todoFormState.description}
        placeholder='Description'
      />
      <button onClick={submitHandler} className='form-button' type='submit'>
        {props.submitButtonLabel}
      </button>
    </form>
  );
}

export default TodoForm;
