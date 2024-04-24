import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TodoForm from "../../components/TodoForm/TodoForm";
import TodoList from "../../components/TodoList/TodoList";
import { useUserContext } from "../../contexts/userContext";
import Todo from "../../models/todo";
import TodoCategory from "../../models/todoCategory";
import TodoPriority from "../../models/todoPriority";
import todoApiService from "../../services/todoApiService";
import classes from "./TodoPage.module.css";

const TodoPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  //--- Page State ---//
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //--- Page Data ---//
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [priorities, setPriorities] = useState<TodoPriority[]>([]);
  const [todoBeingDeleted, setTodoBeingDeleted] = useState<string | undefined>(
    undefined
  );
  const [selectedTodoToUpdate, setSelectedTodoToUpdate] = useState<
    Todo | undefined
  >(undefined);

  //--- Side Effects ---//
  useEffect(() => {
    if (!user) return navigate("/");

    const getOptions = async () => {
      try {
        const categoriesOptions = await todoApiService.getTodoCategories();
        setCategories(categoriesOptions);

        const priorityOptions = await todoApiService.getTodoPriorities();
        setPriorities(priorityOptions);
      } catch (error) {
        alert("Something went trying to retrieve data from server");
      } finally {
        !user && setIsLoadingPage(false);
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
        const userTodos = await todoApiService.getUserTodos(user!._id);
        setTodos(userTodos);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoadingPage(false);
      }
    };

    getUserTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, categories, priorities]);

  //--- Methods ---//
  const createTodoHandler = async (todo: Todo) => {
    const newTodo = await todoApiService.createTodo(todo);
    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  const updateTodoHandler = async (todo: Todo) => {
    const updatedTodo = await todoApiService.updateTodo(todo);
    setTodos((currentTodos) => {
      const copy = [...currentTodos];
      const index = copy.findIndex((x) => x._id === updatedTodo._id);
      copy[index] = updatedTodo;
      return copy;
    });
    setSelectedTodoToUpdate(undefined);
  };

  const onTodoFormSubmit = async (todo: Todo) => {
    try {
      setIsSubmitting(true);
      selectedTodoToUpdate
        ? await updateTodoHandler(todo)
        : await createTodoHandler(todo);
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTodoDeleteClickHandler = async (todoId: string) => {
    try {
      setTodoBeingDeleted(todoId);
      await todoApiService.deleteTodo(user!._id, todoId);
      setTodos((currentTodos) => {
        const copy = [...currentTodos];
        const index = copy.findIndex((x) => x._id === todoId);

        copy.splice(index, 1);
        return copy;
      });
    } catch (error) {
      alert(error);
    } finally {
      setTodoBeingDeleted(undefined);
    }
  };

  const onTodoClickHandler = (todo: Todo) => {
    setSelectedTodoToUpdate(todo);
  };

  const onCancelUpdateClickHandler = () => {
    setSelectedTodoToUpdate(undefined);
  };

  const onLogoutClickHandler = () => {
    setUser(null);
    navigate("/");
  };

  return isLoadingPage ? (
    <LoadingSpinner type="page" />
  ) : (
    <div className={classes.container}>
      <div className={classes.todo_form_container}>
        <button onClick={onLogoutClickHandler} className={classes.logout_btn}>
          Logout <span className="material-symbols-outlined">logout</span>
        </button>
        <Card title={`Hello, ${user!.username}`}>
          <TodoForm
            onCancelUpdate={onCancelUpdateClickHandler}
            todoToUpdate={selectedTodoToUpdate}
            userId={user!._id}
            todoPriorities={priorities}
            todoCategories={categories}
            isSubmitting={isSubmitting}
            onSubmit={onTodoFormSubmit}
          />
        </Card>
      </div>

      <div className={classes.listContainer}>
        <TodoList
          onTodoClicked={onTodoClickHandler}
          categoryOptions={categories}
          priorityOptions={priorities}
          onTodoDeleteClicked={onTodoDeleteClickHandler}
          todos={todos}
          todoIdBeingDeleted={todoBeingDeleted}
        />
      </div>
    </div>
  );
};

export default TodoPage;
