// packages
import React from "react";
import { Routes, Route } from "react-router-dom";

// views
import Welcome from "./views/Welcome";
import Register from "./views/Register";
import Logout from "./views/Logout";
import Albums from "./views/Albums";
import Album from "./views/Album";
import CreateAlbum from "./views/CreateAlbum";
import ReviewAlbum from "./views/ReviewAlbum";
import ReviewFinished from "./views/ReviewFinished";
// components
import Navbar from "./components/Navbar";

// hooks
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <main className="flex items-center flex-col w-full">
      <div className="max-w-screen-2xl w-full min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/album/:albumId/review-album/:id"
            element={<ReviewAlbum />}
          />
          <Route path="/review/finished" element={<ReviewFinished />} />
          {/* "protected" routes */}
          <Route path="/albums" element={user ? <Albums /> : <Welcome />} />
          <Route
            path="/albums/create"
            element={user ? <CreateAlbum /> : <Welcome />}
          />
          <Route path="/album/:id" element={user ? <Album /> : <Welcome />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
