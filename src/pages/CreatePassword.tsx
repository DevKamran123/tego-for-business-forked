import AuthButton from "../components/AuthButton";
import AuthMessage from "../components/AuthMessage";
import "../styles/pages/CreatePassword.scss";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthHead from "../components/AuthHead";
import CreatePasswordText from "../components/CreatePasswordText";
import { useMediaQuery } from "react-responsive";

export default function CreatePassword() {
    const [showPassword, setShowPassword] = useState("password");
    const isMobile = useMediaQuery({ maxWidth: 865 });

    return (
        <div className="createPassword">
            <div className="createPassword_side">
                <div className="createPassword_side_text">
                    {/* <div className="createPassword_side_text_catchphrase">
                        Password recommendations
                    </div> */}

                    <CreatePasswordText />
            
                    <div className="confirmsignupCont_side_text_alert">
                        <AuthMessage />
                    </div>
                </div>
                <div className="createPassword_side_bg"></div>
            </div>
            <div className="createPassword_main">
                <AuthHead text="Create a password" subText="We need your email for security reasons and to keep technical comminication."/>

                <div className="createPassword_main_content">
                    <div className="createPassword_main_content_title">
                        Create a password
                    </div>

                    <div className="createPassword_main_content_register">
                        <form>
                            <label htmlFor="password">Your password</label>
                            <div className="createPassword_main_content_register_field">
                                <input type={showPassword} id="password" className="input_text" placeholder="Write unique password" />
                                {showPassword === 'password' ? (
                                    <FaEye onClick={() => setShowPassword('text')} className='eye'/>
                                    ) : (
                                    <FaEyeSlash onClick={() => setShowPassword('password')} className='eye'/>
                                )}
                            </div>

                            {/* <div className="dashedlines">
                                <img src={lines} alt="line deco" />
                            </div> */}

                            <div className="dashedlines">
                                <div className="dashedlines_progress"></div>
                                <div className="dashedlines_progress"></div>
                                <div className="dashedlines_progress"></div>
                                <div className="dashedlines_progress"></div>
                                <div className="dashedlines_progress"></div>
                            </div>


                            <label htmlFor="password">Confirm password</label>
                            <div className="createPassword_main_content_register_field">
                                <input type={showPassword} id="password" className="input_text" placeholder="Rewrite unique password" />
                                {showPassword === 'password' ? (
                                    <FaEye onClick={() => setShowPassword('text')} className='eye'/>
                                    ) : (
                                    <FaEyeSlash onClick={() => setShowPassword('password')} className='eye'/>
                                )}
                            </div>

                            {isMobile && <CreatePasswordText />}

                            <div className="createPassword_main_content_register_actions">
                                <AuthButton text="Back to sign up" color="primary" action="/signup"/>
                                <AuthButton text="Next" color="secondary" action="/create-password"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}