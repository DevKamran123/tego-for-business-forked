import rideTegoAppView from "../assets/images/phone-2.webp";

export const DownloadRideTEGO = () => {
  return (
    <main className="bg-white pt-5 pb-16 md:pt-16 md:pb-48 px-8 lg:px-16  ">
      <div className="max-w-[1670px] w-full mx-auto flex flex-col lg:flex-row items-center md:justify-between gap-5 md:gap-10 bg-darkIndigo text-white rounded-2xl md:rounded-4xl overflow-hidden relative">
        {/* Left side - Content */}
        <div className="w-full lg:w-1/2 px-5 py-8 md:px-9 md:py-16 space-y-10">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Download RideTEGO App
            </h2>

            <p className="text-sm md:text-base lg:text-xl text-white font-semibold">
              RideTEGO is an innovative new entrant into the ride-hailing market
              in East Africa. Operated and owned by Africans for Africans,
              RideTEGO brings local creativity and insights to get improving the
              experience of passengers and drivers. Whether you need to get
              where you're going fast or looking to make money on your own
              schedule, RideTEGO provides the best in class solution.
            </p>
          </div>

          <button className="flex items-center justify-center bg-crimsonRed text-white text-base md:text-lg px-6 py-3 md:px-12 md:py-5 rounded-md font-semibold">
            Get Started
          </button>
        </div>

        {/* Right side - App Screenshots */}
        <div className="hidden lg:block w-full lg:w-1/2 px-5 md:px-9 mt-10 lg:-my-2">
          {/* Main phone */}
          <div className="relative">
            <div className="350px md:w-[400px] w-[450px] xl:w-[532px] overflow-hidden">
              <img
                src={rideTegoAppView}
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
