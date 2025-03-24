import AuthButton from "../components/AuthButton";
import AuthMessage from "../components/AuthMessage";
import "../styles/pages/CreatePassword.scss";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthHead from "../components/AuthHead";
import CreatePasswordText from "../components/CreatePasswordText";
import { useMediaQuery } from "react-responsive";
import { useFormik } from "formik";
import * as yup from 'yup';
import { acceptInvite } from "../lib/auth/manage-password";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const createPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(32, 'Password must be at most 32 characters')
        .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least 1 number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least 1 special character'),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

export default function AcceptInvite() {
    const [showPassword, setShowPassword] = useState("password");
    const isMobile = useMediaQuery({ maxWidth: 865 });
    const navigate = useNavigate();
    const [params] = useState(() => new URLSearchParams(window.location.search));
    const email = params.get('email') || '';
    const token = params.get('token') || '';
    

    console.log(email, token);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: createPasswordSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true);
            console.log(values);
            const response  = await acceptInvite({
                email,
                token,
                newPassword: values.password,
                type: "enterprise"
            });
            console.log(response);
            if(response.success) {
                setSubmitting(false);
                toast.success(response.message);
                navigate('/login');
            } else {
                toast.error(response.message);
                setSubmitting(false);
            }  
        },
    });

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
                                <input type={showPassword} id="password" name="password" className="input_text" value={formik.values.password} onChange={formik.handleChange} placeholder="Write unique password" />
                                {showPassword === 'password' ? (
                                    <FaEye onClick={() => setShowPassword('text')} className='eye'/>
                                    ) : (
                                    <FaEyeSlash onClick={() => setShowPassword('password')} className='eye'/>
                                )}
                            </div>
                            {formik.errors.password ? <div className="input-error">{formik.errors.password}</div> : null}

                            {/* <div className="dashedlines">
                                <img src={lines} alt="line deco" />
                            </div> */}

                            <div className="dashedlines">
                                {formik.values.password && (
                                    <>
                                        {(() => {
                                            let passedTests = 0;
                                            const tests = [
                                                formik.values.password.length >= 8,
                                                formik.values.password.length <= 32,
                                                /[a-z]/.test(formik.values.password),
                                                /[A-Z]/.test(formik.values.password),
                                                /[0-9]/.test(formik.values.password),
                                                /[^a-zA-Z0-9]/.test(formik.values.password)
                                            ];
                                            passedTests = tests.filter(Boolean).length;
                                            
                                            return Array(6).fill(0).map((_, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`dashedlines_progress ${index < passedTests ? 'active' : ''}`}
                                                ></div>
                                            ));
                                        })()}
                                    </>
                                )}
                            </div>


                            <label htmlFor="confirmPassword">Confirm password</label>
                            <div className="createPassword_main_content_register_field">
                                <input type={showPassword} id="confirmPassword" name="confirmPassword" className="input_text" value={formik.values.confirmPassword} onChange={formik.handleChange} placeholder="Rewrite unique password" />
                                {showPassword === 'password' ? (
                                    <FaEye onClick={() => setShowPassword('text')} className='eye'/>
                                    ) : (
                                    <FaEyeSlash onClick={() => setShowPassword('password')} className='eye'/>
                                )}
                            </div>
                            {formik.errors.confirmPassword ? <div className="input-error">{formik.errors.confirmPassword}</div> : null}

                            {isMobile && <CreatePasswordText />}

                            <div className="createPassword_main_content_register_actions">
                                <Link to={"/signup"}>
                                    <AuthButton text="Back to sign up" color="primary"/>
                                </Link>
                                <AuthButton disabled={!formik.isValid || formik.isSubmitting} onClick={formik.submitForm} text="Next" color="secondary"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}