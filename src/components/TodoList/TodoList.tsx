import { useAutoAnimate } from "@formkit/auto-animate/react";

import TodoPriorityIds from "../../enums/TodoPriorityIds";
import Todo from "../../models/todo";
import classes from "./TodoList.module.css";
import Icon from "../Icon/Icon";
import IconOptions from "../../enums/IconOptions";

interface TodoListProps {
  todos: Todo[];
  onTodoDeleteClicked: (index: number) => void;
}

const TodoList = ({
  todos,
  onTodoDeleteClicked,
}: TodoListProps): JSX.Element => {
  const [parent] = useAutoAnimate();

  const getPriorityIconsBasedOnPriorityId = (
    priorityId: number
  ): JSX.Element => {
    switch (priorityId) {
      case TodoPriorityIds.High:
        return (
          <>
            <Icon iconType={IconOptions.FullStar} />
            <Icon iconType={IconOptions.FullStar} />
          </>
        );
      case TodoPriorityIds.Medium:
        return <Icon iconType={IconOptions.FullStar} />;
      default:
        return <Icon iconType={IconOptions.HalfStar} />;
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
              <div>
                {getPriorityIconsBasedOnPriorityId(currentTodo.priority.id)}
                {currentTodo.category && (
                  <Icon iconType={currentTodo.category.iconOptionName} />
                )}
              </div>
              <Icon
                onClick={() => onTodoDeleteClicked(index)}
                iconType={IconOptions.Delete}
                className={classes.delete_btn}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
