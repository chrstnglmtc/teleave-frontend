import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Group } from './page/Group';
import { Login } from './page/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/groups" element={<Group />} />
        <Route path="/" element={<h1>Welcome to Telegram Group Leaver</h1>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
