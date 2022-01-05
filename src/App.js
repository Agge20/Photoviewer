import { Routes, Route } from "react-router-dom";

// views
import Welcome from "./views/Welcome";

// components
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="flex items-center flex-col w-full">
      <div className="max-w-screen-2xl border-blue-600 h-full w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
