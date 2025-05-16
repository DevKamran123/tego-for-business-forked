import phoneImage from "../assets/images/phone-4.webp";
import sedan from "../assets/svgs/sedan.svg";
import clipboardApprove from "../assets/svgs/clipboardapprove.svg";
import downloadMail from "../assets/svgs/downloadmail.svg";
import SectionCTA from "./SectionCTA";

export const HowItWorksDriver = () => {
  const procedures = [
    {
      imgSrc: downloadMail,
      title: "Receive a Offer",
      description:
        "You specify your details. Simply key in your information and let us know what type.",
    },
    {
      imgSrc: clipboardApprove,
      title: "Accept Offer",
      description:
        "The DriveTEGO app will help you with valuations and locations of riders.",
    },
    {
      imgSrc: sedan,
      title: "Start Trip",
      description:
        "It's just down to you to select your garage and the option that best suits.",
    },
  ];

  return (
    <div className="mt-20 lg:mt-11 max-w-[1670px] w-full mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-between gap-5 md:gap-10">
      <div className="w-full md:w-1/2">
        <div className="md:-mt-10 lg:-mt-14 mx-auto md:mx-0 size-[280px] lg:size-[450px] xl:size-[550px] 2xl:size-[650px]">
          <img
            src={phoneImage}
            alt="driver request app ride view"
            className="w-full"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 pt-4 md:pt-16">
        <div className="max-w-[235px] mx-auto md:max-w-full w-full grid md:grid-cols-2 items-center gap-6 lg:gap-8">
          {procedures.map((procedure, index) => (
            <div key={index} className="space-y-4 md:space-y-6">
              <div className="bg-darkBluish/15 rounded-xl lg:rounded-3xl p-3 md:p-5 w-fit mx-auto md:mx-0">
                <div className="size-[25px] md:size-[35px] lg:size-[50px] relative">
                  <img
                    src={procedure.imgSrc}
                    alt={procedure.title}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2 lg:space-y-3 text-center md:text-left">
                <h6 className="text-base md:text-lg lg:text-xl font-semibold text-ashGray">
                  {procedure.title}
                </h6>
                <p className="text-sm md:text-base lg:text-lg text-lightSilver font-semibold">
                  {procedure.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 w-full flex justify-center md:justify-start">
          <SectionCTA />
        </div>
      </div>
    </div>
  );
};
