import googleplay from "../assets/svgs/google_play_btn.svg";
import appstore from "../assets/svgs/app_store_btn.svg";
import phoneone from "../assets/images/phone-1.webp";

export const StartDrive = () => {
  return (
    <main className="bg-image-startDrive bg-top bg-no-repeat bg-contain   px-8 lg:px-16 md:pt-24 md:pb-32">
      <div className="max-w-[1670px] w-full mx-auto flex flex-col lg:flex-row items-center md:justify-between gap-5 md:gap-10">
        {/* left side - content */}
        <div className="w-full lg:max-w-[43%] xl:max-w-1/2 px-5 py-8 md:px-9 md:py-16 space-y-10">
          <div className="text-center lg:text-left">
            <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl text-slateAsh mb-6 xl:mb-8">
              Download app, Start drive, Earn money!
            </h1>
            <p className="text-fogSilver text-sm md:text-base lg:text-xl xl:text-2xl mb-10 xl:mb-14">
              Download DriveTEGO app from playstore, create account use your car
              and drive by yourself. Get ride and earn more money.
            </p>

            <div className="flex items-center justify-center lg:justify-start">
              <button className="cursor-pointer w-[130px] md:w-[200px] xl:w-[290px]">
                <img src={googleplay} alt="google" className="" />
              </button>
              <button className="cursor-pointer w-[130px] md:w-[200px] xl:w-[290px]">
                <img src={appstore} alt="google" className="" />
              </button>
            </div>
          </div>
        </div>

        {/* right side - content */}

        <div className="w-full lg:w-1/2 px-5 md:px-9 mt-10 lg:-my-2">
          <div className="relative">
            <div className="w-[300px] md:w-[450px] xl:w-[500px] 2xl:w-[754px] overflow-hidden mx-auto lg:mx-0">
              <img
                src={phoneone}
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
