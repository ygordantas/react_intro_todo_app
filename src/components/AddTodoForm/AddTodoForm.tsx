import { useState } from "react";

import Todo from "../../models/todo";
import TodoPriority from "../../models/todoPriority";
import Button from "../Button/Button";
import classes from "./AddTodoForm.module.css";
import TextInput from "../TextInput/TextInput";
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import TodoCategory from "../../models/todoCategory";

const PLACEHOLDER_CATEGORY_SELECT_TEXT = "Choose a category:";

const createDefaultTodo = (
  todoPriorities: TodoPriority[],
  userId: string
): Todo => ({
  _id:"",
  createdBy: userId,
  text: "",
  priorityId: todoPriorities.find((x) => x.name === "Medium")!._id,
});

interface AddTodoFormProps {
  onSubmit: (newTodo: Todo) => void;
  todoCategories: TodoCategory[];
  todoPriorities: TodoPriority[];
  isSubmitting: boolean;
  userId: string;
}

const AddTodoForm = ({
  onSubmit,
  todoCategories,
  todoPriorities,
  isSubmitting,
  userId,
}: AddTodoFormProps): JSX.Element => {
  //--- Form State ---//
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  //--- Form Data ---//
  const [todo, setTodo] = useState<Todo>(
    createDefaultTodo(todoPriorities, userId)
  );

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
      categoryId: categorySelected?._id,
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
        priorityId: selectedPriority._id,
      };
    });
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (todo.text.trim()) {
      const newTodoToInsert = { ...todo };

      onSubmit(newTodoToInsert);
      setTodo(createDefaultTodo(todoPriorities, userId));
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
          value={todo.categoryId ?? ""}
          onChange={onSelectCategoryChangeHandler}
          name="Category"
          placeholder={PLACEHOLDER_CATEGORY_SELECT_TEXT}
          options={todoCategories.map((category) => ({
            value: category._id,
            displayValue: category.name,
          }))}
        />
        <SelectDropdown
          value={todo.priorityId}
          onChange={onSelectPriorityChangeHandler}
          name="Priority"
          options={todoPriorities.map((priority) => ({
            value: priority._id,
            displayValue: priority.name,
          }))}
        />
      </div>
      <Button
        disabled={isSubmitting}
        className={classes.submit_btn}
        type="submit"
      >
        {isSubmitting ? "Submitting..." : "+ Add"}
      </Button>
    </form>
  );
};

export default AddTodoForm;
