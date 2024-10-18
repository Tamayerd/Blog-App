import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminRoute from "./components/AdminRoutes";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/admin" element={<AdminRoute component={Admin} />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
      </Routes>
    </Router>
  );
}

export default App;
