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

  const addTodo = () => {
    if (ToDo.trim() !== '') {
      setToDos([{id: Date.now(), text: ToDo, status: false}, ...toDos]);
      setToDo('');
    }
  };

  const toggleTodoStatus = (id) => {
    setToDos(prevToDos =>
      prevToDos.map(todo =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setToDos(prevToDos => prevToDos.filter(todo => todo.id !== id));
  };

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
          onClick={addTodo} 
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((TODO) => {
          return (
            <div className="todo" key={TODO.id}>
              <div className="left">
                <input 
                  onChange={() => toggleTodoStatus(TODO.id)}
                  value={TODO.status}
                  type="checkbox"
                  checked={TODO.status}
                  name=""
                  id=""
                />
                <p style={{ textDecoration: TODO.status ? 'line-through' : 'none' }}>{TODO.text}</p>
              </div>
              <div className="right">
                <i 
                  className="fas fa-times"
                  onClick={() => removeTodo(TODO.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
