import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { GetStartedSection } from "../components/GetStarted";
import { DownloadRideTEGO } from "../components/DownloadRideTEGO";
import "../styles/pages/Home.scss";

import Footer from "../components/Footer";
import useMenuStore from "../store/MenuStore";
import { StartDrive } from "../components/StartDrive";
import { HowItWorks } from "../components/HowItWorks";

const Home: React.FC = () => {
  const { setIsOpen: showSidebar } = useMenuStore((state) => state);

  useEffect(() => {
    showSidebar(false);
  }, []);

  return (
    <div className="homeCont">
      <Hero />
      <GetStartedSection />

      <HowItWorks />
      <StartDrive />
      <DownloadRideTEGO />

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
