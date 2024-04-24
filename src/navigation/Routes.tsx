import { Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TodoPage from "../pages/TodoPage/TodoPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/todos" element={<TodoPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/" element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
