import React, { useEffect } from "react";
import { DownloadRideTEGO } from "../components/DownloadRideTEGO";
import "../styles/pages/Home.scss";

import Footer from "../components/Footer";
import useMenuStore from "../store/MenuStore";
import { StartDrive } from "../components/StartDrive";
import { HowItWorks } from "../components/HowItWorks";
import { DrivesHero } from "../components/DrivesHero";
import { FinancialFreedomDrive } from "../components/FinancialFreedomDrive";
import { GetStartedDriving } from "../components/GetStartedDriving";
import { DriverEssentials } from "../components/DriverEssentials";
import { FAQ } from "../components/FAQ";

const Drives: React.FC = () => {
  const { setIsOpen: showSidebar } = useMenuStore((state) => state);

  useEffect(() => {
    showSidebar(false);
  }, []);

  return (
    <div className="homeCont">
      <DrivesHero />
      <FinancialFreedomDrive />
      <GetStartedDriving />
      <DriverEssentials />
      <HowItWorks />
      <StartDrive />
      <FAQ />
      <DownloadRideTEGO />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Drives;
