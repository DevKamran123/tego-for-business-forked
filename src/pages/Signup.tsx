import "../styles/pages/Signup.scss";
// import personal from "../assets/svgs/personal.svg";
import personal from "../assets/svgs/personal";
import enterprise from "../assets/svgs/enterprise";
import { useState } from "react";
import CheckBox from "../components/Checkbox";
import AuthCards from "../components/AuthCards";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import keyIcon from "../assets/svgs/keyIcon.svg";
import googleIcon from "../assets/svgs/googleIcon.svg";
import microsoftIcon from "../assets/svgs/microsoftIcon.svg";
import rideTegoLogo from "../assets/images/rideTegoLogo.png";
import { useNavigate } from "react-router-dom";
import { Input, InputProps, Divider } from "antd";
import TButton from "../components/buttons/TButton";

const authBoxes = [
    {
        image: keyIcon,
        text: "SSO"
    },
    {
        image: googleIcon,
        text: "Google"
    },
    {
        image: microsoftIcon,
        text: "Microsoft"
    },
]

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Enter a valid email address"
    )
    .required("Email address is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});


export default function Signup() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("enterprise");

    return (
        <div className="signupCont">
            <div className="signupCont_side">
                <div className="signupCont_side_text">
                    Welcome to RideTEGO
                </div>
                <div className="signupCont_side_bg"></div>
            </div>


            <div className="signupCont_main">
                <div className="signupCont_main_head">
                    <div className="signupCont_main_head_logo">
                        <img src={rideTegoLogo} alt="logo" />
                        RideTEGO
                    </div>
                    <div className="signupCont_main_head_text">
                        Welcome to RideTEGO
                    </div>
                </div>
                <div className="signupCont_main_content">
                    <div className="signupCont_main_content_title">
                        Sign up
                    </div>

                    <div className="signupCont_main_content_option">
                        <div className={`signupCont_main_content_option_one ${activeTab==="personal"? "signupCont_main_content_option_one_selected": ""}`} onClick={()=>setActiveTab("personal")}>
                            <div className={`signupCont_main_content_option_one_image  ${activeTab==="personal"? "signupCont_main_content_option_one_image_selected": ""}`}>
                                {personal}
                            </div>
                            <div className={`signupCont_main_content_option_one_text ${activeTab==="personal"? "signupCont_main_content_option_one_text_selected": ""}`}>
                                Personal Account
                            </div>

                            {activeTab==="personal" && 
                            <div className="signupCont_main_content_option_one_checked">
                                <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.07801 11.3106L1.87179 7.10436L0.439453 8.52661L6.07801 14.1652L18.1823 2.06092L16.76 0.638672L6.07801 11.3106Z" fill="white"/>
                                </svg>
                            </div>}
                        </div>

                        <div className={`signupCont_main_content_option_one ${activeTab==="enterprise"? "signupCont_main_content_option_one_selected": ""}`} onClick={()=>setActiveTab("enterprise")}>
                            <div className={`signupCont_main_content_option_one_image  ${activeTab==="enterprise"? "signupCont_main_content_option_one_image_selected": ""}`}>
                                {enterprise}
                            </div>
                            <div className={`signupCont_main_content_option_one_text ${activeTab==="enterprise"? "signupCont_main_content_option_one_text_selected": ""}`}>
                                Enterprise Account
                            </div>

                            {activeTab==="enterprise" && 
                            <div className="signupCont_main_content_option_one_checked">
                                <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.07801 11.3106L1.87179 7.10436L0.439453 8.52661L6.07801 14.1652L18.1823 2.06092L16.76 0.638672L6.07801 11.3106Z" fill="white"/>
                                </svg>
                            </div>}
                        </div>
                    </div>

                    <div className="signupCont_main_content_register">

                        <Formik
                            initialValues={{ email: "", firstName: "", lastName: "" }}
                            validationSchema={SignupSchema}
                            onSubmit={(values) => {
                            console.log(values);
                            // localStorage.setItem("token", "123456");
                            // setSession(JSON.stringify({ ...values }));
                            navigate("/confirm-signup");
                            }}
                        >
                            {({ isSubmitting, isValid }) => (
                            <Form className="standard-form">
                                <div className="field-cont">
                                    <label htmlFor="firstName" className="input-label">First Name</label>
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
                                    <label htmlFor="lastName" className="input-label">Last Name</label>
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
                                    <label htmlFor="email" className="input-label">Company email</label>
                                    <Field name="email">
                                        {({ field }: { field: InputProps }) => (
                                        
                                        <Input
                                            {...field}
                                            type="text" 
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
                                
                                <div className="isCheck">
                                    <CheckBox label="Accept Terms of Service and Privacy Policy"/>
                                </div>
                                

                                <TButton
                                htmlType="submit"
                                disabled={isSubmitting || !isValid}
                                loading={isSubmitting}
                                tvariant="secondary"
                                >
                                    Get started
                                </TButton>
                            </Form>
                            )}
                        </Formik>

                        <div className="signupCont_main_content_register_alternative">
                            Already have an account? <span onClick={()=>navigate("/login")}>Login</span>
                        </div>
                        
                        {/* <div className="signupCont_main_content_register_or"> */}
                        <Divider plain className="signupCont_main_content_register_or" style={{color: "#A6A6A6", fontSize: "1.1rem"}}>Or</Divider>
                        {/* </div> */}

                        <div className="signupCont_main_content_register_allPlatforms">
                            {authBoxes.map((details)=>(<AuthCards details={details} key={details.text}/>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

