import { useState } from "react";

import Todo from "../../models/todo";
import TodoPriority from "../../models/todoPriority";
import Button from "../Button/Button";
import classes from "./AddTodoForm.module.css";
import TextInput from "../TextInput/TextInput";
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import TodoCategory from "../../models/todoCategory";

const PLACEHOLDER_CATEGORY_SELECT_TEXT = "Choose a category:";

const createDefaultTodo = (todoPriorities: TodoPriority[]): Todo => {
  return {
    text: "",
    priority: todoPriorities.find((x) => x.name === "Medium")!,
  };
};

interface AddTodoFormProps {
  onSubmit: (newTodo: Todo) => void;
  todoCategories: TodoCategory[];
  todoPriorities: TodoPriority[];
}

const AddTodoForm = ({
  onSubmit,
  todoCategories,
  todoPriorities,
}: AddTodoFormProps): JSX.Element => {
  //--- Form State ---//
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  //--- Form Data ---//
  const [todo, setTodo] = useState<Todo>(createDefaultTodo(todoPriorities));

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

    const categorySelected = todoCategories.find(
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
    const selectedPriorityId = event.target.value;

    const selectedPriority = todoPriorities.find(
      (p) => p._id === selectedPriorityId
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
      setTodo(createDefaultTodo(todoPriorities));
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
  return (
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
          options={todoCategories.map((category) => ({
            value: category._id,
            displayValue: category.name,
          }))}
        />
        <SelectDropdown
          value={todo.priority._id}
          onChange={onSelectPriorityChangeHandler}
          name="Priority"
          options={todoPriorities.map((priority) => ({
            value: priority._id,
            displayValue: priority.name,
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
