import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

interface LinkItem {
  title: string;
  slug: string;
  link: string;
  gap?: boolean;
}

const PersonalDashboardSidebar = () => {
  const menuItem: LinkItem[] = useMemo(
    () => [
      {
        title: "Home",
        slug: "home",
        link: "/personal/dashboard/",
      },
      {
        title: "Personal info",
        slug: "personal-info",
        link: "/personal/dashboard/personal-info",
      },
      {
        title: "Security",
        slug: "security",
        link: "/personal/dashboard/security",
      },
      {
        title: "Privacy & data",
        slug: "privacy-and-data",
        link: "/personal/dashboard/privacy-and-data",
      },
      {
        title: "Activity",
        slug: "activity",
        link: "/personal/dashboard/activity",
        gap: true,
      },
      {
        title: "Wallet",
        slug: "wallet",
        link: "/personal/dashboard/wallet",
      },
      {
        title: "Help",
        slug: "help",
        link: "/personal/dashboard/help",
      },
    ],
    []
  );

  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    menuItem.forEach((item) => {
      if (item.link === location.pathname) {
        setActiveItem(item.slug);
      }
    });
  }, [menuItem, location]);

  return (
    <div className="max-w-[16.25rem] lg:max-w-[18rem] w-full min-h-screen bg-dark-blue z-50 bg-[#F8F8F8]">
      <div className="flex flex-col">
        <div className="pl-5 py-9">
          <div className="flex flex-col gap-5">
            {menuItem.map((item) => (
              <Link
                className={`${
                  activeItem === item.slug
                    ? "bg-paleSilver py-2.5 px-3.5 font-semibold"
                    : "font-normal"
                } ${item.gap && "mt-24"} text-grayishBlue text-xl`}
                key={item.slug}
                to={item.link}
                onClick={() => setActiveItem(item.slug)}
              >
                {item.title}
              </Link>
            ))}
            <Link className="text-vividRed text-xl font-normal" to={"/logout"}>
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboardSidebar;
