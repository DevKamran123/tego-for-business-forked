import React from "react";
import useAppStore from "../../store/AppStore";
import "../../styles/components/layouts/DashboardLayout.scss";
import Sidebar from "./sidebar/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { sideBarOpen } = useAppStore((state) => state);
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
