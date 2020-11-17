import React from 'react';

// NOTE! TodoForm now generates random id for added items for item removal to work.
// Refactor this when using database.
class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      priority: '',
      list: '',
      description: '',
      isdone: false,
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
      priority: '',
      list: '',
      description: '',
      isdone: false,
      id: Math.random() * 1000,
    });
  }

  handleRadioButtonSelection = (e) => {
    this.setState({ priority: e.target.value });
  };

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
            <div>
              <label for='3'>Low</label>
              <input
                onChange={this.inputChange}
                type='radio'
                id='low'
                value='3'
                name='priority'
              />
            </div>
            <div>
              <label for='2'>Medium</label>
              <input
                onChange={this.inputChange}
                type='radio'
                id='medium'
                value='2'
                name='priority'
              />
            </div>
            <div>
              <label for='2'>High</label>
              <input
                onChange={this.inputChange}
                type='radio'
                id='high'
                value='1'
                name='priority'
              />
            </div>
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
