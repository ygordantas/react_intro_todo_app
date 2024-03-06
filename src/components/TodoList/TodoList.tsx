import Todo from "../../models/todo";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps): JSX.Element => {
  return (
    <ul>
      {todos.map((currentTodo, index) => {
        return (
          <li key={index}>
            <div>{currentTodo.text}</div>
            <p>Created at: {currentTodo.createdAt?.toDateString()}</p>
            <p>Priority: {currentTodo.priority.name}</p>
            {currentTodo.category?.name && (
              <p>Category: {currentTodo.category.name}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
