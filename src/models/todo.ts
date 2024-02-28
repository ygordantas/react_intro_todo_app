import TodoCategories from "../enums/todoCategories";

export default interface Todo {
    text: string;
    category: TodoCategories;
    // priority: TodoPriorities;
    lastUpdatedAt: Date;
    createdAt: Date;
}