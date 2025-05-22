import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../CustomInput";
import CustomButton from "../buttons/CustomButton";

const EditEmail = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // after update go back to previous page
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <form className="w-full flex flex-col gap-28" onSubmit={handleSubmit}>
      <div className="w-full relative flex flex-col gap-4">
        <CustomInput
          value={email}
          placeholder="Enter email address"
          className="placeholder:text-[#DBDBDB]"
          onChange={handleChange}
        />

        <p className="text-sm text-black">
          A verification code will be sent to this email
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

export default EditEmail;
