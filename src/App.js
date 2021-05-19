import { useState } from 'react';

function App() {
  const [state, setstate] = useState({
    name: '',
    number: ''
  })
  const {name, number} = state;
  const onChange = (e) => {
    const {value,name} = e.target;
    setstate({
      ...state,
      [name]: value
    })
    console.log(state)
  }
  return (
    <div className="App">
      <form method='post' action='http://localhost:3001'>
            <div className='name'>
              <label htmlFor='name'>Enter Name:</label>
              <input type='text' name='name' onChange={onChange}/>
            </div>
            <div className='number'>
              <label htmlFor='rollno'>Enter Number:</label>
              <input type='text' name='number' onChange={onChange}/>
            </div>
            <div className='submit'>
              <input type='submit'/>
            </div>            
        </form>   
    </div>
  );
}

export default App;
