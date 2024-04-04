import { useEffect, useState } from "react";

import Todo from "../../models/todo";
import TodoPriorityIds from "../../enums/TodoPriorityIds";
import TODO_PRIORITIES from "../../constants/todoPriorities";
import TodoPriority from "../../models/todoPriority";
import Button from "../Button/Button";
import classes from "./AddTodoForm.module.css";
import TextInput from "../TextInput/TextInput";
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import TodoCategory from "../../models/todoCategory";

const PLACEHOLDER_CATEGORY_SELECT_TEXT = "Choose a category:";

const DEFAULT_TODO_PRIORITY: TodoPriority = TODO_PRIORITIES.find(
  (p) => p.id === TodoPriorityIds.Medium
)!;

const DEFAULT_TODO_FORM_DATA: Todo = {
  text: "",
  priority: DEFAULT_TODO_PRIORITY,
};

interface AddTodoFormProps {
  onSubmit: (newTodo: Todo) => void;
}

const AddTodoForm = ({ onSubmit }: AddTodoFormProps): JSX.Element => {
  //--- Form State ---//
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);

  //--- Form Data ---//
  const [todo, setTodo] = useState<Todo>(DEFAULT_TODO_FORM_DATA);
  const [categories, setCategories] = useState<TodoCategory[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const responseData = (await response.json()) as TodoCategory[];
        setCategories(responseData);
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  //--- Methods ---//
  const onTodoTextChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTodo((currentTodo) => ({
      ...currentTodo,
      text: event.target.value,
    }));
  };

  const onSelectCategoryChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedCategoryId = event.target.value;

    const categorySelected = categories.find(
      (category) => category._id === selectedCategoryId
    );

    setTodo((currentTodo) => ({
      ...currentTodo,
      category: categorySelected,
    }));
  };

  const onSelectPriorityChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedPriorityId = Number(event.target.value);

    const selectedPriority = TODO_PRIORITIES.find(
      (p) => p.id === selectedPriorityId
    )!;

    setTodo((currentTodo) => {
      return {
        ...currentTodo,
        priority: selectedPriority,
      };
    });
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (todo.text.trim()) {
      const newTodoToInsert = { ...todo, createdAt: new Date() };

      onSubmit(newTodoToInsert);
      setTodo(DEFAULT_TODO_FORM_DATA);
      setIsFormValid(true);
      return;
    }

    setTodo((currentTodo) => ({
      ...currentTodo,
      text: "",
    }));

    setIsFormValid(false);
  };

  //--- JSX ---//
  return isLoading ? (
    <div>"Loading..."</div>
  ) : (
    <form className={classes.todo_form} onSubmit={onSubmitHandler}>
      <TextInput
        placeholder="Enter your todo here..."
        value={todo.text}
        onChange={onTodoTextChangeHandler}
        required={true}
      />

      <p
        className={
          todo.text === "" && !isFormValid ? classes.error_message : "hide"
        }
      >
        This field is required!
      </p>

      <div className={classes.options_container}>
        <SelectDropdown
          value={todo.category?._id ?? ""}
          onChange={onSelectCategoryChangeHandler}
          name="Category"
          placeholder={PLACEHOLDER_CATEGORY_SELECT_TEXT}
          options={categories.map((category) => ({
            value: category._id,
            displayValue: category.name,
          }))}
        />
        <SelectDropdown
          value={todo.priority.id}
          onChange={onSelectPriorityChangeHandler}
          name="Priority"
          options={TODO_PRIORITIES.map((category) => ({
            value: category.id,
            displayValue: category.name,
          }))}
        />
      </div>
      <Button className={classes.submit_btn} type="submit">
        + Add
      </Button>
    </form>
  );
};

export default AddTodoForm;
