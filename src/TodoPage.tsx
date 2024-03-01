import { useState } from "react";

import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

const TodoPage = (): JSX.Element => {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <div>
      <AddTodoForm />
      <TodoList todos={todos} />
    </div>
  );
};

export default TodoPage;
