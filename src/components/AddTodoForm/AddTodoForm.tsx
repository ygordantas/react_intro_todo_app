import { useState } from "react";

import Todo from "../../models/todo";
import TodoCategories from "../../enums/todoCategories";
import TodoPriorityIds from "../../enums/TodoPriorityIds";
import TODO_PRIORITIES from "../../constants/todoPriorities";
import TodoPriority from "../../models/todoPriority";

const PLACEHOLDER_CATEGORY_SELECT_TEXT = "Choose a category:";

const DEFAULT_TODO_PRIORITY: TodoPriority = TODO_PRIORITIES.find(
  (p) => p.id === TodoPriorityIds.Medium
)!;

const AddTodoForm = (): JSX.Element => {
  const [todo, setTodo] = useState<Todo>({
    text: "",
    priority: DEFAULT_TODO_PRIORITY,
  });

  const onTodoTextChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTodo((currentTodo) => {
      return {
        ...currentTodo,
        text: event.target.value,
      };
    });
  };

  const onSelectCategoryChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value = event.target.value;
    const option =
      value === PLACEHOLDER_CATEGORY_SELECT_TEXT
        ? TodoCategories.Unknown
        : (value as TodoCategories);

    setTodo((currentTodo) => {
      return {
        ...currentTodo,
        category: option,
      };
    });
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

  const categoryOptions = (
    <select
      value={todo.category}
      onChange={onSelectCategoryChangeHandler}
      name="Category"
    >
      {Object.values(TodoCategories)
        .map((value, index) => {
          return (
            <option key={index}>
              {value || PLACEHOLDER_CATEGORY_SELECT_TEXT}
            </option>
          );
        })
        .reverse()}
    </select>
  );

  const priorityOptions = (
    <select
      value={todo.priority.id}
      onChange={onSelectPriorityChangeHandler}
      name="Priority"
    >
      {TODO_PRIORITIES.map((todoPriority, index) => {
        return (
          <option value={todoPriority.id} key={index}>
            {todoPriority.name}
          </option>
        );
      })}
    </select>
  );

  return (
    <form onSubmit={(e) => console.log(e)}>
      <input
        onChange={onTodoTextChangeHandler}
        type="text"
        placeholder="what's in your todo"
        value={todo.text}
      />

      {categoryOptions}
      {priorityOptions}

      <p>Text: {todo.text}</p>
      <p>Priority: {todo.priority.name}</p>
      <p>Category you selected: {todo.category}</p>
      <button type="submit">+ Add</button>
    </form>
  );
};

export default AddTodoForm;
