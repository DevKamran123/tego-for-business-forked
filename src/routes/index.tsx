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
import useRideStore from "../store/RideStore";
import PlannedRides from "../components/PlannedRides";
import Coupon from "../pages/Coupon";
import Referral from "../pages/Referral";
import { Toaster } from "react-hot-toast";


const AppRoutes = () => {
  const activeTab = useRideStore((state)=>state.activeTab);

  return (
    <>
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
                    <Route path="/rides/:rideId" element={activeTab==="ride-history" ? <RideHistory />: <PlannedRides />} />
                    <Route path="/referral-code" element={<Referral />} />
                    <Route path="/coupons" element={<Coupon />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      <Toaster 
        position="top-center"
        gutter={12}
        containerStyle={{margin: "8px"}}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)"
          },
        }}
      />
    </>
  );
};

export default AppRoutes;
