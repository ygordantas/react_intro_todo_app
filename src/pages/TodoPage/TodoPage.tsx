import { useEffect, useState } from "react";

import { Navigate, useLocation } from "react-router-dom";
import AddTodoForm from "../../components/AddTodoForm/AddTodoForm";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TodoList from "../../components/TodoList/TodoList";
import Todo from "../../models/todo";
import TodoCategory from "../../models/todoCategory";
import TodoPriority from "../../models/todoPriority";
import todoApiService from "../../services/todoApiService";
import classes from "./TodoPage.module.css";

const TodoPage = (): JSX.Element => {
  const { state } = useLocation();

  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [priorities, setPriorities] = useState<TodoPriority[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTodoList, setIsLoadingTodoList] = useState(false);

  //--- Side Effects ---//
  useEffect(() => {
    const getOptions = async () => {
      try {
        const categoriesOptions = await todoApiService.getTodoCategories();
        setCategories(categoriesOptions);

        const priorityOptions = await todoApiService.getTodoPriorities();
        setPriorities(priorityOptions);
      } catch (error) {
        alert("Something went trying to retrieve data from server");
      } finally {
        !state.userId && setIsLoadingPage(false);
      }
    };

    getOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getUserTodos = async () => {
      if (categories.length === 0 || priorities.length === 0) return;

      try {
        !isLoadingPage && setIsLoadingPage(true);
        const userTodos = await todoApiService.getUserTodos(state.userId);
        setTodos(userTodos);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoadingPage(false);
      }
    };

    getUserTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.userId, categories, priorities]);

  //--- Methods ---//
  const onTodoFormSubmit = async (newTodo: Todo) => {
    try {
      setIsSubmitting(true);
      const savedTodo = await todoApiService.createTodo(newTodo);
      setTodos((currentTodos) => [...currentTodos, savedTodo]);
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTodoDeleteClickHandler = async (todoId: string) => {
    console.log(todos);
    console.log(todoId);

    try {
      setIsLoadingTodoList(true);
      await todoApiService.deleteTodo(state.userId, todoId);
      setTodos((currentTodos) => {
        const copy = [...currentTodos];
        const index = copy.findIndex((x) => x._id === todoId);

        copy.splice(index, 1);
        return copy;
      });
    } catch (error) {
      alert(error);
    } finally {
      setIsLoadingTodoList(false);
    }
  };

  return isLoadingPage ? (
    <LoadingSpinner type="page" />
  ) : state?.username ? (
    <div className={classes.container}>
      <div className={classes.todo_form_container}>
        <Card title={`Hello, ${state.username}`}>
          <AddTodoForm
            userId={state.userId}
            todoPriorities={priorities}
            todoCategories={categories}
            isSubmitting={isSubmitting}
            onSubmit={onTodoFormSubmit}
          />
        </Card>
      </div>

      <div className={classes.listContainer}>
        {isLoadingTodoList ? (
          <LoadingSpinner type="component" />
        ) : (
          <TodoList
            categoryOptions={categories}
            priorityOptions={priorities}
            onTodoDeleteClicked={onTodoDeleteClickHandler}
            todos={todos}
          />
        )}
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default TodoPage;
