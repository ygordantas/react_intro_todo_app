import { useAutoAnimate } from "@formkit/auto-animate/react";

import TodoPriorityIds from "../../enums/TodoPriorityIds";
import Todo from "../../models/todo";
import HalfStarIcon from "../Icons/HalfStarIcon";
import StartIcon from "../Icons/StarIcon";
import classes from "./TodoList.module.css";
import TodoCategoryIds from "../../enums/TodoCategoryIds";
import FamilyCategoryIcon from "../Icons/FamilyCategoryIcon";
import CookingCategoryIcon from "../Icons/CookingCategoryIcon";
import FinanceCategoryIcon from "../Icons/FinanceCategoryIcon";
import GardeningCategoryIcon from "../Icons/GardeningCategoryIcon";
import GroceriesCategoryIcon from "../Icons/GroceriesCategoryIcon";
import WorkCategoryIcon from "../Icons/WorkCategoryIcon";

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

  const getCategoryIconBasedOnCategoryId = (
    categoryId?: number
  ): JSX.Element => {
    switch (categoryId) {
      case TodoCategoryIds.Cooking:
        return <CookingCategoryIcon />;
      case TodoCategoryIds.Finance:
        return <FinanceCategoryIcon />;
      case TodoCategoryIds.Family:
        return <FamilyCategoryIcon />;
      case TodoCategoryIds.Gardening:
        return <GardeningCategoryIcon />;
      case TodoCategoryIds.Groceries:
        return <GroceriesCategoryIcon />;
      case TodoCategoryIds.Work:
        return <WorkCategoryIcon />;
      default:
        return <></>;
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
              {getCategoryIconBasedOnCategoryId(currentTodo.category?.id)}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
