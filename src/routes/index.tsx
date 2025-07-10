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
import BusinessRide from "../pages/BusinessRide";
import WalletPage from "../pages/Wallet"; // Added import for WalletPage

// Lazy load all components
const Home = lazy(() => import("../pages/Home"));
const ConfirmSignup = lazy(() => import("../pages/ConfirmSignup"));
const CreatePassword = lazy(() => import("../pages/CreatePassword"));
// Dual authentication pages (temporary)
const DualLogin = lazy(() => import("../pages/DualLogin"));
const DualSignup = lazy(() => import("../pages/DualSignup"));
const LogoutHandler = lazy(() => import("../components/LogoutHandler"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Rides = lazy(() => import("../pages/Rides"));
const RideHistory = lazy(() => import("../components/RideHistory"));
const PlannedRides = lazy(() => import("../components/PlannedRides"));
const Coupon = lazy(() => import("../pages/Coupon"));
const Referral = lazy(() => import("../pages/Referral"));
const Drives = lazy(() => import("../pages/Drives"));
const PersonalHome = lazy(() => import("../pages/PersonalHome"));
const PersonalInfo = lazy(() => import("../pages/PersonalInfo"));
const EditPersonalInfo = lazy(() => import("../pages/EditPersonalInfo"));
const PersonalWallet = lazy(() => import("../pages/PersonalWallet"));
const PersonalRide = lazy(() => import("../pages/PersonalRide"));
const PersonalCoupon = lazy(() => import("../pages/PersonalCoupon"));
const PersonalActivity = lazy(() => import("../pages/PersonalActivity"));
const Wallet = lazy(() => import("../pages/Wallet"));
const Onboarding = lazy(() => import("../pages/Onboarding")); // Added Onboarding import
const ProfilePage = lazy(() => import("../pages/ProfilePage")); // Added ProfilePage import

const AppRoutes = () => {
  const activeTab = useRideStore((state) => state.activeTab);

  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/signup" element={<DualSignup />} />
            <Route path="/login" element={<DualLogin />} />
            {/* End Dual Auth Routes */}
            <Route path="/onboarding" element={<Onboarding />} /> {/* Added Onboarding route */}
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
                      <Route path="/ride" element={<BusinessRide />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/referral-code" element={<Referral />} />
                      <Route path="/coupons" element={<Coupon />} />
                      <Route path="/profile" element={<ProfilePage />} /> {/* Added ProfilePage route */}
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/personal/ride"
              element={
                <ProtectedRoute>
                  <PersonalRide />
                </ProtectedRoute>
              }
            />
            <Route
              path="/personal/dashboard/*"
              element={
                <PersonalDashboardLayout>
                  <Routes>
                    <Route path="/" element={<PersonalHome />} />
                    <Route path="/personal-info" element={<PersonalInfo />} />
                    <Route
                      path="/personal-info/edit"
                      element={<EditPersonalInfo />}
                    />
                    <Route path="/wallet" element={<PersonalWallet />} />
                    <Route path="/coupons" element={<PersonalCoupon />} />
                    <Route path="/activity" element={<PersonalActivity />} />

                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </PersonalDashboardLayout>
              }
            />
            {/* <Route path="/settings" element={<Settings />} /> */}
            <Route path="/wallet-page" element={<WalletPage />} /> {/* Added route for WalletPage */}
            <Route path="/login" element={<DualLogin />} /> {/* Added route for DualLogin */}
            <Route path="/signup" element={<DualSignup />} /> {/* Added route for DualSignup */}
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
