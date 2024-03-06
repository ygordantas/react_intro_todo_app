import { useState } from "react";

import AddTodoForm from "../components/AddTodoForm/AddTodoForm";
import TodoList from "../components/TodoList/TodoList";
import Todo from "../models/todo";
import classes from "./TodoPage.module.css";

const TodoPage = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);

  //--- Methods ---//
  const onTodoFormSubmit = (newTodo: Todo) => {
    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  return (
    <div className={classes.container}>
      <AddTodoForm onSubmit={onTodoFormSubmit} />
      <TodoList todos={todos} />
    </div>
  );
};

export default TodoPage;
