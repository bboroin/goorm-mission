export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type ToggleTodo = Omit<Todo, "title">;
