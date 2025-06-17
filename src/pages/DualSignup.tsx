import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Divider, Input, InputProps } from "antd";
import toast from "react-hot-toast";

import "../styles/pages/Signup.scss";
import personal from "../assets/svgs/personal";
import enterprise from "../assets/svgs/enterprise";
import CheckBox from "../components/Checkbox";
import AuthCards from "../components/AuthCards";
import TButton from "../components/buttons/TButton";
import rideTegoLogo from "../assets/images/rideTegoLogo.png";
import { dualAuthRegister } from "../lib/auth/dualAuth";
import { DualAuthPayload } from "../types/auth";

// Import icons for auth boxes
import keyIcon from "../assets/svgs/keyIcon.svg";
import googleIcon from "../assets/svgs/googleIcon.svg";
import microsoftIcon from "../assets/svgs/microsoftIcon.svg";

const authBoxes = [
  {
    image: keyIcon,
    text: "SSO",
  },
  {
    image: googleIcon,
    text: "Google",
  },
  {
    image: microsoftIcon,
    text: "Microsoft",
  },
];

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Enter a valid email address"
    )
    .required("Email address is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  countryCode: Yup.string(),
  mobileNo: Yup.string().when("countryCode", {
    is: (countryCode: string) => countryCode && countryCode.length > 0,
    then: (schema) => schema.required("Mobile number is required when country code is provided"),
    otherwise: (schema) => schema,
  }),
});

