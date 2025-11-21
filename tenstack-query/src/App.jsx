import React from "react";
import "./App.css";
import Todos from "./components/Todos";

const App = () => {
  return (
    <section>
      <header>
        <h2>Todo List - TanStack Query</h2>
      </header>
      <Todos />
    </section>
  );
};

export default App;
