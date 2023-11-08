import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [ToDo, setToDo] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    setCurrentDay(` it's ${days[today]} Set your Goals ⚛⚛`);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDos));
  }, [toDos]);

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>{currentDay}</h2>
      </div>
      <div className="input">
        <input 
          value={ToDo} 
          onChange={(event) => setToDo(event.target.value)} 
          type="text" 
          placeholder="🖊️ Add item..." 
        />
        <i 
          onClick={() => setToDos([{id: Date.now(), text: ToDo, status: false}, ...toDos])} 
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((TODO, index) => {
          return (
            <div className="todo" key={TODO.id}>
              <div className="left">
                <input 
                  onChange={(e) => {
                    setToDos(prevToDos => prevToDos.map(obj => {
                      if (obj.id === TODO.id) {
                        obj.status = e.target.checked;
                      }
                      return obj;
                    }));
                  }}
                  value={TODO.status}
                  type="checkbox"
                  checked={TODO.status}
                  name=""
                  id=""
                />
                <p style={{ textDecoration: TODO.status ? 'line-through' : 'none' }}>{TODO.text}</p>
              </div>
              <div className="right">
                {TODO.status ? (
                  <i className="fas fa-check" style={{ color: 'green' }}></i>
                ) : (
                  <i 
                    className="fas fa-times"
                    onClick={() => {
                      setToDos(prevToDos => prevToDos.filter(obj => obj.id !== TODO.id));
                    }}
                  ></i>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
