import "../styles/components/HomeCard.scss";

interface HomeCardProps {
    data: {
        title: string;
        text: string;
        image: string;
        link1: string;
        link2?: string;
    }
}

export default function HomeCard({data}: HomeCardProps) {
    const {title, text, image, link1, link2} = data;
    return (
        <div className="homecardCont">
            <div className="homecardCont_image">
                <img src={image} alt="def image" />
            </div>
            <div className="homecardCont_textLayout">
                <div className="homecardCont_textLayout_title">
                    {title}
                </div>
                <div className="homecardCont_textLayout_content">
                    {text}
                </div>
                <div className="homecardCont_textLayout_additional">
                    <div className="homecardCont_textLayout_additional_text">
                        {link1}
                    </div>
                    {link2 &&
                    <div className="homecardCont_textLayout_additional_text">
                        {link2}
                    </div>}
                </div>
            </div>
        </div>
    )
}