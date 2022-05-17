import React, { useState, useRef } from "react";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleAddToDo = (e) => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  };

  const handleClearTodos = () => {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  };

  return (
    <div className="container-fluid p-5">
      <h1 className="text-light">My React.JS To DO List</h1>
      <div className="card shadow p-3 mb-5 bg-body rounded">
        <div className="card-body">
          <h2 className="card-title">
            {todos.length === 0
              ? "The list is empty, please add something"
              : "My important tasks List"}
          </h2>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
      </div>

      <input
        className="border border-dark task-input"
        ref={todoNameRef}
        type="text"
        placeholder="Enter your new task"
        autoFocus
      ></input>
      <div className="button">
        <button className="btn btn-success shadow" onClick={handleAddToDo}>
          Add Todo
        </button>
        <button className="btn btn-danger shadow" onClick={handleClearTodos}>
          Clear Completed Todos
        </button>
      </div>

      <div className="fst-italic text-light">
        {todos.filter((todo) => !todo.complete).length} left to do
      </div>
    </div>
  );
}

export default App;
