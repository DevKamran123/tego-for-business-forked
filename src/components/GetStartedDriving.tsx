import addAccount from "../assets/svgs/add-account.svg";
import checkSquare from "../assets/svgs/check-square.svg";
import shippingTruck from "../assets/svgs/shipping-truck.svg";

export const GetStartedDriving = () => {
  const steps = [
    {
      svg: addAccount,
      title: "Sign up online",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      label: "Sign up online",
    },
    {
      svg: checkSquare,
      title: "Check driving  requirements",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      label: "Requirements",
    },
    {
      svg: shippingTruck,
      title: "Get a Vehicle",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      label: "Vehicle  requirements",
    },
  ];

  return (
    <main className="max-w-[1670px] mx-auto w-full">
      <div className="py-16 px-8 lg:px-16 flex flex-col gap-16">
        <div className="w-full flex flex-col gap-4 md:gap-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-midGray font-semibold">
            Get started
          </h2>

          <p className="text-base md:text-xl font-semibold text-mistGray">
            Steps to follow and start Driving
          </p>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
          {steps.map((step, index) => (
            <div className="w-full lg:w-[27%] flex flex-col gap-4" key={index}>
              <div className="relative size-[25px] md:size-[35px] lg:size-[50px]">
                <img src={step.svg} alt={step.title} className="w-full" />
              </div>

              <h6 className="text-base md:text-lg lg:text-xl font-semibold text-ashGray">
                {step.title}
              </h6>

              <p className="text-mistGray text-sm md:text-base lg:text-lg font-normal">
                {step.content}
              </p>

              <a
                href="#"
                className="pb-1 md:pb-2.5 w-fit text-sm md:text-base lg:text-lg font-semibold text-ashGray border-b border-midGray/50"
              >
                {step.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
