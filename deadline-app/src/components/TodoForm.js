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
      <div className='input-animation'>
        <input
          onChange={inputChange}
          name='name'
          value={props.todoFormState.name}
          type='text'
          required
          // placeholder='Name'
        />
        <label htmlFor='name' className='label-name'>
          <span className='content-name'>Name</span>
        </label>
      </div>
      <div className='input-animation'>
        <input
          onChange={inputChange}
          name='date'
          type='date'
          // className='date'
          value={props.todoFormState.date}
          required
        />
        <label htmlFor='date' className='label-name'>
          <span className='content-name'>Date</span>
        </label>
      </div>

      <div id='priority'>
        <label>
          Priority
          <div className='radio-container'>
            <input
              type='radio'
              id='low'
              name='priority'
              value={priorityValues.LOW}
              checked={checkPriorityValue(priorityValues.LOW)}
              onChange={inputChange}
            />
            <label htmlFor='low' className='radio'>
              Low
            </label>
            <input
              type='radio'
              id='medium'
              name='priority'
              value={priorityValues.MEDIUM}
              checked={checkPriorityValue(priorityValues.MEDIUM)}
              onChange={inputChange}
            />
            <label htmlFor='medium' className='radio'>
              Medium
            </label>
            <input
              type='radio'
              id='high'
              name='priority'
              value={priorityValues.HIGH}
              checked={checkPriorityValue(priorityValues.HIGH)}
              onChange={inputChange}
            />
            <label htmlFor='high' className='radio'>
              High
            </label>
          </div>
        </label>
      </div>
      <div className='input-animation'>
        <input
          onChange={inputChange}
          name='list'
          type='text'
          value={props.todoFormState.list}
          required
          // placeholder='Task List'
        />
        <label htmlFor='list' className='label-name'>
          <span className='content-name'>Task List</span>
        </label>
      </div>
      <div className='input-animation'>
        <input
          onChange={inputChange}
          name='description'
          type='text'
          value={props.todoFormState.description}
          required
          // placeholder='Description'
        />
        <label htmlFor='description' className='label-name'>
          <span className='content-name'>Description</span>
        </label>
      </div>
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
