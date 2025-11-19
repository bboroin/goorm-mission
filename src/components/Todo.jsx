import React from "react";

const Todo = ({ todo, onToggle, onDelete }) => {
  return (
    <li key={todo.id} className={`item ${todo.completed ? "item--done" : ""}`}>
      <div className="title" onClick={() => onToggle(todo)}>
        {" "}
        {todo.title}
      </div>
      <div>
        <button
          className="control-btn"
          type="button"
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default Todo;
