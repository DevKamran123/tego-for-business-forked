import React from "react";
import useAppStore from "../../store/AppStore";
import "../../styles/components/layouts/DashboardLayout.scss";
import Sidebar from "./sidebar/Sidebar";
import { useLoadScript } from "@react-google-maps/api";
import { getGoogleMapsApiKey } from "../../utils/env"; // Assuming this utility exists
import Loader from "../Loader"; // Assuming you have a Loader component

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { sideBarOpen } = useAppStore((state) => state);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: getGoogleMapsApiKey(),
    libraries: ["places"],
  });

  if (loadError)
    return (
      <div>
        Error loading maps. Please check your API key and internet connection.
      </div>
    );
  if (!isLoaded) return <Loader />; // Or some other loading indicator

  return (
    <div className="dashboard_layout">
      {/* <div className='dashboard_header_wrapper'>
        <DashboardHeader />
      </div> */}
      <div
        className={`dashboard_body_wrapper ${!sideBarOpen ? "collapsed" : ""}`}
      >
        <div
          className="sidebar_wrapper"
          style={{ backgroundImage: `url("/src/assets/images/bgAuth.png")` }}
        >
          <Sidebar />
        </div>
        <div className="content_wrapper">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
