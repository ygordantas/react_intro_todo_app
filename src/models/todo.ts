import TodoCategories from "../enums/todoCategories";
import TodoPriority from "./todoPriority";

export default interface Todo {
  text: string;
  priority: TodoPriority;
  category?: TodoCategories;
  lastUpdatedAt?: Date;
  createdAt?: Date;
}
