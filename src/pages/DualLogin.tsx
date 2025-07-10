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
import { dualAuthLogin } from "../lib/auth/dualAuth";
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

const DualLogin: React.FC = () => {
  const [rememberMe, setRememberMe] = React.useState(false);
  const navigate = useNavigate();
  const { setSession, setPHPToken } = useAppStore((state) => state);

  return (
    <>
      <div className="login-head">
          <div className="login-head_logo">
              <img src={rideTegoLogo} alt="logo" />
              RideTEGO
          </div>
          <div className="login-head_text">
              Welcome to RideTEGO (Dual Auth)
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
          <h2 className="login_header">Sign In (Dual Auth)</h2>
          <div className="login_form_wrapper">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                const response = await dualAuthLogin({
                  email: values.email,
                  password: values.password,
                });

                if (response.success && response.data?.nodeAuth) {
                  // Store Node API token
                  localStorage.setItem("token", response.data.nodeAuth.accessToken);
                  
                  // Store PHP token if available
                  if (response.data.phpAuth) {
                    setPHPToken(response.data.phpAuth.accessToken);
                  }

                  // Store the combined profile in the session
                  const sessionData = { 
                    email: values.email,
                    ...response.data.nodeAuth,
                    // Add PHP-specific data if available
                    phpAuth: response.data.phpAuth ? {
                      hasPhpAuth: true,
                      phpUserId: response.data.phpAuth.profile.id,
                    } : { hasPhpAuth: false }
                  };
                  setSession(JSON.stringify(sessionData));

                  // Show appropriate success message
                  if (response.nodeApiSuccess && response.phpApiSuccess) {
                    toast.success("Login successful on both APIs!");
                  } else if (response.nodeApiSuccess && !response.phpApiSuccess) {
                    toast.success("Login successful! (Note: Ride booking may be limited)");
                    console.warn("PHP API login failed:", response.errors?.phpError);
                  }

                  // Check user status for redirection
                  if (response.data.nodeAuth.profile?.status === "new") {
                    navigate("/onboarding");
                  } else {
                    // Route based on userType from PHP user data
                    const phpUserData = localStorage.getItem('php_user_data');
                    if (phpUserData) {
                      try {
                        const userData = JSON.parse(phpUserData);
                        if (userData.userType === "individual") {
                          navigate("/personal/dashboard/");
                        } else {
                          navigate("/dashboard");
                        }
                      } catch (error) {
                        console.error('Error parsing PHP user data:', error);
                        // Fallback to dashboard if parsing fails
                        navigate("/dashboard");
                      }
                    } else {
                      // Fallback to dashboard if no PHP user data
                      navigate("/dashboard");
                    }
                  }
                } else {
                  // Show detailed error messages
                  if (response.errors?.nodeError) {
                    toast.error(`Login failed: ${response.errors.nodeError}`);
                  } else {
                    toast.error(response.message);
                  }
                  
                  // Log PHP error for debugging
                  if (response.errors?.phpError) {
                    console.error("PHP API Error:", response.errors.phpError);
                  }
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
                    Login (Dual Auth)
                  </TButton>

                  <div className="login_alternative">
                    Don't have an account? <span onClick={()=>navigate("/dual-signup")}>Signup</span>
                  </div>
                  <div className="login_alternative">
                    <span onClick={()=>navigate("/login")} style={{color: "#666", fontSize: "0.9rem"}}>
                      Use single API login instead
                    </span>
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

export default DualLogin;
