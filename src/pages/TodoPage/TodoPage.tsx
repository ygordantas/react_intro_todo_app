import { useEffect, useState } from "react";

import AddTodoForm from "../../components/AddTodoForm/AddTodoForm";
import TodoList from "../../components/TodoList/TodoList";
import Todo from "../../models/todo";
import classes from "./TodoPage.module.css";
import Card from "../../components/Card/Card";
import { Navigate, useLocation } from "react-router-dom";
import todoApiService from "../../services/todoApiService";
import TodoCategory from "../../models/todoCategory";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TodoPriority from "../../models/todoPriority";

const TodoPage = (): JSX.Element => {
  const { state } = useLocation();

  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [priorities, setPriorities] = useState<TodoPriority[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        !state.userId && setIsLoading(false);
      }
    };

    getOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getUserTodos = async () => {
      if (categories.length === 0 || priorities.length === 0) return;

      try {
        !isLoading && setIsLoading(true);
        const userTodos = await todoApiService.getUserTodos(state.userId);
        setTodos(userTodos);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
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

  const onTodoDeleteClickHandler = async (index: number) => {
    try {
      setIsLoading(true);
      await todoApiService.deleteTodo(state.userId, todos[index]._id);
      setTodos((currentTodos) => {
        const copy = [...currentTodos];
        copy.splice(index, 1);
        return copy;
      });
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
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
        <TodoList
          categoryOptions={categories}
          priorityOptions={priorities}
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
