import { useEffect, useState } from "react";

import AddTodoForm from "../../components/AddTodoForm/AddTodoForm";
import TodoList from "../../components/TodoList/TodoList";
import Todo from "../../models/todo";
import classes from "./TodoPage.module.css";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { Navigate, useLocation } from "react-router-dom";
import todoApiService from "../../services/todoApiService";
import TodoCategory from "../../models/todoCategory";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const TodoPage = (): JSX.Element => {
  const { state } = useLocation();

  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [nextSortByPriority, setNextSortByPriority] = useState<"desc" | "asc">(
    "asc"
  );
  const [sortBtnText, setSortBtnText] = useState<string>("Sort by Priority");

  useEffect(() => {
    const getOptions = async () => {
      try {
        const categoriesOptions = await todoApiService.getTodoCategories();
        setCategories(categoriesOptions);
      } catch (error) {
        alert("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    getOptions();
  }, []);

  //--- Methods ---//
  const toggleNextSortByPriority = () => {
    if (nextSortByPriority === "asc") {
      setNextSortByPriority("desc");
      setSortBtnText("Sort by lowest priority");
      return;
    }

    setNextSortByPriority("asc");
    setSortBtnText("Sort by highest priority");
  };

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

    toggleNextSortByPriority();
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : state?.username ? (
    <div className={classes.container}>
      <div className={classes.todo_form_container}>
        <Card title={`Hello, ${state.username}`}>
          <AddTodoForm
            todoCategories={categories}
            onSubmit={onTodoFormSubmit}
          />
        </Card>
      </div>

      <div className={classes.listContainer}>
        <Button
          onClick={onSortByPriorityBtnClickHandler}
          className={classes.sortBtn}
        >
          {sortBtnText}
        </Button>
        <TodoList
          onTodoDeleteClicked={onTodoDeleteClickHandler}
          todos={todos}
        />
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default TodoPage;
