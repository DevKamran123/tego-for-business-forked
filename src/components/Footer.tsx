import "../styles/components/Footer.scss";

import facebook from "../assets/svgs/facebook.svg";
import instagram from "../assets/svgs/instagram.svg";
import linkedIn from "../assets/svgs/linkedIn.svg";
import twitter from "../assets/svgs/twitter.svg";

import globe from "../assets/images/globe.png";
import location from "../assets/images/location.png";
import googlestore from '../assets/images/googlestore.png';
import applestore from '../assets/images/applestore.png';
;
export default function Footer() {
    return (
        <div className="footerCont">
            <div className="footerCont_social">
                <div className="footerCont_social_layout">
                    <div className="footerCont_social_layout_icons">
                        <img src={facebook} alt="" />
                        <img src={instagram} alt="" />
                        <img src={linkedIn} alt="" />
                        <img src={twitter} alt="" />
                    </div>

                    <div className="footerCont_social_layout_locate">
                        <div className="footerCont_social_layout_locate_lang">
                            <img src={globe} alt="" />
                            <div>
                                English
                            </div>
                        </div>
                        <div className="footerCont_social_layout_locate_place">
                            <img src={location} alt="" />
                            <div>
                                Jaipur
                            </div>
                        </div>
                    </div>

                    <div className="footerCont_social_layout_help">
                        Visit Help Center
                    </div>
                </div>
            </div>
            <div className="footerCont_company">
                <div className="footerCont_company_title">
                    Company
                </div>
                <div className="footerCont_company_text">
                    <div>About us</div>
                    <div>Our offerings</div>
                    <div>Newsroom</div>
                    <div>Investors</div>
                    <div>Blog</div>
                    <div>Careers</div>
                    <div>AI</div>
                    <div>Gift Cards</div>
                </div>
            </div>
            <div className="footerCont_product">
                <div className="footerCont_product_title">
                    Product
                </div>
                <div className="footerCont_product_text">
                    <div>Ride</div>
                    <div>Drive</div>
                    <div>Eat</div>
                    <div>RideTEGO for Business</div>
                    <div>RideTEGO Freight</div>
                </div>
            </div>
            <div className="footerCont_citizenship">
                <div className="footerCont_citizenship_title">
                    Global Citizenship
                </div>
                <div className="footerCont_citizenship_text">
                    <div>Safety</div>
                    <div>Diversity and Inclusion</div>
                </div>
            </div>


            <div className="footerCont_lastInfo">
                <div className="footerCont_lastInfo_download">
                    <img src={googlestore} alt="google" className="footerCont_lastInfo_download_google" />
                    <img src={applestore} alt="apple" className="footerCont_lastInfo_download_apple"/>
                </div>
                <div className="footerCont_lastInfo_links">
                    <div>Privacy</div>
                    <div>Accessibility</div>
                    <div>Terms</div>
                </div>
            </div>
            <div className="footerCont_secBackground"></div>
        </div>
    )
}