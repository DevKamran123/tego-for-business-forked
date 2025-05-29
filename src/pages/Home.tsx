import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { GetStartedSection } from "../components/GetStarted";
import { DownloadRideTEGO } from "../components/DownloadRideTEGO";
import "../styles/pages/Home.scss";
import { useLoadScript } from "@react-google-maps/api";
import Loader from "../components/Loader"; // Assuming you have a Loader component
import { getGoogleMapsApiKey } from "../utils/env"; // Assuming this utility exists

import Footer from "../components/Footer";
import useMenuStore from "../store/MenuStore";
import { StartDrive } from "../components/StartDrive";
import { HowItWorks } from "../components/HowItWorks";

const Home: React.FC = () => {
  const { setIsOpen: showSidebar } = useMenuStore((state) => state);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: getGoogleMapsApiKey(), // Make sure this function returns your API key
    libraries: ["places"],
  });

  useEffect(() => {
    showSidebar(false);
  }, [showSidebar]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <Loader />;

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
