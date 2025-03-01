import { Drawer } from "antd";
import useMenuStore from "../store/MenuStore";
import "../styles/components/HomeSidebar.scss";
import SidebarContent from "./SidebarContent";

interface MenuState {
  isOpen: boolean;
}

const MobileSidebar: React.FC = () => {
  const isOpen = useMenuStore((state: MenuState) => state.isOpen);

  return (
    <div>
      <Drawer
        placement="left"
        closable={false}
        open={isOpen}
        mask={false}
        rootClassName="custom-sidebar"
        getContainer={false}
      >
        <SidebarContent />
      </Drawer>
    </div>
  );
};

export default MobileSidebar;