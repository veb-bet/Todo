import React, { useState } from "react";
import "./style.css"; // импортируем CSS-файл

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h1 className="todo-app__title">Todo List</h1>
      <div className="todo-app__input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          placeholder="Add a new task"
          className="todo-app__input"
        />
        <button onClick={addTask} className="todo-app__add-button">
          Add Task
        </button>
      </div>
      <ul className="todo-app__list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`todo-app__item ${task.completed ? "todo-app__item--completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
              className="todo-app__checkbox"
            />
            {task.completed ? (
              <strike className="todo-app__text">{task.text}</strike>
            ) : (
              <span
                onDoubleClick={() => {
                  const newText = prompt("Edit task:", task.text);
                  if (newText !== null) {
                    editTask(index, newText);
                  }
                }}
                className="todo-app__text"
              >
                {task.text}
              </span>
            )}
            <button
              onClick={() => deleteTask(index)}
              className="todo-app__delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
