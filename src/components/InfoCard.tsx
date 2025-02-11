import "../styles/components/InfoCard.scss";

interface InfoCardProps {
    info: {
        text: string;
        title: string;
        image: string;
    }
}

export default function InfoCard({info}: InfoCardProps) {
    const {image, title, text} = info;
    return (
        <div className="infocardCont">
            <img src={image} />

            <div className="infocardCont_title">
                {title}
            </div>
            <div className="infocardCont_text">
                {text}
            </div>
            <div className="infocardCont_learn">
                Learn more
            </div>
        </div>
    )
}

