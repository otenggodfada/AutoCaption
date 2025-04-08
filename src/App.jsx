/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-dark text-light">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
