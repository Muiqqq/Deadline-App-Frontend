import React from 'react';

function TodoForm(props) {
  const priorityValues = {
    LOW: '3',
    MEDIUM: '2',
    HIGH: '1',
  };

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

  const checkPriorityValue = (value) => {
    return props.todoFormState.priority === value;
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
        <div id='priority'>
          <div>
            <label htmlFor='low'>Low</label>
            <input
              type='radio'
              id='low'
              name='priority'
              value={priorityValues.LOW}
              checked={checkPriorityValue(priorityValues.LOW)}
              onChange={inputChange}
            />
          </div>
          <div>
            <label htmlFor='medium'>Medium</label>
            <input
              type='radio'
              id='medium'
              name='priority'
              value={priorityValues.MEDIUM}
              checked={checkPriorityValue(priorityValues.MEDIUM)}
              onChange={inputChange}
            />
          </div>
          <div>
            <label htmlFor='high'>High</label>
            <input
              type='radio'
              id='high'
              name='priority'
              value={priorityValues.HIGH}
              checked={checkPriorityValue(priorityValues.HIGH)}
              onChange={inputChange}
            />
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
      <div className='submitbuttons'>
        <button
          onClick={handleSubmit}
          id='submit'
          className='form-button'
          type='submit'
        >
          {props.submitButtonLabel}
        </button>
        <button
          onClick={handleCancel}
          id='cancel'
          className='form-button'
          type='submit'
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
