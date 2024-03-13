import Todo from "../../models/todo";
import classes from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps): JSX.Element => {
  return (
    <ul className={classes.list}>
      {todos.map((currentTodo, index) => {
        return (
          <li className={classes.item_container} key={index}>
            <div className={classes.todo_details_container}>
              <p className={classes.todo_text}>{currentTodo.text}</p>
              <div className={classes.timestamp_section}>
                <hr />
                <p>
                  <strong>Created at:</strong>
                  {currentTodo.createdAt?.toDateString()}
                </p>
              </div>
            </div>
            <div className={classes.icon_container}>
              <p>{currentTodo.priority.name}</p>
              <span className="material-symbols-outlined">star</span>
              {currentTodo.category?.name && <p>{currentTodo.category.name}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
