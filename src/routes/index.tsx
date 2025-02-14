import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import ConfirmSignup from "../pages/ConfirmSignup";
import CreatePassword from "../pages/CreatePassword";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";
import LogoutHandler from "../components/LogoutHandler";
import Dashboard from "../pages/Dashboard";
import Rides from "../pages/Rides";
import RideHistory from "../components/RideHistory";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm-signup" element={<ConfirmSignup />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="logout" element={<LogoutHandler />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/rides" element={<Rides />} />
                  <Route path="/rides/:rideId" element={<RideHistory />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
