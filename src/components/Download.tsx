import "../styles/components/Download.scss";

import appLogo from "../assets/images/appLogo.png";

export default function Download() {
    return (
        <div className="download">
            <div className="download_appLogo">
                <img src={appLogo} alt="" />
            </div>

            <div className="download_text">
                Download the Driver app
            </div>

            <div className="download_next">
                <svg width="17" height="26" viewBox="0 0 17 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2999 13L0.333252 3.03333L3.36659 0L16.3666 13L3.36659 26L0.333252 22.9667L10.2999 13Z" fill="white"/>
                </svg>
            </div>
        </div>
    )
}
