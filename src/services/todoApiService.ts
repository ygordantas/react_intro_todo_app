import axios from "axios";

import TodoCategory from "../models/todoCategory";
import TodoPriority from "../models/todoPriority";
import User from "../models/user";
import Todo from "../models/todo";

const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

const basePaths = {
  categories: "/categories",
  priorities: "/priorities",
  todos: "/todos",
  users: "/users",
};

const todoApiService = {
  getTodoCategories: async (): Promise<TodoCategory[]> => {
    const response = await httpClient.get(basePaths.categories);
    return response.data;
  },
  getTodoPriorities: async (): Promise<TodoPriority[]> => {
    const response = await httpClient.get(basePaths.priorities);
    return response.data;
  },
  getUserTodos: async (userId: string): Promise<Todo[]> => {
    const response = await httpClient.get(basePaths.todos + "/user/" + userId);
    return response.data;
  },
  createNewUser: async (username: string): Promise<User> => {
    const response = await httpClient.post(basePaths.users, { username });
    return response.data;
  },
  createTodo: async (todo: Todo): Promise<Todo> => {
    const response = await httpClient.post(basePaths.todos, todo);
    return response.data;
  },
  deleteTodo: async (userId: string, todoId: string): Promise<void> => {
    await httpClient.delete(basePaths.todos, {
      data: {
        userId,
        todoId,
      },
    });
  },
};

export default todoApiService;
