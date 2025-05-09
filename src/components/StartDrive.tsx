import googleplay from "../assets/svgs/google_play_btn.svg";
import appstore from "../assets/svgs/app_store_btn.svg";
import phoneone from "../assets/images/phone-1.webp";

export const StartDrive = () => {
  return (
    <main className="bg-image-startDrive bg-top bg-no-repeat bg-contain   px-8 lg:px-16 md:pt-24 md:pb-32">
      <div className="max-w-[1670px] w-full mx-auto flex flex-col lg:flex-row items-center md:justify-between gap-5 md:gap-10">
        {/* left side - content */}
        <div className="w-full lg:w-1/2 px-5 py-8 md:px-9 md:py-16 space-y-10">
          <div className="">
            <h1 className="font-semibold text-6xl text-slateAsh mb-8">
              Download app, Start drive, Earn money!
            </h1>
            <p className="text-fogSilver text-2xl mb-14">
              Download DriveTEGO app from playstore, create account use your car
              and drive by yourself. Get ride and earn more money.
            </p>

            <div className="flex items-center">
              <button className="cursor-pointer w-[290px]">
                <img src={googleplay} alt="google" className="" />
              </button>
              <button className="cursor-pointer w-[290px]">
                <img src={appstore} alt="google" className="" />
              </button>
            </div>
          </div>
        </div>

        {/* right side - content */}

        <div className="w-full lg:w-1/2 px-5 md:px-9 mt-10 lg:-my-2">
          <div className="relative">
            <div className="w-[480px] lg:w-[754px] overflow-hidden">
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
