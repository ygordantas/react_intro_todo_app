import { Route, Routes } from "react-router-dom";

import TodoPage from "../pages/TodoPage/TodoPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";

const AppRoutes = () => (
  <Routes>
    <Route path="/todos" element={<TodoPage />} />
    <Route path="/" element={<HomePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
