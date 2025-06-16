"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "../styles/pages/Login.scss";
import {
  TCheckbox,
  TInput,
  TInputLabel,
  TPassword,
} from "../components/styled";
import { InputProps } from "antd";
import TButton from "../components/buttons/TButton";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/AppStore";
import rideTegoLogo from "../assets/images/rideTegoLogo.png";
import { loginUser } from "../lib/auth/login";
import toast from "react-hot-toast";
import personal from "../assets/svgs/personal";
import enterprise from "../assets/svgs/enterprise";
import purpleCheckIcon from "../assets/svgs/purpleCheckIcon.svg";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Enter a valid email address"
    )
    .required("Email address is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [accountType, setAccountType] = useState<"personal" | "business">(
    "personal"
  );
  const navigate = useNavigate();
  const { setSession } = useAppStore((state) => state);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await loginUser(
        values.email,
        values.password,
        accountType
      );

      if (response.success && response.data) {
        // Store session data using utility function
        setSession(
          JSON.stringify({
            email: values.email,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            profile: response.data.profile,
            accountType,
            rememberMe,
          })
        );

        // Set session in Zustand store
        const sessionData = {
          email: values.email,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          profile: response.data.profile,
          accountType,
        };
        setSession(JSON.stringify(sessionData));

        localStorage.setItem("token", response.data.accessToken);
       
  
        localStorage.setItem("session", JSON.stringify(sessionData));
  

        // Navigate based on user status
        const userStatus = response.data.profile.status;

        if (userStatus === "new" || userStatus === null) {
          navigate("/onboarding");
        } else {
          const dashboardPath =
            accountType === "business" ? "/dashboard" : "/personal/dashboard/";

          navigate(dashboardPath);
        }

        toast.success(response.message || "Login successful!");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred during login");
    }
  };

  return (
    <>
      <div className="login-head">
        <div className="login-head_logo">
          <img src={rideTegoLogo} alt="logo" />
          RideTEGO
        </div>
        <div className="login-head_text">Welcome to RideTEGO</div>
      </div>
      <div className="login_wrapper">
        <div
          className="login_fluff"
          style={{ backgroundImage: `url("/src/assets/images/bgAuth.png")` }}
        >
          <div>
            <p>Welcome to RideTEGO</p>
          </div>
        </div>
        <div className="login_content">
          <h2 className="login_header">Sign In</h2>

          <div className="max-w-[520px] w-full flex items-start gap-5 mb-10">
            {/* Personal Account Type */}
            <div
              className={`flex-1 relative border p-6 cursor-pointer transition-all duration-200 ${
                accountType === "personal"
                  ? "border-darkIndigo "
                  : "border-pebbleGray"
              }`}
              onClick={() => setAccountType("personal")}
            >
              {accountType === "personal" && (
                <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-darkBluish p-1 rounded-full">
                  <img
                    src={purpleCheckIcon}
                    alt="selected"
                    className="w-4 h-3"
                  />
                </div>
              )}
              <div
                className={`flex flex-col items-center text-center space-y-3 ${
                  accountType === "personal"
                    ? "text-darkBluish"
                    : "text-grayishBlue"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    accountType === "personal" ? "bg-fadedBlue" : "bg-lightGray"
                  }`}
                >
                  {personal}
                </div>
                <h3 className="font-medium text-base">Personal Account</h3>
              </div>
            </div>

            {/* Business Account Type */}
            <div
              className={`flex-1 relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                accountType === "business"
                  ? "text-darkBluish"
                  : "text-grayishBlue"
              }`}
              onClick={() => setAccountType("business")}
            >
              {accountType === "business" && (
                <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-darkBluish p-1 rounded-full">
                  <img
                    src={purpleCheckIcon}
                    alt="selected"
                    className="w-4 h-3"
                  />
                </div>
              )}
              <div
                className={`flex flex-col items-center text-center space-y-3 ${
                  accountType === "business"
                    ? "text-darkBluish"
                    : "text-grayishBlue"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    accountType === "business" ? "bg-fadedBlue" : "bg-lightGray"
                  }`}
                >
                  {enterprise}
                </div>
                <h3 className="font-medium text-base">Business Account</h3>
              </div>
            </div>
          </div>

          <div className="login_form_wrapper">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting, isValid }) => (
                <Form className="standard-form">
                  <div>
                    <TInputLabel htmlFor="email">Email Address</TInputLabel>
                    <Field name="email">
                      {({ field }: { field: InputProps }) => (
                        <TInput
                          {...field}
                          type="email"
                          placeholder="Email Address"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="input-error"
                    />
                  </div>
                  <div>
                    <TInputLabel htmlFor="password">Password</TInputLabel>
                    <Field name="password">
                      {({ field }: { field: InputProps }) => (
                        <TPassword {...field} placeholder="********" />
                      )}
                    </Field>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="input-error"
                    />
                  </div>
                  <div>
                    <TCheckbox
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    >
                      Remember me
                    </TCheckbox>
                  </div>
                  <TButton
                    htmlType="submit"
                    disabled={isSubmitting || !isValid}
                    loading={isSubmitting}
                    tvariant="secondary"
                  >
                    Login
                  </TButton>

                  <div className="login_alternative">
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/signup")}>Signup</span>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