export default function DualSignup() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("enterprise");
  const isMobileView = useMediaQuery({ maxWidth: 865 });

  return (
    <div className="signupCont">
      <div className="signupCont_side">
        <div className="signupCont_side_text">Welcome to RideTEGO (Dual Auth)</div>
        <div className="signupCont_side_bg"></div>
      </div>

      <div className="signupCont_main">
        <div className="signupCont_main_head">
          <div className="signupCont_main_head_logo">
            <img src={rideTegoLogo} alt="logo" />
            RideTEGO
          </div>
          <div className="signupCont_main_head_text">Welcome to RideTEGO (Dual Auth)</div>
        </div>
        <div className="signupCont_main_content">
          <div className="signupCont_main_content_title">Sign up (Dual Auth)</div>

          <div className="signupCont_main_content_option">            <div
              className={`signupCont_main_content_option_one ${
                activeTab === "personal"
                  ? "signupCont_main_content_option_one_selected"
                  : ""
              }`}
              onClick={() => setActiveTab("personal")}
            >
              <div
                className={`signupCont_main_content_option_one_image  ${
                  activeTab === "personal"
                    ? "signupCont_main_content_option_one_image_selected"
                    : ""
                }`}
              >
                {personal}
              </div>
              <div
                className={`signupCont_main_content_option_one_text ${
                  activeTab === "personal"
                    ? "signupCont_main_content_option_one_text_selected"
                    : ""
                }`}
              >
                Personal Account
              </div>

              {activeTab === "personal" && (
                <div className="signupCont_main_content_option_one_checked">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.07801 11.3106L1.87179 7.10436L0.439453 8.52661L6.07801 14.1652L18.1823 2.06092L16.76 0.638672L6.07801 11.3106Z"
                      fill="white"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div
              className={`signupCont_main_content_option_one ${
                activeTab === "enterprise"
                  ? "signupCont_main_content_option_one_selected"
                  : ""
              }`}
              onClick={() => setActiveTab("enterprise")}
            >
              <div
                className={`signupCont_main_content_option_one_image  ${
                  activeTab === "enterprise"
                    ? "signupCont_main_content_option_one_image_selected"
                    : ""
                }`}
              >
                {enterprise}
              </div>
              <div
                className={`signupCont_main_content_option_one_text ${
                  activeTab === "enterprise"
                    ? "signupCont_main_content_option_one_text_selected"
                    : ""
                }`}
              >
                Enterprise Account
              </div>

              {activeTab === "enterprise" && (
                <div className="signupCont_main_content_option_one_checked">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.07801 11.3106L1.87179 7.10436L0.439453 8.52661L6.07801 14.1652L18.1823 2.06092L16.76 0.638672L6.07801 11.3106Z"
                      fill="white"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="signupCont_main_content_register">
            <Formik
              initialValues={{ 
                email: "", 
                firstName: "", 
                lastName: "", 
                password: "",
                countryCode: "+234", // Default country code
                mobileNo: ""
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const payload: DualAuthPayload = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                  accountType: activeTab as "enterprise" | "personal",
                  countryCode: values.countryCode || "+234",
                  mobileNo: values.mobileNo || undefined,
                };

                const response = await dualAuthRegister(payload);
                  if (response.success) {
                  toast.success(
                    "Signup successful. Please check your email to confirm your account."
                  );
                  navigate("/confirm-signup", {
                    state: { email: values.email },
                  });
                } else {
                  // Show detailed error messages
                  if (response.nodeApiSuccess && !response.phpApiSuccess) {
                    toast.error("Registration successful on main system, but failed on booking system. Please contact support.");
                    console.error("PHP API Error:", response.errors?.phpError);
                  } else if (!response.nodeApiSuccess && response.phpApiSuccess) {
                    toast.error("Registration failed on main system. Please try again.");
                    console.error("Node API Error:", response.errors?.nodeError);
                  } else {
                    toast.error("Registration failed on both systems. Please try again.");
                    console.error("Registration errors:", response.errors);
                  }
                }
                  setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid }) => (
                <Form className="standard-form">
                  <div className="field-cont">
                    <label htmlFor="firstName" className="input-label">
                      First Name
                    </label>
                    <Field name="firstName">
                      {({ field }: { field: InputProps }) => (
                        <Input
                          {...field}
                          type="text"
                          id="firstName"
                          className="input_text"
                          placeholder="Enter your first name"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="firstName"
                      component="p"
                      className="input-error"
                    />
                  </div>

                  <div className="field-cont">
                    <label htmlFor="lastName" className="input-label">
                      Last Name
                    </label>
                    <Field name="lastName">
                      {({ field }: { field: InputProps }) => (
                        <Input
                          {...field}
                          type="text"
                          id="lastName"
                          className="input_text"
                          placeholder="Enter your last name"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="lastName"
                      component="p"
                      className="input-error"
                    />
                  </div>

                  <div className="field-cont">
                    <label htmlFor="email" className="input-label">
                      {activeTab === "personal" ? "Email" : "Work Email"}
                    </label>
                    <Field name="email">
                      {({ field }: { field: InputProps }) => (
                        <Input
                          {...field}
                          type="email"
                          id="email"
                          className="input_text"
                          placeholder="Enter your email"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="input-error"
                    />
                  </div>

                  <div className="field-cont">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <Field name="password">
                      {({ field }: { field: InputProps }) => (
                        <Input.Password
                          {...field}
                          id="password"
                          className="input_text"
                          placeholder="Enter your password"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="input-error"
                    />
                  </div>

                    <div className="field-cont">
                      <label htmlFor="countryCode" className="input-label">
                        Country Code
                      </label>
                      <Field name="countryCode">
                        {({ field }: { field: InputProps }) => (
                          <Input
                            {...field}
                            type="text"
                            id="countryCode"
                            className="input_text"
                            placeholder="+234"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="countryCode"
                        component="p"
                        className="input-error"
                      />
                    </div>

                    <div className="field-cont">
                      <label htmlFor="mobileNo" className="input-label">
                        Mobile Number
                      </label>
                      <Field name="mobileNo">
                        {({ field }: { field: InputProps }) => (
                          <Input
                            {...field}
                            type="text"
                            id="mobileNo"
                            className="input_text"
                            placeholder="Enter your mobile number"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="mobileNo"
                        component="p"
                        className="input-error"
                      />
                    </div>
                  {/* <div style={{ display: "flex", gap: "1rem" }}>
                  </div> */}

                  <div className="isCheck pt-5">
                    <CheckBox label="Accept Terms of Service and Privacy Policy" />
                  </div>

                  <TButton
                    htmlType="submit"
                    disabled={isSubmitting || !isValid}
                    loading={isSubmitting}
                    tvariant="secondary"
                  >
                    Get started (Dual Auth)
                  </TButton>
                </Form>
              )}
            </Formik>

            <div className="signupCont_main_content_register_alternative">
              Already have an account?{" "}
              <span 
                onClick={() => navigate("/dual-login")}
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                Login
              </span>
            </div>

            <div className="signupCont_main_content_register_alternative">
              <span 
                onClick={() => navigate("/signup")} 
                style={{ cursor: "pointer", color: "#666", fontSize: "0.9rem" }}
              >
                Use single API signup instead
              </span>
            </div>            <Divider
              plain
              className="signupCont_main_content_register_or"
              style={{
                color: "#A6A6A6",
                fontSize: isMobileView ? "0.8rem" : "1rem",
              }}
            >
              Or
            </Divider>

            <div className="signupCont_main_content_register_allPlatforms">
              {authBoxes.map((details) => (
                <AuthCards details={details} key={details.text} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
