import "../styles/components/Footer.scss";
import facebook from "../assets/svgs/facebook.svg";
import instagram from "../assets/svgs/instagram.svg";
import linkedIn from "../assets/svgs/linkedIn.svg";
import twitter from "../assets/svgs/twitter.svg";
import globe from "../assets/images/globe.png";
import location from "../assets/images/location.png";
import PrivacyTerms from "./PrivacyTerms";
import FooterDownload from "./FooterDownload";
import { useMediaQuery } from "react-responsive";
import { FC } from "react";

// Interface definitions
interface SocialIcon {
    icon: string;
    alt: string;
}

interface FooterSectionData {
    id: string;
    title: string;
    links: string[];
}

interface FooterSectionProps {
    id: string;
    title: string;
    links: string[];
}

// Social media links data
const socialIcons: SocialIcon[] = [
    { icon: facebook, alt: "Facebook" },
    { icon: instagram, alt: "Instagram" },
    { icon: linkedIn, alt: "LinkedIn" },
    { icon: twitter, alt: "Twitter" }
];

// Navigation sections data
const footerSections: FooterSectionData[] = [
    {
        id: "company",
        title: "Company",
        links: ["About us", "Our offerings", "Newsroom", "Blog", "Careers"]
    },
    {
        id: "product",
        title: "Product",
        links: ["Ride", "Drive", "Eat", "Business"]
    },
    {
        id: "citizenship",
        title: "Global Commitment",
        links: ["Safety", "Diversity and Inclusion"]
    }
];

// Footer section component to avoid repetition
const FooterSection: FC<FooterSectionProps> = ({ id, title, links }) => (
    <div className={`footerCont_${id}`}>
        <div className={`footerCont_${id}_title`}>
            {title}
        </div>
        <div className={`footerCont_${id}_text`}>
            {links.map((link, index) => (
                <div key={index}>{link}</div>
            ))}
        </div>
    </div>
);

// Social media section component
const SocialSection: FC = () => (
    <div className="footerCont_social_layout_icons">
        {socialIcons.map((item, index) => (
            <img key={index} src={item.icon} alt={item.alt} />
        ))}
    </div>
);

const Footer: FC = () => {
    const isMobile = useMediaQuery({ maxWidth: 865 });

    return (
        <div className="footerCont">
            <div className="footerCont_social">
                <div className="footerCont_social_layout">
                    <SocialSection />

                    <div className="footerCont_social_layout_locate">
                        <div className="footerCont_social_layout_locate_lang">
                            <img src={globe} alt="Language" />
                            <div>English</div>
                        </div>
                        <div className="footerCont_social_layout_locate_place">
                            <img src={location} alt="Location" />
                            <div>Jaipur</div>
                        </div>
                    </div>

                    <div className="footerCont_social_layout_help">
                        Visit Help Center
                    </div>
                </div>
                {!isMobile && <FooterDownload />}
            </div>

            <div className="layout-helper">
                {footerSections.map((section) => (
                    <FooterSection 
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        links={section.links}
                    />
                ))}
            </div>
            
            {isMobile && <FooterDownload />}
            <PrivacyTerms />
            <div className="footerCont_secBackground"></div>
        </div>
    );
};

export default Footer;