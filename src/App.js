import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [ToDo, setToDo] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    setCurrentDay(`It's ${days[today]} - Set your Goals ⚛⚛`);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDos));
  }, [toDos]);

  const addTodo = () => {
    if (ToDo.trim() !== '') {
      setToDos([{ id: Date.now(), text: ToDo, status: false }, ...toDos]);
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
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((todo) => (
          <div className="todo" key={todo.id}>
            <div className="left">
              <label className="checkboxContainer">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleTodoStatus(todo.id)}
                />
                <span className="checkmark"></span>
              </label>
              <p style={{ textDecoration: todo.status ? 'line-through' : 'none' }}>
                {todo.text}
              </p>
            </div>
            <div className="right">
              <i
                className="fas fa-times"
                onClick={() => removeTodo(todo.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
