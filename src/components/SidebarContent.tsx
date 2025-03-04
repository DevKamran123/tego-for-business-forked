import React from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import useAppStore from "../store/AppStore";
import { DASHBOARD_LINKS } from "../routes/links";
import SidenavProvider from "./layouts/sidebar/SidenavProvider";
import SidebarItems from "./layouts/sidebar/SidebarItems";
import Stack from "./stack/Stack";
import "../styles/components/SidebarContent.scss";

const SidebarContent: React.FC = () => {
  const { sideBarOpen } = useAppStore((state) => state);
  // const [localSideBarOpen, setLocalSideBarOpen] = React.useState(sideBarOpen);
  return (
    <div
      className="sidebarContent"
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
      <Link to={"/logout"}>
        <Stack gap={12} classnames="logout-wrapper">
          <MdLogout color="#AF2E2F" size={24} />
          <p>Logout</p>
        </Stack>
      </Link>
    </div>
  );
};

export default SidebarContent;
