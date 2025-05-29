import React from "react";
import "../styles/components/Hero.scss";
import Header from "./Header";
import Homesidebar from "./HomeSidebar";

export const DrivesHero: React.FC = () => {
  return (
    <div className="heroCont bg-driver-bg-image bg-no-repeat bg-cover bg-center md:bg-left overflow-hidden relative">
      <div className="heroCont_overlay"></div>
      <div className="heroCont_content">
        <div className="w-full border-b border-white">
          <Header />
        </div>
        <div className="heroCont_content_layout">
          <Homesidebar />

          <div className="max-w-[1670px] w-full pt-32 pb-40 mx-auto px-8 lg:px-16">
            <div className="max-w-full md:max-w-[41%] flex flex-col items-center md:items-start gap-24 px-5 md:px-9">
              <div className="space-y-8 w-full text-center md:text-left">
                <h1 className="text-4xl md:text-6xl text-white font-bold">
                  Want to be your own boss?
                </h1>
                <p className="text-lg md:text-2xl text-white font-semibold">
                  RideTEGO is an excellent platform to realize this dream.
                </p>
              </div>
              <div className="">
                <button className="bg-crimsonRed border border-scarletRed text-base md:text-xl lg:text-2xl font-semibold text-white py-3 md:py-5 lg:py-7 px-5 md:px-7 lg:px-9 rounded-lg md:rounded-xl">
                  Register to drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
