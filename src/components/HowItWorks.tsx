import { useState } from "react";
import { howItWorksData } from "../data/howItWorks";

export const HowItWorks = () => {
  // const startIndex = howItWorksData.length - 1;
  const [activeTab, setActiveTab] = useState(0);

  const ActiveContent = howItWorksData[activeTab].Content;

  return (
    <main className="bg-white pt-5 pb-16 md:pt-16 md:pb-48 px-8 lg:px-16">
      <div className="text-center max-w-[788px] w-full mx-auto mb-10">
        <h2 className="text-4xl text-midGray font-semibold mb-6">
          How does this app work
        </h2>

        <p className="text-xl font-semibold text-mistGray">
          {howItWorksData[activeTab].description}
        </p>

        <div className="bg-softWhite flex rounded-t max-w-[325px] w-full mx-auto py-3.5 px-2.5">
          {howItWorksData.map(({ label }, index) => (
            <button
              onClick={() => setActiveTab(index)}
              key={index}
              className={`${
                index === activeTab && "bg-darkIndigo rounded-xl text-white"
              } w-[148px] py-4 text-center z-50`}
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
