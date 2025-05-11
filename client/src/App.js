import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Button } from "antd";
import Home from "./pages/home/index.js";
import Login from "./pages/login/index.js";
import Register from "./pages/register/index.js";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Button type="dashed">Click me</Button>
    </div>
  );
}

export default App;
