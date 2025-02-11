import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import ConfirmSignup from "../pages/ConfirmSignup";
import CreatePassword from "../pages/CreatePassword";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm-signup" element={<ConfirmSignup />} />
        <Route path="/create-password" element={<CreatePassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
