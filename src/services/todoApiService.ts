import axios from "axios";
import TodoCategory from "../models/todoCategory";

const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

const todoApiService = {
  getTodoCategories: async (): Promise<TodoCategory[]> => {
    const response  = await httpClient.get("/categories");
    return response.data;
  },
  getTodoPriorities: () => {
    httpClient.get("/priorities");
  },
};

export default todoApiService;
