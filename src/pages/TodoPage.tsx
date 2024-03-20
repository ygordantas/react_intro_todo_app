import { useState } from "react";

import AddTodoForm from "../components/AddTodoForm/AddTodoForm";
import TodoList from "../components/TodoList/TodoList";
import Todo from "../models/todo";
import classes from "./TodoPage.module.css";
import Button from "../components/Button/Button";
import TODO_PRIORITIES from "../constants/todoPriorities";

//TODO: REMOVE THIS
const MOCK_TODOS: Todo[] = [
  { text: "Todo 1", createdAt: new Date(), priority: TODO_PRIORITIES[0] },
  { text: "Todo 2", createdAt: new Date(), priority: TODO_PRIORITIES[1] },
  { text: "Todo 3", createdAt: new Date(), priority: TODO_PRIORITIES[2] },
  { text: "Todo 4", createdAt: new Date(), priority: TODO_PRIORITIES[0] },
  { text: "Todo 5", createdAt: new Date(), priority: TODO_PRIORITIES[1] },
  { text: "Todo 6", createdAt: new Date(), priority: TODO_PRIORITIES[2] },
  { text: "Todo 7", createdAt: new Date(), priority: TODO_PRIORITIES[1] },
];

const TodoPage = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);
  const [nextSortByPriority, setNextSortByPriority] = useState<"desc" | "asc">(
    "asc"
  );

  //--- Methods ---//
  const onTodoFormSubmit = (newTodo: Todo) => {
    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  const onTodoDeleteClickHandler = (index: number) => {
    setTodos((currentTodos) => {
      const copy = [...currentTodos];
      copy.splice(index, 1);
      return copy;
    });
  };

  const onSortByPriorityBtnClickHandler = () => {
    setTodos((currentTodos) => {
      const sortedTodos = [...currentTodos];
      return sortedTodos.sort((a, b) => {
        switch (nextSortByPriority) {
          case "desc":
            return a.priority.sortKey - b.priority.sortKey;
          case "asc":
            return b.priority.sortKey - a.priority.sortKey;
          default:
            return 0;
        }
      });
    });

    if (nextSortByPriority === "asc") return setNextSortByPriority("desc");

    setNextSortByPriority("asc");
  };

  return (
    <div className={classes.container}>
      <AddTodoForm onSubmit={onTodoFormSubmit} />
      <div className={classes.listContainer}>
        <Button
          onClick={onSortByPriorityBtnClickHandler}
          className={classes.sortBtn}
        >
          Sort by Priority
        </Button>
        <TodoList
          onTodoDeleteClicked={onTodoDeleteClickHandler}
          todos={todos}
        />
      </div>
    </div>
  );
};

export default TodoPage;
