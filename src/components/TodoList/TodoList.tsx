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
  todoIdBeingDeleted?: string;
}

const TodoList = ({
  todos,
  priorityOptions,
  categoryOptions,
  onTodoDeleteClicked,
  onTodoClicked,
  todoIdBeingDeleted,
}: TodoListProps): JSX.Element => {
  const [parent] = useAutoAnimate();

  const getCategoryById = (categoryId: string): TodoCategory => {
    return categoryOptions.find((x) => x._id === categoryId)!;
  };

  const getPriorityById = (priorityId: string): TodoPriority => {
    return priorityOptions.find((x) => x._id === priorityId)!;
  };

  return (
    <ul ref={parent} className={classes.list}>
      {todos.map((currentTodo) => {
        const priority: TodoPriority | undefined = currentTodo.priorityId
          ? getPriorityById(currentTodo.priorityId)
          : undefined;

        const category: TodoCategory | undefined = currentTodo.categoryId
          ? getCategoryById(currentTodo.categoryId)
          : undefined;

        return (
          <li
            className={
              todoIdBeingDeleted === currentTodo._id
                ? classes.disabled_item_container + " " + classes.item_container
                : classes.item_container
            }
            key={currentTodo._id}
          >
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
              <div className={classes.todo_details_icons}>
                {priority && (
                  <Icon
                    tooltip={"Priority: " + priority.name}
                    iconType={priority.iconOptionName}
                  />
                )}
                {category && (
                  <>
                    <span className={classes.separator}>|</span>
                    <Icon
                      tooltip={"Category: " + category.name}
                      iconType={category.iconOptionName}
                    />
                  </>
                )}
              </div>
              <div className={classes.action_btns_container}>
                <Icon
                  onClick={() => onTodoClicked(currentTodo)}
                  iconType={IconOptions.Edit}
                  className={classes.edit_btn + " " + classes.action_btn}
                />
                <span className={classes.action_btn}>|</span>
                <Icon
                  style={
                    todoIdBeingDeleted === currentTodo._id
                      ? { visibility: "hidden" }
                      : {}
                  }
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
