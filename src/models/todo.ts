import TodoCategory from "./todoCategory";
import TodoPriority from "./todoPriority";

export default interface Todo {
  text: string;
  priority: TodoPriority;
  category?: TodoCategory;
  lastUpdatedAt?: Date;
  createdAt?: Date;
}
