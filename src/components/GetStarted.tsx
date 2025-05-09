import BusinessWoman from "../../src/assets/images/business-woman.svg";

export const GetStartedSection = () => {
  const steps = [
    {
      number: 1,
      title: "Sign In",
      description: "Log into your Tego Account using your personal credentials",
    },
    {
      number: 2,
      title: "Verify your account",
      description:
        "Enter the 4-digit code sent to your phone or email to confirm your identity.",
    },
    {
      number: 3,
      title: "Check Eligibility",
      description:
        "Enter your work email to see if you qualify for a business account connection.",
    },
    {
      number: 4,
      title: "Activate Your Account",
      description:
        'If eligible, you\'ll receive an email. Open it on your device and tap "Activate Account."',
    },
    {
      number: 5,
      title: "Join Your Organization",
      description: 'Select "Join Now" to finalize your setup.',
    },
  ];

  return (
    <main className="max-w-screen-xl mx-auto py-16 px-8 flex flex-col lg:flex-row gap-8 items-center">
      {/* Left Side - Image */}
      <div className="w-full lg:w-1/2">
        <div className="rounded-full overflow-hidden w-full max-w-lg mx-auto">
          <img
            src={BusinessWoman}
            alt="Business person in car"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right Side - Content */}
      <section className="w-full lg:w-1/2 flex flex-col gap-5">
        <div className="max-w-[35.4rem] w-full space-y-3">
          <h2 className="text-2xl md:text-5xl font-bold text-charcoal">
            Get Started With TEGO for Business
          </h2>

          <p className="text-base md:text-lg text-grayishBlue">
            Download the RideTEGO app from the Play Store, create an account,
            and book a ride in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 md:space-y-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-5 group cursor-pointer transition-all duration-300 hover:pl-6"
            >
              <div className="flex items-center justify-center bg-darkBluish bg-opacity-25 rounded-lg md:rounded-2xl w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border-2 border-darkBluish transition-colors duration-300 group-hover:bg-darkBluish">
                <p className="text-base md:text-2xl font-semibold text-darkBluish transition-colors duration-300 group-hover:text-white">
                  {step.number}
                </p>
              </div>
              <div className="space-y-2.5 ">
                <h4 className="font-medium text-base md:text-lg text-grayishBlue">
                  {step.title}
                </h4>
                <p className="text-sm font-light text-grayishBlue">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <div className="flex items-center gap-4">
          <button className="bg-darkIndigo text-white text-lg px-6 py-3.5 md:px-12 md:py-7 rounded-2xl font-medium">
            Get Started
          </button>
          <a
            href="#"
            className="text-darkBluish font-normal underline text-base"
          >
            Already have an account? Sign in
          </a>
        </div>
      </section>
    </main>
  );
};
