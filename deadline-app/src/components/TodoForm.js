import React from 'react';

function TodoForm(props) {
  const inputChange = (e) => {
    props.onInputChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.todoFormState.name === '') return;
    props.onFormSubmit(props.todoFormState);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.onFormCancel();
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
      <button onClick={handleSubmit} className='form-button' type='submit'>
        {props.submitButtonLabel}
      </button>
      <button onClick={handleCancel} className='form-button' type='submit'>
        Cancel
      </button>
    </form>
  );
}

export default TodoForm;
