import React from "react";
import { Routes, Route } from "react-router-dom";

// views
import Welcome from "./views/Welcome";
import Register from "./views/Register";
import Albums from "./views/Albums";
// components
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="flex items-center flex-col w-full bg-rose-600">
      <div className="max-w-screen-2xl border-blue-600 w-full min-h-screen bg-white shadow-lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/albums" element={<Albums />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
