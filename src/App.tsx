import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Group } from "./page/Group";
import { Landing } from "./page/Landing";
import { Login } from "./page/Login";

function App() {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-start items-center">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/groups" element={<Group />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
