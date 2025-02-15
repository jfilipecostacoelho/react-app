import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Repos from "./pages/Repos";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/repos/:inputRepositorio" element={<Repos />} />
      </Routes>
    </BrowserRouter>
  );
}
