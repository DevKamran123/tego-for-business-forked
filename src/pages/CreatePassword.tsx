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
import { resetPassword } from "../lib/auth/manage-password";
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

export default function CreatePassword() {
    // Hooks and state
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 865 });
    const [showPassword, setShowPassword] = useState("password");
    const [showConfirmPassword, setShowConfirmPassword] = useState("password");
    const [params] = useState(() => new URLSearchParams(window.location.search));
    
    // URL parameters
    const email = params.get('email') || '';
    const token = params.get('token') || '';

    // Form handling
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: createPasswordSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            
            const response = await resetPassword({
                email,
                token,
                newPassword: values.password,
                type: "user"
            });
            
            if (response.success) {
                toast.success(response.message);
                navigate('/login');
            } else {
                toast.error(response.message);
            }
            
            setSubmitting(false);
        },
    });

    // Helper functions
    const renderPasswordStrengthIndicator = () => {
        if (!formik.values.password) return null;
        
        const tests = [
            formik.values.password.length >= 8,
            formik.values.password.length <= 32,
            /[a-z]/.test(formik.values.password),
            /[A-Z]/.test(formik.values.password),
            /[0-9]/.test(formik.values.password),
            /[^a-zA-Z0-9]/.test(formik.values.password)
        ];
        
        const passedTests = tests.filter(Boolean).length;
        
        return Array(6).fill(0).map((_, index) => (
            <div 
                key={index} 
                className={`dashedlines_progress ${index < passedTests ? 'active' : ''}`}
            ></div>
        ));
    };

    // Password visibility toggles
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => prevState === 'password' ? 'text' : 'password');
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => prevState === 'password' ? 'text' : 'password');
    };

    return (
        <div className="createPassword">
            {/* Left side panel */}
            <div className="createPassword_side">
                <div className="createPassword_side_text">
                    <CreatePasswordText />
                    <div className="confirmsignupCont_side_text_alert">
                        <AuthMessage />
                    </div>
                </div>
                <div className="createPassword_side_bg"></div>
            </div>
            
            {/* Main content */}
            <div className="createPassword_main">
                <AuthHead 
                    text="Create a password" 
                    subText="We need your email for security reasons and to keep technical comminication."
                />

                <div className="createPassword_main_content">
                    <div className="createPassword_main_content_title">
                        Create a password
                    </div>

                    <div className="createPassword_main_content_register">
                        <form>
                            {/* Password field */}
                            <label htmlFor="password">Your password</label>
                            <div className="createPassword_main_content_register_field">
                                <input 
                                    type={showPassword} 
                                    id="password" 
                                    name="password" 
                                    className="input_text" 
                                    value={formik.values.password} 
                                    onChange={formik.handleChange} 
                                    placeholder="Write unique password" 
                                />
                                {showPassword === 'password' ? (
                                    <FaEye onClick={togglePasswordVisibility} className='eye'/>
                                ) : (
                                    <FaEyeSlash onClick={togglePasswordVisibility} className='eye'/>
                                )}
                            </div>
                            {formik.errors.password && <div className="input-error">{formik.errors.password}</div>}

                            {/* Password strength indicator */}
                            <div className="dashedlines">
                                {formik.values.password && renderPasswordStrengthIndicator()}
                            </div>

                            {/* Confirm password field */}
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <div className="createPassword_main_content_register_field">
                                <input 
                                    type={showConfirmPassword} 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    className="input_text" 
                                    value={formik.values.confirmPassword} 
                                    onChange={formik.handleChange} 
                                    placeholder="Rewrite unique password" 
                                />
                                {showConfirmPassword === 'password' ? (
                                    <FaEye onClick={toggleConfirmPasswordVisibility} className='eye'/>
                                ) : (
                                    <FaEyeSlash onClick={toggleConfirmPasswordVisibility} className='eye'/>
                                )}
                            </div>
                            {formik.errors.confirmPassword && <div className="input-error">{formik.errors.confirmPassword}</div>}

                            {/* Show password tips on mobile */}
                            {isMobile && <CreatePasswordText />}

                            {/* Action buttons */}
                            <div className="createPassword_main_content_register_actions">
                                <Link to="/signup">
                                    <AuthButton 
                                        disabled={formik.isSubmitting} 
                                        text="Back to sign up" 
                                        color="primary"
                                    />
                                </Link>
                                <AuthButton 
                                    disabled={!formik.isValid || formik.isSubmitting} 
                                    onClick={formik.submitForm} 
                                    isLoading={formik.isSubmitting} 
                                    text="Next" 
                                    color="secondary"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}