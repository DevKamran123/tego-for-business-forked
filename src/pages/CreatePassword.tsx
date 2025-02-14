import AuthButton from "../components/AuthButton";
import AuthMessage from "../components/AuthMessage";
import "../styles/pages/CreatePassword.scss";

import lines from "../assets/images/lines.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CreatePassword() {
    const [showPassword, setShowPassword] = useState("password");

    return (
        <div className="createPassword">
            <div className="createPassword_side">
                <div className="createPassword_side_text">
                    <div className="createPassword_side_text_catchphrase">
                        Password recommendations
                    </div>

                    
                    <div className="createPassword_side_text_catchphrase_requirementsContainer">
                        <div className="createPassword_side_text_catchphrase_requirementItem">
                            <span className="createPassword_side_text_catchphrase_bullet"></span>
                            <span className="createPassword_side_text_catchphrase_text">Minimum 8 characters</span>
                        </div>
                        <div className="createPassword_side_text_catchphrase_requirementItem">
                            <span className="createPassword_side_text_catchphrase_bullet"></span>
                            <span className="createPassword_side_text_catchphrase_text">Maximum 32 characters</span>
                        </div>
                        <div className="createPassword_side_text_catchphrase_requirementItem">
                            <span className="createPassword_side_text_catchphrase_bullet"></span>
                            <span className="createPassword_side_text_catchphrase_text">At least 1 lowercase letter (a - z)</span>
                        </div>
                        <div className="createPassword_side_text_catchphrase_requirementItem">
                            <span className="createPassword_side_text_catchphrase_bullet"></span>
                            <span className="createPassword_side_text_catchphrase_text">At least 1 uppercase letter (A - Z)</span>
                        </div>
                        <div className="createPassword_side_text_catchphrase_requirementItem">
                            <span className="createPassword_side_text_catchphrase_bullet"></span>
                            <span className="createPassword_side_text_catchphrase_text">At least 1 number (0 - 9)</span>
                        </div>
                    </div>


                    <div className="confirmsignupCont_side_text_alert">
                        <AuthMessage />
                    </div>
                </div>
                <div className="createPassword_side_bg"></div>
            </div>
            <div className="createPassword_main">
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

                            <div className="dashedlines">
                                <img src={lines} alt="line deco" />
                            </div>

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