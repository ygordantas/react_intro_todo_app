interface AddTodoFormProps {
  todo: string;
  onSubmitTodo: (todo: string) => void;
  onTodoTextChange: (todoText: string) => void;
}

// Presentational components => dumb components 
const AddTodoForm = ({
  todo,
  onSubmitTodo,
  onTodoTextChange,
}: AddTodoFormProps): JSX.Element => {
  const onSubmitHandler = (e: React.FormEvent, todo: string) => {
    e.preventDefault();
    onSubmitTodo(todo);
  };
  return (
    <form onSubmit={(e) => onSubmitHandler(e, todo)}>
      <input
        onChange={(event) => onTodoTextChange(event.target.value)}
        type="text"
        placeholder="what's in your todo"
        value={todo}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default AddTodoForm;
