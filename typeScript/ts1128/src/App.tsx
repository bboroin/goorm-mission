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

  const handleEditTodo = async (todo: Todo) => {
    const newTitle = window.prompt("변경할 내용을 입력하세요", todo.title);

    if (newTitle === null) return;
    if (!newTitle.trim()) {
      alert("내용이 비어 있습니다.");
      return;
    }

    await fetch(`${BASE_URL}/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });

    setTodoList((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, title: newTitle } : t))
    );
  };

  const handleDeleteTodo = async (id: Todo["id"]) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
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
            <div className="control-btns">
              <button
                className="control-btn"
                onClick={() => {
                  handleEditTodo(todo);
                }}
              >
                수정
              </button>
              <button
                className="control-btn"
                onClick={() => {
                  handleDeleteTodo(todo.id);
                }}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
