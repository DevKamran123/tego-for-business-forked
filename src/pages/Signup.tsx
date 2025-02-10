import "../styles/pages/Signup.scss";
// import personal from "../assets/svgs/personal.svg";
import personal from "../assets/svgs/personal";
import enterprise from "../assets/svgs/enterprise";
import { useState } from "react";
import CheckBox from "../components/Checkbox";
import AuthCards from "../components/AuthCards";

import keyIcon from "../assets/svgs/keyIcon.svg";
import googleIcon from "../assets/svgs/googleIcon.svg";
import microsoftIcon from "../assets/svgs/microsoftIcon.svg";

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


export default function Signup() {
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
                        <form>
                            <label htmlFor="email">Company email</label>
                            <input type="text" id="email" className="input_text" placeholder="Enter your email"/>
                            <CheckBox label="Accept Terms of Service and Privacy Policy"/>
                            <button>Get started</button>
                        </form>

                        <div className="signupCont_main_content_register_alternative">
                            Already have an account? <span>Login</span>
                        </div>
                        
                        <div className="signupCont_main_content_register_or">
                            Or
                        </div>

                        <div className="signupCont_main_content_register_allPlatforms">
                            {authBoxes.map((details)=>(<AuthCards details={details} key={details.text}/>))}
                        </div>

                        <div className="signupCont_main_content_register_fake">Hello</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

