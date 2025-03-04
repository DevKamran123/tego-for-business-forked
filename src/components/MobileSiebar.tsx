import useMenuStore from "../store/MenuStore";
import "../styles/components/HomeSidebar.scss";
import "../styles/components/MobileSidebar.scss";
import SidebarContent from "./SidebarContent";

const MobileSidebar: React.FC = () => {
  const isOpen = useMenuStore((state) => state.isOpen);

  return (
    <div className={`mobileSidebar ${isOpen ? "mobileSidebar_active" : ""}`}>
      <SidebarContent />
    </div>
  );
};

export default MobileSidebar;