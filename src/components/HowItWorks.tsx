import { useState } from "react";
import { howItWorksData } from "../data/howItWorks";

export const HowItWorks = () => {
  // const startIndex = howItWorksData.length - 1;
  const [activeTab, setActiveTab] = useState(0);

  const ActiveContent = howItWorksData[activeTab].Content;

  return (
    <main className="bg-white pt-5 pb-16 md:pt-16 md:pb-48 px-8 lg:px-16">
      <div className="text-center max-w-[788px] w-full mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-midGray font-semibold mb-6">
          How does this app work
        </h2>

        <p className="text-base md:text-xl h-20 md:h-auto font-semibold text-mistGray">
          {howItWorksData[activeTab].description}
        </p>

        <div className="mt-6 md:mt-8 lg:mt-11 bg-softWhite flex rounded-t w-fit mx-auto py-2 px-1.5 md:py-3.5 md:px-2.5">
          {howItWorksData.map(({ label }, index) => (
            <button
              onClick={() => setActiveTab(index)}
              key={index}
              className={`${
                index === activeTab &&
                "bg-darkIndigo rounded-lg md:rounded-xl text-white"
              } w-[100px] md:w-[148px] py-2 md:py-4 text-sm md:text-base text-center`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <ActiveContent />
      </div>
    </main>
  );
};
