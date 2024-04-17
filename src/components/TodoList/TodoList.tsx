import { useAutoAnimate } from "@formkit/auto-animate/react";

import IconOptions from "../../enums/IconOptions";
import Todo from "../../models/todo";
import TodoCategory from "../../models/todoCategory";
import TodoPriority from "../../models/todoPriority";
import Icon from "../Icon/Icon";
import classes from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  priorityOptions: TodoPriority[];
  categoryOptions: TodoCategory[];
  onTodoDeleteClicked: (todoId: string) => void;
  onTodoClicked: (todo: Todo) => void;
}

const TodoList = ({
  todos,
  priorityOptions,
  categoryOptions,
  onTodoDeleteClicked,
  onTodoClicked,
}: TodoListProps): JSX.Element => {
  const [parent] = useAutoAnimate();

  return (
    <ul ref={parent} className={classes.list}>
      {todos.map((currentTodo) => {
        return (
          <li className={classes.item_container} key={currentTodo._id}>
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
                {currentTodo.priorityId && (
                  <Icon
                    iconType={
                      priorityOptions.find(
                        (x) => x._id === currentTodo.priorityId
                      )!.iconOptionName
                    }
                  />
                )}
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
              <div className={classes.action_btns_container}>
                <Icon
                  onClick={() => onTodoClicked(currentTodo)}
                  iconType={IconOptions.Edit}
                  className={classes.edit_btn + " " + classes.action_btn}
                /><span className={classes.action_btn}>|</span>
                <Icon
                  onClick={() => onTodoDeleteClicked(currentTodo._id)}
                  iconType={IconOptions.Delete}
                  className={classes.delete_btn + " " + classes.action_btn}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
