import "../styles/components/AuthMessage.scss";

import alert from "../assets/svgs/alert.svg";

export default function AuthMessage() {
    return (
        <div className="authMessage">
            <img src={alert} alt="" />

            <div className="authMessage_text">
                We need your email for security reasons and to keep technical comminication.
            </div>
        </div>
    )
}