import { useEffect, useState } from 'react';

function App() {
  // input
  const [state, setstate] = useState({
    name: '',
    number: ''
  })
  const onChange = (e) => {
    const {value,name} = e.target;
    setstate({
      ...state,
      [name]: value
    })
    console.log(state)
  }

  // 데이터 가져오기
  const [data,setData] = useState([]);
  useEffect(() => {
    fetch("http://3.36.56.119:5000/posts/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      setData(data);
    })
  },[])
  return (
      <div className="App">
          <form method="post" action="http://3.36.56.119:5000/">
              <div className="name">
                  <label htmlFor="name">Enter Name:</label>
                  <input type="text" name="name" onChange={onChange} />
              </div>
              <div className="number">
                  <label htmlFor="rollno">Enter Number:</label>
                  <input type="text" name="number" onChange={onChange} />
              </div>
              <div className="submit">
                  <input type="submit" value="확인"/>
              </div>
          </form>
          <ul>
            {data.map(d => (
              <li>{d.name+'  /  '+d.number}</li>
            ))}
          </ul>
      </div>
  );
}

export default App;
