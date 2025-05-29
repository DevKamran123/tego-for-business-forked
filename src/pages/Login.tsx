import React from "react";
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
import rideTegoLogo from "../assets/images/rideTegoLogo.png"
import { loginUser } from "../lib/auth/login";
import toast from "react-hot-toast";

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
  const [rememberMe, setRememberMe] = React.useState(false);
  const navigate = useNavigate();
  const {setSession} = useAppStore((state) => state);

  return (
    <>
      <div className="login-head">
          <div className="login-head_logo">
              <img src={rideTegoLogo} alt="logo" />
              RideTEGO
          </div>
          <div className="login-head_text">
              Welcome to RideTEGO
          </div>
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
          <div className="login_form_wrapper">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                const response = await loginUser(values.email, values.password);
                if (response.success && response.data) {
                  localStorage.setItem("token", response.data?.accessToken);
                  // Store the entire profile in the session for easy access
                  const sessionData = { 
                    email: values.email, // Keep email from form if needed, though profile should have it
                    ...response.data // This includes the profile object
                  };
                  setSession(JSON.stringify(sessionData));

                  // Check user status for redirection
                  if (response.data.profile?.status === "new") {
                    navigate("/onboarding");
                  } else {
                    navigate("/dashboard");
                  }
                } else {
                  toast.error(response.message);
                }
              }}
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
                    Don't have an account? <span onClick={()=>navigate("/signup")}>Signup</span>
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
