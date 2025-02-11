import { useNavigate } from "react-router-dom";
import "../styles/components/AuthButton.scss";

interface AuthButtonProps {
    text: string;
    color: string;
    action: string;
}

export default function AuthButton({text, color, action}: AuthButtonProps) {
    const navigate = useNavigate();

    return (
        <button 
            className={`authbutton ${color==="primary"? "authprimary": "authsecondary"}`}
            onClick={()=>navigate(action)}
        >
            {text}
        </button>
    )
}