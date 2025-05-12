import phoneImage from "../assets/images/phone-3.webp";
import SectionCTA from "./SectionCTA";

export const HowItWorksRider = () => {
  const leftProcedures = [
    {
      step: 1,
      title: "Request a Trip",
      description:
        "Choose your pickup and drop-off location, and the trip type that meets your needs",
    },
    {
      step: 3,
      title: "Enjoy Your Trip",
      description:
        "Meet your driver with the help of our real-time GPS services and enjoy your trip!",
    },
  ];

  const rightProcedures = [
    {
      step: 2,
      title: "Match with a Driver",
      description: "RideTEGO will match you with the nearest available driver",
    },
    {
      step: 4,
      title: "Pay and Rate",
      description: "Pay with cash or card and rate your driver",
    },
  ];

  const allProcedures = [...leftProcedures, ...rightProcedures].sort(
    (a, b) => a.step - b.step
  );

  return (
    <div className="max-w-[1670px] w-full mx-auto ">
      <div className="hidden md:flex flex-col md:flex-row items-start md:justify-between gap-5 md:gap-10">
        {/* left procedures */}
        <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-9">
          {leftProcedures.map((procedure) => (
            <div
              key={procedure.step}
              className="py-4 px-6 lg:py-6 lg:px-10 lg:text-right space-y-3 md:space-y-6 group max-w-[420px]"
            >
              <div className="lg:ml-auto w-fit py-6 lg:py-8 px-8 lg:px-11 bg-darkBluish/25 border border-darkBluish/45 text-darkBluish rounded-xl lg:rounded-3xl flex justify-center items-center group-hover:bg-darkBluish group-hover:text-white">
                {procedure.step}
              </div>

              <div className="space-y-3">
                <h6 className="text-lg md:text-xl font-semibold text-ashGray">
                  {procedure.title}
                </h6>
                <p className="text-base md:text-lg text-lightSilver font-semibold">
                  {procedure.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* procedure image */}
        <div className="hidden lg:block relative">
          <div className="w-[450px] xl:w-[500px]  2xl:w-[560px]">
            <img
              src={phoneImage}
              alt="request for ride view"
              className="w-full"
            />
          </div>
        </div>

        {/* right procedures */}
        <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-9">
          {rightProcedures.map((procedure) => (
            <div
              key={procedure.step}
              className="text-left space-y-3 md:space-y-6 group max-w-[425px] py-4 px-6 lg:py-6 lg:px-10"
            >
              <div className="w-fit py-6 lg:py-8 px-8 lg:px-11 bg-darkBluish/25 border border-darkBluish/45 text-darkBluish rounded-xl lg:rounded-3xl flex justify-center items-center group-hover:bg-darkBluish group-hover:text-white">
                {procedure.step}
              </div>

              <div className="space-y-3">
                <h6 className="text-lg md:text-xl font-semibold text-ashGray">
                  {procedure.title}
                </h6>
                <p className="text-base md:text-lg text-lightSilver font-semibold">
                  {procedure.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* procedures small devices */}
      <div className="flex md:hidden flex-col space-y-4 md:space-y-6 lg:space-y-9">
        {allProcedures.map((procedure) => (
          <div
            key={procedure.step}
            className="py-4 px-6 lg:py-6 lg:px-10 lg:text-right space-y-3 group max-w-[420px]"
          >
            <div className="lg:ml-auto w-fit py-4 px-6 bg-darkBluish/25 border border-darkBluish/45 text-darkBluish rounded-xl flex justify-center items-center group-hover:bg-darkBluish group-hover:text-white">
              {procedure.step}
            </div>

            <div className="space-y-2">
              <h6 className="text-base font-semibold text-ashGray">
                {procedure.title}
              </h6>
              <p className="text-sm text-lightSilver font-semibold">
                {procedure.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* procedure image */}
      <div className="lg:hidden relative mt-10">
        <div className="w-[260px] mx-auto">
          <img
            src={phoneImage}
            alt="request for ride view"
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-16 flex w-full md:justify-center">
        <SectionCTA />
      </div>
    </div>
  );
};
