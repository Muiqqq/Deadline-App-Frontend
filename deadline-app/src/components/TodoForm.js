import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      priority: '3',
      list: '',
      description: '',
      id: Math.random() * 1000,
    };

    this.inputChange = this.inputChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  inputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.state.name === '') return;
    this.props.onFormSubmit(this.state);
    this.setState({
      name: '',
      date: '',
      priority: '3',
      list: '',
      description: '',
      id: Math.random() * 1000,
    });
  }

  render() {
    return (
      <form>
        <input
          onChange={this.inputChange}
          name='name'
          value={this.state.name}
          type='text'
          placeholder='Name'
        />
        <input
          onChange={this.inputChange}
          name='date'
          type='date'
          value={this.state.date}
          placeholder='Date'
        />
        <label>
          Priority
          <div id='priority'>
            <input type='radio' id='low' name='priority' />
            <input type='radio' id='medium' name='priority' />
            <input type='radio' id='high' name='priority' />
          </div>
        </label>
        <input
          onChange={this.inputChange}
          name='list'
          type='text'
          value={this.state.list}
          placeholder='Task List'
        />
        <textarea
          onChange={this.inputChange}
          name='description'
          type='text'
          value={this.state.description}
          placeholder='Description'
        />
        <button
          onClick={this.submitHandler}
          className='form-button'
          type='submit'
        >
          Add
        </button>
      </form>
    );
  }
}

export default TodoForm;
