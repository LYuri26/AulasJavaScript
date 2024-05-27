// TodoList.js
import React, { useState } from "react";
import "./TodoList.css"; // Importando o arquivo de estilos

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), name: taskName, completed: false },
      ]);
      setTaskName("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="todo-list-container">
      <input
        type="text"
        value={taskName}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Add a new task"
        className="task-input"
      />
      <button onClick={handleAddTask} className="add-button">
        Add Task
      </button>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? "completed-task" : ""}
          >
            {task.name}
            <button onClick={() => handleCompleteTask(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
