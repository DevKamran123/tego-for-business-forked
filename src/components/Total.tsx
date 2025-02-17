import "../styles/components/Total.scss";

interface TotalProps {
    details: {
        image?: string;
        text: string;
        value: number;
    }
}

export default function Total({details}: TotalProps) {
    const {image, text, value} = details;

    return (
        <div className="total">
            <div className="total_image">
                <img src={image} alt="" />
            </div>
            <div className="total_text">
                <div className="total_text_title">
                    {text}
                </div>
                <div className="total_text_value">
                    {value}
                </div>
            </div>
        </div>
    )
}