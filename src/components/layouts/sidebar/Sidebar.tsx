import React from "react";
import { GoSidebarCollapse } from "react-icons/go";
import useAppStore from "../../../store/AppStore";
import SidenavProvider from "./SidenavProvider";
import SidebarItems from "./SidebarItems";
import { DASHBOARD_LINKS } from "../../../routes/links";
import Stack from "../../stack/Stack";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/components/layouts/DashboardLayout.scss"
import DistanceUnitToggle from "../../units/DistanceUnitToggle";

const Sidebar: React.FC = () => {
  const { sideBarOpen, setSideBarOpen } = useAppStore((state) => state);
  const navigate = useNavigate();
  // const [localSideBarOpen, setLocalSideBarOpen] = React.useState(sideBarOpen);
  return (
    <div
      className="sidebar"
      // onMouseEnter={() => {
      //   if (!localSideBarOpen) {
      //     setSideBarOpen(true);
      //   }
      // }}
      // onMouseLeave={() => {
      //   if (!localSideBarOpen) {
      //     setSideBarOpen(false);
      //   }
      // }}
    >
      <Stack direction="column" gap={60}>
        <div className="sidebar_header">
          <div className="logo_wrapper" onClick={() => navigate("/")}>
            <div className="logo_icon_wrapper">
              <img src="/favicon.svg" className="logo_icon" alt="logo" />
            </div>
            <h1>RideTego</h1>
          </div>
          <div
            className={`header_wrapper ${!sideBarOpen ? "collapsed" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              // if (!localSideBarOpen) {
              //   setSideBarOpen(true);
              //   setLocalSideBarOpen(true);
              // } else {
              //   setSideBarOpen(!sideBarOpen);
              //   setLocalSideBarOpen(!localSideBarOpen);
              // }
              setSideBarOpen(!sideBarOpen);
            }}
          >
            <GoSidebarCollapse size={24} color="white" />
          </div>
        </div>
        <div
          style={{
            width: sideBarOpen ? "90%" : "100%",
          }}
        >
          <SidenavProvider>
            <SidebarItems links={DASHBOARD_LINKS} />
          </SidenavProvider>
        </div>
      </Stack>
      <div className="sidebar-bottom-section">
        <DistanceUnitToggle sideBarOpen={sideBarOpen}/>
        {/* ...existing logout button... */}
      </div>
      <Link to={"/logout"}>
        <Stack gap={8} classnames="logout-wrapper">
          <MdLogout color="#AF2E2F" size={24} />
          <p>Logout</p>
        </Stack>
      </Link>
    </div>
  );
};

export default Sidebar;
