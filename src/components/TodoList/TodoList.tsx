import { useAutoAnimate } from "@formkit/auto-animate/react";

import Todo from "../../models/todo";
import classes from "./TodoList.module.css";
import Icon from "../Icon/Icon";
import IconOptions from "../../enums/IconOptions";
import TodoPriority from "../../models/todoPriority";
import TodoCategory from "../../models/todoCategory";

interface TodoListProps {
  todos: Todo[];
  priorityOptions: TodoPriority[];
  categoryOptions: TodoCategory[];
  onTodoDeleteClicked: (index: number) => void;
}

const TodoList = ({
  todos,
  priorityOptions,
  categoryOptions,
  onTodoDeleteClicked,
}: TodoListProps): JSX.Element => {
  const [parent] = useAutoAnimate();

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
                  {currentTodo.createdAt}
                </p>
              </div>
            </div>
            <div className={classes.icon_container}>
              <div>
                {
                  currentTodo.priorityId && <Icon
                    iconType={
                      priorityOptions.find(
                        (x) => x._id === currentTodo.priorityId
                      )!.iconOptionName
                    }
                  />
                }
                {currentTodo.categoryId && (
                  <Icon
                    iconType={
                      categoryOptions.find(
                        (x) => x._id == currentTodo.categoryId
                      )!.iconOptionName
                    }
                  />
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
