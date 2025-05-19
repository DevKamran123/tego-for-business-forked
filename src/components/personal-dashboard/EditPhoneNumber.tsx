import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
import Input, {
  Country,
  getCountries,
  Value,
} from "react-phone-number-input/input";
import CustomSelect from "../CustomSelect";

const EditPhoneNumber = () => {
  const navigate = useNavigate();

  //   defautt country from country codes
  const countryCodes = getCountries();
  const indexOfDefaultCountry = countryCodes.indexOf("NG");

  const [countryCode, setCountryCode] = useState<Country>(
    countryCodes[indexOfDefaultCountry]
  );

  const [phoneNumber, setPhoneNumber] = useState<Value>();

  console.log(phoneNumber);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // after update go back to previous page
    navigate(-1);
  };

  return (
    <form className="w-full flex flex-col gap-28" onSubmit={handleSubmit}>
      <div className="w-full relative flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-1/4">
            <CustomSelect
              options={countryCodes}
              value={countryCode}
              onChange={(value) => setCountryCode(value as Country)}
            />
          </div>

          <div className="flex-1">
            <Input
              defaultCountry={countryCode}
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
              className="w-full
              px-5
              py-2.5
              text-base
              font-light
              text-neutral-800
              placeholder:text-base
              2xl:placeholder:text-xl
              focus:outline-none
              bg-white
              border
              border-pebbleGray
              rounded-xl
              outline-none
              transition-all
              duration-200
              placeholder:text-deepMauve/45
            "
            />
          </div>
        </div>

        <p className="text-sm text-black">
          A verification code will be sent to this number
        </p>
      </div>

      <CustomButton
        variant="secondary"
        size="full"
        type="submit"
        className="!py-4 !rounded-none"
      >
        Update
      </CustomButton>
    </form>
  );
};

export default EditPhoneNumber;
