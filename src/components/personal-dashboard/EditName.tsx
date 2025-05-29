import React, { useState } from "react";
import CustomButton from "../buttons/CustomButton";
import CustomInput from "../CustomInput";
import cancelIcon from "../../assets/icons/cancel.svg";
import IconWrapper from "../IconWrapper";
import { useNavigate } from "react-router-dom";

type UserType = {
  firstName: string;
  lastName: string;
};

const EditName = () => {
  const navigate = useNavigate();

  // dummy data
  const initialUserState: UserType = {
    firstName: "Daniel ",
    lastName: "Victor",
  };

  const [user, setUser] = useState<UserType>({ firstName: "", lastName: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const handleClearInput = (key: string) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // after update go back to previous page
    navigate(-1);
  };

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="w-full relative flex items-center gap-7">
          <CustomInput
            label="First Name"
            id="updateFirstName"
            value={user.firstName}
            labelClassName="!text-xl !font-bold text-grayishBlue mb-2.5"
            placeholder={initialUserState.firstName}
            onChange={(e) => handleChange(e, "firstName")}
          />
          <button
            className="cursor-pointer mt-8"
            onClick={() => handleClearInput("firstName")}
            type="button"
          >
            <IconWrapper className="" icon={cancelIcon} />
          </button>
        </div>
        <div className="w-full relative flex items-center gap-7">
          <CustomInput
            label="Last Name"
            id="updateLastName"
            value={user.lastName}
            labelClassName="!text-xl !font-bold text-grayishBlue mb-2.5"
            placeholder={initialUserState.lastName}
            onChange={(e) => handleChange(e, "lastName")}
          />
          <button
            className="cursor-pointer mt-8"
            onClick={() => handleClearInput("lastName")}
            type="button"
          >
            <IconWrapper className="" icon={cancelIcon} />
          </button>
        </div>
      </div>

      <div className="w-full pr-14 mt-16">
        <CustomButton
          variant="secondary"
          size="full"
          type="submit"
          className="!py-4 !rounded-none"
        >
          Update
        </CustomButton>
      </div>
    </form>
  );
};

export default EditName;
