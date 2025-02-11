import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

/**
 * LogoutHandler component handles the user logout process.
 * 
 * This component performs the following actions:
 * - Clears the session cookie.
 * - Removes the token from localStorage.
 * - Clears all data from sessionStorage.
 * - Redirects the user to the homepage or login page.
 * 
 * @component
 * @returns {JSX.Element} A div element indicating the logout process.
 * 
 * @example
 * <LogoutHandler />
 */

const LogoutHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cookies
    Cookies.remove("session", { path: "/" });

    // Clear localStorage (token, chartData, and additionalData)
    localStorage.removeItem("token");
    localStorage.removeItem("clientData");

    // Clear sessionStorage if needed
    window.sessionStorage.clear();

    // Redirect to the homepage or login page
    navigate("/");
  }, [navigate]);

  return null;
};

export default LogoutHandler;
