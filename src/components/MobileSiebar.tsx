import { useMediaQuery } from "react-responsive";
import useMenuStore from "../store/MenuStore";
import "../styles/components/HomeSidebar.scss";
import "../styles/components/MobileSidebar.scss";
import SidebarContent from "./SidebarContent";

const MobileSidebar: React.FC = () => {
  const isOpen = useMenuStore((state) => state.isOpen);
  const isMobile = useMediaQuery({maxWidth: 865});

  // if (!isMobile) showSidebar(false);

  return (
    <div className={`mobileSidebar ${isOpen && isMobile ? "mobileSidebar_active" : ""}`}>
      <SidebarContent />
    </div>
  );
};

export default MobileSidebar;