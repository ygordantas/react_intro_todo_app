import { useState } from "react";

import Todo from "../../models/todo";
import TodoPriorityIds from "../../enums/TodoPriorityIds";
import TODO_PRIORITIES from "../../constants/todoPriorities";
import TodoPriority from "../../models/todoPriority";
import TODO_CATEGORIES from "../../constants/todoCategories";
import Button from "../Button/Button";
import classes from "./AddTodoForm.module.css";
import TextInput from "../TextInput/TextInput";
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import SmileEmoji from "../../assets/icons/emoji.svg";

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
  //--- Form Data ---//
  const [todo, setTodo] = useState<Todo>(DEFAULT_TODO_FORM_DATA);

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
    const selectedCategoryId = Number(event.target.value);

    const categorySelected = TODO_CATEGORIES.find(
      (category) => category.id === selectedCategoryId
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
    if (!todo.text) {
      alert("Can't add an empty todo.");
      return;
    }
    const newTodoToInsert = { ...todo, createdAt: new Date() };

    onSubmit(newTodoToInsert);
    setTodo(DEFAULT_TODO_FORM_DATA);
  };

  //--- JSX ---//
  return (
    <form className={classes.todo_form} onSubmit={onSubmitHandler}>
      <h3 className={classes.title}>
        Create your todo now <img src={SmileEmoji}></img>
      </h3>
      <TextInput
        placeholder="Enter your todo here..."
        value={todo.text}
        onChange={onTodoTextChangeHandler}
      />
      <div className={classes.options_container}>
        <SelectDropdown
          value={todo.category?.id ?? ""}
          onChange={onSelectCategoryChangeHandler}
          name="Category"
          placeholder={PLACEHOLDER_CATEGORY_SELECT_TEXT}
          options={TODO_CATEGORIES.map((category) => ({
            value: category.id,
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
