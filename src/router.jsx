import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppGame from "./pages/AppGame";

export default function router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/game" />} />
      <Route index path="/game" element={<AppGame />} />
    </Routes>
  );
}
