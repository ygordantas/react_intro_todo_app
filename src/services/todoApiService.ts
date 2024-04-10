import axios from "axios";
import TodoCategory from "../models/todoCategory";
import TodoPriority from "../models/todoPriority";

const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

const todoApiService = {
  getTodoCategories: async (): Promise<TodoCategory[]> => {
    const response = await httpClient.get("/categories");
    return response.data;
  },
  getTodoPriorities: async (): Promise<TodoPriority[]> => {
    const response = await httpClient.get("/priorities");
    return response.data;
  },
};

export default todoApiService;
