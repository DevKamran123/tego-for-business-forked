import React, { JSX, useEffect, useState } from "react";
import "../../../styles/components/layouts/SideBarItem.scss";
import { Link, useLocation } from "react-router-dom";
import { useSidenavContext } from "./SidenavProvider";
import useAppStore from "../../../store/AppStore";
import { Chevron } from "../../icons/Chevron";
import Stack from "../../stack/Stack";
import useMenuStore from "../../../store/MenuStore";

interface LinkItem {
  TITLE: string;
  LINK: string;
  SLUG: string;
  ISDASHBOARD?: boolean;
  ISHELP?: boolean;
  ISLOGOUT?: boolean;
  IS_EXTERNAL?: boolean;
  ICON: (isActive: boolean) => JSX.Element;
  CHILDREN?: LinkItem[];
}

interface SidebarItemsProps {
  links: LinkItem[];
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ links }) => {
  const location = useLocation();
  const { setOpen } = useSidenavContext();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {setShowMobileMenu, sideBarOpen} = useAppStore((state) => state);
  const {setIsOpen: showSidebar} = useMenuStore((state)=>state)

  useEffect(() => {
    // Set the active item based on the current location
    links.forEach((link) => {
      if (link.LINK === location.pathname) {
        setActiveItem(link.SLUG);
      } else if (link.CHILDREN) {
        link.CHILDREN.forEach((child) => {
          if (child.LINK === location.pathname) {
            setActiveItem(child.SLUG);
            setOpenMenus((prev) => [...prev, link.SLUG]); // Ensure parent menu is open
          }
        });
      }
    });
  }, [location, links]);

  const toggleMenu = (slug: string) => {
    setOpenMenus((prevOpenMenus) =>
      prevOpenMenus.includes(slug)
        ? prevOpenMenus.filter((menu) => menu !== slug)
        : [...prevOpenMenus, slug]
    );
  };

  const handleLinkClick = (slug: string) => {
    setTimeout(() => {
      showSidebar(false);
    }, 200); // 3000 milliseconds = 3 seconds
    
    setActiveItem(slug);
    setOpen(false); // Close the sidebar
    setShowMobileMenu(false); // Close the mobile menu

  };

  const renderSidebarItem = (link: LinkItem) => {
    const isActive =
      activeItem === link.SLUG ||
      link.CHILDREN?.some((child) => activeItem === child.SLUG) ||
      false;

    return (
      <div
        className={`items ${isActive && 'activeParentItem'}`}
        key={link.SLUG}
      >
        {link.CHILDREN ? (
          <>
            <div
              className={`parentItem ${isActive && "active"}`}
              key={link.SLUG}
              onClick={() => toggleMenu(link.SLUG)}
            >
              {link.ICON(isActive)}
              {sideBarOpen && <div
              className={`menuTitle ${
                isActive && "activeMenuTitle"
              }`}
              >
              <span>{link.TITLE}</span>
              </div>}
              <Chevron
              isActive={isActive}
              className={`chevronIcon ${
                openMenus.includes(link.SLUG) && "rotated"
              }`}
              />
            </div>

            <div
              className={`submenu ${
              openMenus.includes(link.SLUG) && 'open'
              }`}
            >
              {link.CHILDREN.map((child) => (
              <div
                className={`childItem ${
                activeItem === child.SLUG && 'active'
                }`}
                key={child.SLUG}
              >
                <div
                className={`activeChildCircle ${
                  activeItem === child.SLUG && 'activeChildCircle'
                }`}
                ></div>
                <Link
                className={`submenuLink ${
                  activeItem === child.SLUG && 'activeChildItem'
                }`}
                to={child.LINK}
                onClick={() => handleLinkClick(child.SLUG)}
                >
                {child.TITLE}
                </Link>
              </div>
              ))}
            </div>
            </>
          ) : link.IS_EXTERNAL ? (
            <a
            className={`item ${isActive && 'activeMenuTitle'} ${
              isActive && 'active'
            } ${!sideBarOpen && 'collapsed'}`}
            href={link.LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowMobileMenu(false)}
            >
            {link.ICON(isActive)}
            {sideBarOpen && <div
              className={`menuTitle ${
              isActive && 'activeMenuTitle'
              }`}
            >
              <span>{link.TITLE}</span>
            </div>}
            </a>
          ) : (
            <Link
            className={`item ${isActive && 'activeMenuTitle'} ${
              isActive && 'active'
            } ${!sideBarOpen && 'collapsed'}`}
            to={link.LINK}
            onClick={() => handleLinkClick(link.SLUG)}
            >
            {link.ICON(isActive)}
            {sideBarOpen && <div
              className={`menuTitle ${
              isActive && 'activeMenuTitle'
              }`}
            >
              <span>{link.TITLE}</span>
            </div>}
            </Link>
          )}
          </div>
        );
        };

        // Filter out and render Help and Logout links
        const helpLink = links.filter(
        (link) => link.ISHELP
        );
        const LogoutLink = links.filter(
        (link) => link.ISLOGOUT
        );
        const otherLinks = links.filter((link) => !link.ISHELP && !link.ISLOGOUT);

        return (
        <Stack direction="column" gap={20}>
          {otherLinks.map(renderSidebarItem)}
          <div className="help">
          {helpLink.map(renderSidebarItem)}
          </div>
          <div className="logout">
          {LogoutLink.map(renderSidebarItem)}
          </div>
        </Stack>
        );
};

export default SidebarItems;
