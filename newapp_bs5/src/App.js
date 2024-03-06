import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Compare from "./Compare";
import Timeline from "./Timeline";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Compare" element={<Compare />} />
        <Route path="/Timeline" element={<Timeline />} />
      </Routes>
    </Router>
  );
}

export default App;
