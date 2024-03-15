import { useAutoAnimate } from "@formkit/auto-animate/react";

import TodoPriorityIds from "../../enums/TodoPriorityIds";
import Todo from "../../models/todo";
import HalfStarIcon from "../Icons/HalfStarIcon";
import StartIcon from "../Icons/StarIcon";
import classes from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps): JSX.Element => {
  const [parent] = useAutoAnimate();

  const getPriorityIconsBasedOnPriorityId = (
    priorityId: number
  ): JSX.Element => {
    switch (priorityId) {
      case TodoPriorityIds.High:
        return (
          <>
            <StartIcon /> <StartIcon />
          </>
        );
      case TodoPriorityIds.Medium:
        return <StartIcon />;
      default:
        return <HalfStarIcon />;
    }
  };
  return (
    <ul ref={parent} className={classes.list}>
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
              {getPriorityIconsBasedOnPriorityId(currentTodo.priority.id)}
              {currentTodo.category?.name && <p>{currentTodo.category.name}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
