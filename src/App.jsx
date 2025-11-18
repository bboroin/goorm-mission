import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:4000/todos");
    return res.data;
  };

  const {
    data: todos = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <section>
      <header>
        <h2>Todo List - Tanstack Query</h2>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("입력 값:", todo);
        }}
      >
        <input
          placeholder="할 일"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="item">
            <div className="title">{todo.title}</div>
            <p>{todo.completed ? "완료" : "진행 중"}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default App;
