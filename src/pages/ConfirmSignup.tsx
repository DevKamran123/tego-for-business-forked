
import AuthButton from "../components/AuthButton";
import AuthMessage from "../components/AuthMessage";
import "../styles/pages/ConfirmSignup.scss";

export default function ConfirmSignup() {

    return (
        <div className="confirmsignupCont">
            <div className="confirmsignupCont_side">
                <div className="confirmsignupCont_side_text">
                    <div className="confirmsignupCont_side_text_catchphrase">
                        Please confirm the validity of your email address
                    </div>
                    <div className="confirmsignupCont_side_text_alert">

                        <AuthMessage />
                    </div>
                </div>
                <div className="confirmsignupCont_side_bg"></div>
            </div>
            <div className="confirmsignupCont_main">
                <div className="confirmsignupCont_main_content">
                    <div className="confirmsignupCont_main_content_title">
                        Check your email for a verification link
                    </div>

                    <div className="confirmsignupCont_main_content_register">
                        <form>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" className="input_text" placeholder="Enter your email"/>

                            <div className="confirmsignupCont_main_content_register_nomail">
                                Didn’t receive the mail? Please check your spam folder or check your email and try to resend the email
                            </div>

                            <div className="confirmsignupCont_main_content_register_actions">
                                <AuthButton text="Back to sign up" color="primary" action="signup"/>
                                <AuthButton text="Get Started" color="secondary" action="password"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
