import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { usePHPUser } from "../hooks/usePHPUser";

/**
 * LogoutHandler component handles the user logout process.
 * 
 * This component performs the following actions:
 * - Clears the session cookie.
 * - Removes the Node API token from localStorage.
 * - Removes PHP authentication data (token and user data) using the usePHPUser hook.
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
  const { clearPHPUser } = usePHPUser();
  
  useEffect(() => {
    // Clear cookies
    Cookies.remove("session", { path: "/" });

    // Clear localStorage (token, chartData, and additionalData)
    localStorage.removeItem("token");
    localStorage.removeItem("clientData");
    localStorage.removeItem("session");
    
    // Clear PHP authentication data using the hook utility
    clearPHPUser();

    // Clear sessionStorage if needed
    window.sessionStorage.clear();

    // Redirect to the homepage or login page
    navigate("/");
  }, [navigate, clearPHPUser]);

  return null;
};

export default LogoutHandler;
