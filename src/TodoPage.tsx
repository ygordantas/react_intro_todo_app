import { useState } from "react";

import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

// --main content, category, priority, last updated date, user who created

const TodoPage = (): JSX.Element => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const onTodoSubmitHandler = (newTodo: string) => {
    setTodos((currentTodos) => {
      return [...currentTodos, newTodo];
    });
    setTodo("");
  };

  return (
    <div>
      <p>the todo your typing is here: {todo}</p>
      <AddTodoForm
        todo={todo}
        onSubmitTodo={onTodoSubmitHandler}
        onTodoTextChange={(todoText) => setTodo(todoText)}
      />
      <TodoList todos={todos} />
    </div>
  );
};

export default TodoPage;
