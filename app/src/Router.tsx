import { Route, Routes } from "react-router-dom";

// Screens

import Dashboard from "./screens/Dashboard/Dashboard";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default Router;
