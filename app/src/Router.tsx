import React from "react";
import { Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask/AddTask";

// Components
import Task from "./components/Task/Task";

// Screens
import TaskList from "./screens/TaskList/TaskList";

function Router() {
  return (
    <Routes>
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/add" element={<AddTask />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default Router;
