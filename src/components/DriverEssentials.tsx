import chatSupport from "../assets/svgs/chat-support.svg";
import messages from "../assets/svgs/messages.svg";
import health from "../assets/svgs/health.svg";

export const DriverEssentials = () => {
  const steps = [
    {
      svg: chatSupport,
      title: "Sign up online",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      svg: messages,
      title: "Check driving  requirements",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      svg: health,
      title: "Get a Vehicle",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
  ];

  return (
    <main className="bg-darkIndigo/10">
      <div className="max-w-[1670px] mx-auto w-full">
        <div className="py-24 px-8 lg:px-16 flex flex-col gap-16">
          <div className="w-full flex flex-col gap-3 md:gap-6 text-center items-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-midGray font-semibold">
              Driver Essentials
            </h2>

            <p className="text-base md:text-xl font-semibold text-mistGray">
              Things we do to help our Drivers
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-8 items-center justify-between">
            {steps.map((step, index) => (
              <div
                className="w-full lg:w-[27%] flex flex-col gap-3.5"
                key={index}
              >
                <div className="relative size-[25px] md:size-[35px] lg:size-[50px]">
                  <img src={step.svg} alt={step.title} className="w-full" />
                </div>

                <h6 className="text-base md:text-lg lg:text-xl font-semibold text-ashGray">
                  {step.title}
                </h6>

                <p className="text-mistGray text-sm md:text-base lg:text-lg font-normal">
                  {step.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
