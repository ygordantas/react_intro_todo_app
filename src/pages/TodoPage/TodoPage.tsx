import { useEffect, useState } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [priorities, setPriorities] = useState<TodoPriority[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTodoList, setIsLoadingTodoList] = useState(false);
  const [selectedTodoToUpdate, setSelectedTodoToUpdate] = useState<
    Todo | undefined
  >(undefined);

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
  const onTodoFormSubmit = async (todo: Todo) => {
    try {
      setIsSubmitting(true);
      const savedTodo = selectedTodoToUpdate ? await todoApiService.updateTodo(todo) : await todoApiService.createTodo(todo);
      setTodos((currentTodos) => [...currentTodos, savedTodo]);
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTodoDeleteClickHandler = async (todoId: string) => {
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

  const onTodoClickHandler = (todo: Todo) => {
    setSelectedTodoToUpdate(todo);
  };

  const onCancelUpdateClickHandler = () => {
    setSelectedTodoToUpdate(undefined);
  };

  return isLoadingPage ? (
    <LoadingSpinner type="page" />
  ) : state?.username ? (
    <div className={classes.container}>
      <div className={classes.todo_form_container}>
        <button
          onClick={() =>
            navigate("/", {
              state: null,
            })
          }
          className={classes.logout_btn}
        >
          Logout <span className="material-symbols-outlined">logout</span>
        </button>
        <Card title={`Hello, ${state.username}`}>
          <AddTodoForm
            onCancelUpdate={onCancelUpdateClickHandler}
            todoToUpdate={selectedTodoToUpdate}
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
            onTodoClicked={onTodoClickHandler}
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
