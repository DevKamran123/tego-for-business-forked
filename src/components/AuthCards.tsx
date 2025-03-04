import "../styles/components/AuthCards.scss";
interface AuthCardsProps {
    details: {
        image: string
        text: string
    }
}

export default function AuthCards({details}: AuthCardsProps) {
    return (
        <div className="authcardsCont">
            <img src={details.image} alt="" />
            <div className="authcardsCont_text">
                {details.text}
            </div>
        </div>
    )
}