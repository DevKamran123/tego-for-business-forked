import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useRideStore from "../store/RideStore";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";
import PageNotFound from "../components/PageNotFound";
import Loader from "../components/Loader";
import AcceptInvite from "../pages/AcceptInvite";
import PersonalDashboardLayout from "../components/layouts/PersonalDashboardLayout";

// Lazy load all components
const Home = lazy(() => import("../pages/Home"));
const Signup = lazy(() => import("../pages/Signup"));
const ConfirmSignup = lazy(() => import("../pages/ConfirmSignup"));
const CreatePassword = lazy(() => import("../pages/CreatePassword"));
const Login = lazy(() => import("../pages/Login"));
const LogoutHandler = lazy(() => import("../components/LogoutHandler"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Rides = lazy(() => import("../pages/Rides"));
const RideHistory = lazy(() => import("../components/RideHistory"));
const PlannedRides = lazy(() => import("../components/PlannedRides"));
const Coupon = lazy(() => import("../pages/Coupon"));
const Referral = lazy(() => import("../pages/Referral"));
const Drives = lazy(() => import("../pages/Drives"));
const PersonalWallet = lazy(() => import("../pages/PersonalWallet"));

const AppRoutes = () => {
  const activeTab = useRideStore((state) => state.activeTab);

  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/confirm-signup" element={<ConfirmSignup />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route path="/accept-invite" element={<AcceptInvite />} />
            <Route path="logout" element={<LogoutHandler />} />
            <Route path="/drives" element={<Drives />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/rides" element={<Rides />} />
                      <Route
                        path="/rides/:rideId"
                        element={
                          activeTab === "ride-history" ? (
                            <RideHistory />
                          ) : (
                            <PlannedRides />
                          )
                        }
                      />
                      <Route path="/referral-code" element={<Referral />} />
                      <Route path="/coupons" element={<Coupon />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/personal/dashboard/*"
              element={
                <PersonalDashboardLayout>
                  <Routes>
                    <Route path="/wallet" element={<PersonalWallet />} />

                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </PersonalDashboardLayout>
              }
            />
          </Routes>
        </Suspense>
      </Router>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
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
            backgroundColor: "white",
            color: "#333333",
          },
        }}
      />
    </>
  );
};

export default AppRoutes;
