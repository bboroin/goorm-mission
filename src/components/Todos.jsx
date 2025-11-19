import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Todo from "./Todo";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [tab, setTab] = useState("all");
  const queryClient = useQueryClient();

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:4000/todos");
    return res.data;
  };

  const addTodo = async (newTodo) =>
    await axios.post("http://localhost:4000/todos", newTodo);

  const toggleTodo = async (todo) =>
    await axios.patch(`http://localhost:4000/todos/${todo.id}`, {
      completed: !todo.completed,
    });

  const deleteTodo = async (id) => {
    const res = await axios.delete(`http://localhost:4000/todos/${id}`);
    return res.data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (todos) => {
      const completed = todos.filter((t) => t.completed);
      const pending = todos.filter((t) => !t.completed);
      return { completed, pending };
    },
  });

  const { mutate: addTodoMutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setTodo("");
    },
  });

  const { mutate: toggleTodoMutate } = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const { mutate: deleteTodoMutate } = useMutation({
    mutationFn: deleteTodo,
    onError: () => {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const { pending = [], completed = [] } = data || {};

  const filteredTodos =
    tab === "pending"
      ? pending
      : tab === "completed"
      ? completed
      : [...pending, ...completed];

  const handleToggle = (todo) => {
    toggleTodoMutate(todo);
  };

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    deleteTodoMutate(id);
  };

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!todo.trim()) return;
          addTodoMutate({ title: todo, completed: false });
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
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default Todos;
