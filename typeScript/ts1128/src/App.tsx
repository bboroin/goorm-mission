import { useEffect, useState } from "react";
import "./App.css";
import type { Todo } from "./types/todo";

const BASE_URL = "http://localhost:4000/todos";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);

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

  return <div></div>;
}

export default App;
