import React from "react";
import { Routes, Route } from "react-router-dom";

// views
import Welcome from "./views/Welcome";
import Register from "./views/Register";
import Albums from "./views/Albums";
import Album from "./views/Album";
import CreateAlbum from "./views/CreateAlbum";
// components
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="flex items-center flex-col w-full">
      <div className="max-w-screen-2xl w-full min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/create" element={<CreateAlbum />} />
          <Route path="/album/:id" element={<Album />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
