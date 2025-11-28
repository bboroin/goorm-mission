import { useEffect, useState } from "react";
import "./App.css";
import type { Todo } from "./types/todo";

const BASE_URL = "http://localhost:4000/todos";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const getTodos = async (): Promise<Todo[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }
    return res.json();
  };

  useEffect(() => {
    getTodos().then((data) => setTodoList(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = async () => {
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    setTodoList((prev) => [...prev, newTodo]);
    setTitle("");
  };

  return (
    <div>
      <h2 className="header">TS + React TodoList</h2>

      <div className="form">
        <input
          className="input"
          type="text"
          value={title}
          onChange={handleChange}
        />
        <button onClick={handleAddTodo}>추가</button>
      </div>

      <ul className="list">
        {todoList.map((todo) => (
          <li key={todo.id} className="item">
            <span className="title">{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
