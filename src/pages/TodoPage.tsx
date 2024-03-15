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

  const onTodoDeleteClickHandler = (index: number) => {
    setTodos((currentTodos) => {
      const copy = [...currentTodos];
      copy.splice(index,1);
      return copy;
    });
  };

  return (
    <div className={classes.container}>
      <AddTodoForm onSubmit={onTodoFormSubmit} />
      <TodoList onTodoDeleteClicked={onTodoDeleteClickHandler} todos={todos} />
    </div>
  );
};

export default TodoPage;
