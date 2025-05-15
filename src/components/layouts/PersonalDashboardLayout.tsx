import React from "react";
import Header from "../Header";
import PersonalDashboardSidebar from "./sidebar/PersonalDashboardSidebar";

interface PersonalDashboardLayoutProps {
  children: React.ReactNode;
}

const PersonalDashboardLayout: React.FC<PersonalDashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div className="w-full flex flex-col h-screen overflow-hidden">
      {/* Top Header */}
      <Header />

      <div className="w-full flex flex-1 overflow-hidden">
        <PersonalDashboardSidebar />
        <div className="bg-white flex-1 overflow-y-auto mb-8">{children}</div>
      </div>
    </div>
  );
};

export default PersonalDashboardLayout;
