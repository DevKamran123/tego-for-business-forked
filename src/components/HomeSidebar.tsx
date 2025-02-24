import { Drawer, Dropdown, MenuProps, Space, Typography } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useMenuStore from "../store/MenuStore";
import globe from "../assets/images/globe.png";
import "../styles/components/HomeSidebar.scss";

// Define proper types for menu items
type MenuItem = Required<MenuProps>['items'][number];

// Define the items array with proper typing
const items: MenuItem[] = [
  {
    key: '1',
    label: 'For Enterprise',
    type: 'item'
  },
  {
    key: '2',
    label: 'For Users',
    type: 'item'
  },
];

interface MenuState {
  isOpen: boolean;
}

const HomeSidebar: React.FC = () => {
  const navigate = useNavigate();
  const isOpen = useMenuStore((state: MenuState) => state.isOpen);
  const [selectedKey, setSelectedKey] = useState<string>('1');

  // Type the menu click handler properly
  const handleMenuClick = (key: string): void => {
    setSelectedKey(key);
  };

  const selectedItem: any = items.find(item => item?.key === selectedKey);
  const selectedLabel = selectedItem?.label;

  return (
    <div className="sidebar">
      <Drawer
        placement="left"
        closable={false}
        open={isOpen}
        mask={false}
        rootClassName="custom-sidebar"
        getContainer={false}
      >
        <div className="sidebar-content">
          <div className="sidebar-content_links">
              <Dropdown
                menu={{
                  items,
                  selectable: true,
                  defaultSelectedKeys: [selectedKey],
                  onClick: ({ key }) => handleMenuClick(key.toString()),
                }}
                trigger={['click']}
              >
                <Typography.Link className="custom-dropdown-trigger">
                  <Space>
                    {selectedLabel}
                    <DownOutlined />
                  </Space>
                </Typography.Link>
              </Dropdown>
              <div>Drive</div>
              <div>Ride</div>
              <div>Contact Us</div>
              <div>About Us</div>
          </div>

          <div className="sidebar-content_auth">
            <div className="sidebar-content_auth_lang">
                <div className="sidebar-content_auth_lang_image">
                    <img src={globe} alt="globe" />
                </div>
                <div className="sidebar-content_auth_lang_symbol">EN</div>
            </div>
            <div 
              className="sidebar-content_auth_login" 
              onClick={() => navigate("/login")}
            >
              Log In
            </div>
            <div 
              className="sidebar-content_auth_signup" 
              onClick={() => navigate("/signup")}
            >
              Sign up
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default HomeSidebar;