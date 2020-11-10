import React from 'react';

// const Form = () => {
//   const getInput = (e) => {
//     console.log(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <form>
//       <input
//         onChange={getInput}
//         className='input-name'
//         type='text'
//         placeholder='Name'
//       />
//       <input
//         onChange={getInput}
//         className='input-date'
//         type='date'
//         placeholder='Date'
//       />
//       <label>
//         Priority
//         <div id='priority'>
//           <input type='radio' id='low' name='priority' />
//           <input type='radio' id='medium' name='priority' />
//           <input type='radio' id='high' name='priority' />
//         </div>
//       </label>
//       <input className='input-list' type='text' placeholder='Task List' />
//       <textarea
//         className='input-description'
//         type='text'
//         placeholder='Description'
//       />
//       <button className='form-button' type='submit'>
//         Add
//       </button>
//     </form>
//   );
// };

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      priority: '3',
      list: '',
      description: '',
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
    console.log(this.state);
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
