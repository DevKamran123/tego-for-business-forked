import { Dropdown, MenuProps, Space, Typography } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useMenuStore from "../store/MenuStore";
import globe from "../assets/images/globe.png";
import "../styles/components/HomeSidebar.scss";
import "../styles/components/MobileSidebar.scss";
import Cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";

// Define proper types for menu items
type MenuItem = Required<MenuProps>['items'][number];

// Define the items array with proper typing
const items: MenuItem[] = [
  {
    key: '1',
    label: 'Business',
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
  setIsOpen: (isOpen: boolean) => void;
}

const HomeSidebar: React.FC = () => {
  const navigate = useNavigate();
  const isOpen = useMenuStore((state: MenuState) => state.isOpen);
  const [selectedKey, setSelectedKey] = useState<string>('1');
  const { setIsOpen: showSidebar } = useMenuStore((state) => state as MenuState);
  const session = Cookies.get('session');
  const isMobile = useMediaQuery({maxWidth: 865});

  // Type the menu click handler properly
  const handleMenuClick = (key: string): void => {
    setSelectedKey(key);
  };

  // Handle auth button clicks
  const handleAuthButtonClick = (path: string): void => {
    showSidebar(false); // Close the sidebar
    navigate(path);
  };

  const selectedItem: any = items.find(item => item?.key === selectedKey);
  const selectedLabel = selectedItem?.label;

  return (
    <div className={`mobileSidebar ${isOpen && isMobile ? "mobileSidebar_active" : ""}`}>

      <div className="homeSidebar">
          <div className="homeSidebar-content">
            <div className="homeSidebar-content_links">
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
                <div>About Us</div>
                <div>Blog</div>
            </div>
  
            <div className="homeSidebar-content_auth">
              <div className="homeSidebar-content_auth_lang">
                  <div className="homeSidebar-content_auth_lang_image">
                      <img src={globe} alt="globe" />
                  </div>
                  <div className="sidebar-content_auth_lang_symbol">EN</div>
              </div>
              {!session && 
              <div 
                className="homeSidebar-content_auth_login" 
                onClick={() => handleAuthButtonClick("/login")}
              >
                Log In
              </div>}

              {!session && 
              <div 
                className="homeSidebar-content_auth_signup" 
                onClick={() => handleAuthButtonClick("/signup")}
              >
                Sign up
              </div>}

              {session && 
              <div 
                className="homeSidebar-content_auth_signup" 
                onClick={() => handleAuthButtonClick("/dashboard")}
              >
                Dashboard
              </div>}
            </div>
          </div>
      </div>
      </div>
  )
};

export default HomeSidebar;