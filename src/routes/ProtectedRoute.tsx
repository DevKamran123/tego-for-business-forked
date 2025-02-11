import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { isTokenExpired } from '../../utils/auth';
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const session = Cookies.get('session');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const checkToken = () => {
        const token = localStorage.getItem('token');
        // if (!token || isTokenExpired(token)) {
        if (!token) {
          navigate('/logout', { state: { from: location } });
        }
      };
  
      // Initial check
      checkToken();
  
      // Set up interval to check every 5 seconds
      const intervalId = setInterval(checkToken, 5000);
  
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }, [location, navigate]);
  
    if (!session) {
   
      return <Navigate to="/" state={{ from: location }} replace />;
  
    }
    
  
    return <>{children}</>;
  };

export default ProtectedRoute;
