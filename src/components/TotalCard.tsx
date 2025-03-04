import "../styles/components/TotalCard.scss";

interface TotalCardsProps {
    items: {
        image: string | undefined;
        text: string;
        total: number;
    }
}
export default function TotalCard({items}: TotalCardsProps) {
    const {image, text, total} = items;
    return (
        <div className="totalCard">
            <div className="totalCard_title">
                <img src={image} alt="icon" />
                <div className="totalCard_title_text">
                    {text}
                </div>
            </div>
            <div className="totalCard_count">
                {total}
            </div>
        </div>
    )
}