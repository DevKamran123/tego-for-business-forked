import googlestore from '../assets/images/googlestore.png';
import applestore from '../assets/images/applestore.png';

export default function FooterDownload() {
    return (
        <div className="footerCont_social_download">
            <img src={googlestore} alt="google" className="footerCont_social_download_google" />
            <img src={applestore} alt="apple" className="footerCont_social_download_apple"/>
        </div>
    )
}