import { useState } from "react";
import Todo from "../../models/todo";
import TodoCategories from "../../enums/todoCategories";

const PLACEHOLDER_CATEGORY_SELECT_TEXT = "Choose a category:";

const AddTodoForm = (): JSX.Element => {
  const [todo, setTodo] = useState<Todo>({
    text: "",
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

  const categoryOptions = Object.values(TodoCategories)
    .map((value, index) => {
      return (
        <option key={index}>{value || PLACEHOLDER_CATEGORY_SELECT_TEXT}</option>
      );
    })
    .reverse();

  return (
    <form onSubmit={(e) => console.log(e)}>
      <input
        onChange={onTodoTextChangeHandler}
        type="text"
        placeholder="what's in your todo"
        value={todo.text}
      />
      <select onChange={onSelectCategoryChangeHandler} name="Category">
        {categoryOptions}
      </select>

      <p>Text: {todo.text}</p>
      <p>Category you selected: {todo.category}</p>
      <button type="submit">+ Add</button>
    </form>
  );
};

export default AddTodoForm;
