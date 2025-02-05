import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Background from "./components/Background";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Group } from "./page/Group";
import { Landing } from "./page/Landing";
import { Login } from "./page/Login";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <Background />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/groups" element={<Group />} />
          </Route>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
