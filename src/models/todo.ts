import TodoCategories from "../enums/todoCategories";
import TodoPriorities from "../enums/todoPriorities";

export default interface Todo {
  text: string;
  category?: TodoCategories;
  priority?: TodoPriorities;
  lastUpdatedAt?: Date;
  createdAt?: Date;
}
