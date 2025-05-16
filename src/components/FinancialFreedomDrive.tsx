import phoneOne from "../assets/images/phone-1.webp";
import schedule from "../assets/svgs/schedule.svg";
import signalAlt from "../assets/svgs/signal-alt-3.svg";
import ambulance from "../assets/svgs/ambulance.svg";
import apps from "../assets/svgs/apps.svg";

export const FinancialFreedomDrive = () => {
  const steps = [
    {
      svg: schedule,
      title: "Plan your schedule",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      svg: signalAlt,
      title: "Earn as you wish",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      svg: ambulance,
      title: "RideTego MEDs",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      svg: apps,
      title: "Follow the app and earn",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
  ];

  return (
    <main className="max-w-[1670px] mx-auto w-full">
      <div className="py-16 px-8 lg:px-16 flex flex-col lg:flex-row gap-16 items-center lg:justify-between">
        {/* Left Side - Drive your way to financial freedom */}
        <div className="w-full lg:w-2/3 lg:pr-4">
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-midGray font-semibold">
              Drive your way to financial freedom
            </h2>

            <div className="w-full grid grid-cols-2 gap-6 lg:gap-8 mt-8 md:mt-10 lg:mt-14">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-3 md:gap-5 ${
                    index > 1 && "mt-6 md:mt-8 lg:mt-10"
                  }`}
                >
                  <div>
                    <div className="relative size-[25px] md:size-[35px] lg:size-[50px]">
                      <img src={step.svg} alt={step.title} className="w-full" />
                    </div>
                    <h6 className="text-base md:text-lg lg:text-xl font-semibold text-ashGray mt-1">
                      {step.title}
                    </h6>
                  </div>
                  <p className="text-mistGray text-sm md:text-base lg:text-lg font-normal">
                    {step.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:mt-10 lg:mt-20 lg:w-1/3 opacity-75 rotate-[15deg]">
          <div className="relative">
            <div className="w-[280px] md:w-[380px] 2xl:w-[603px] mx-auto">
              <img
                src={phoneOne}
                alt="RideTEGO app ride view"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
