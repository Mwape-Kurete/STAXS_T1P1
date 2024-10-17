import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Compare from "./Pages/Compare";
import Timeline from "./Pages/Timeline";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="compare" element={<Compare />} />
        <Route path="timeline" element={<Timeline />} />
      </Routes>
    </Router>
  );
}

export default App;
