interface TodoListProps {
  todos: string[];
}

const TodoList = ({ todos }: TodoListProps): JSX.Element => {
  return (
    <ul>
      {todos.map((currentTodo, index) => {
        return <li key={index}>{currentTodo}</li>;
      })}
    </ul>
  );
};

export default TodoList;



