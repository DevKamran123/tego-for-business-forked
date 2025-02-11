import { useNavigate } from "react-router-dom";
import "../styles/components/AuthButton.scss";

interface AuthButtonProps {
    text: string;
    color: string;
    action: string;
}

export default function AuthButton({text, color, action}: AuthButtonProps) {
    const navigate = useNavigate();

    function goToRoute(e: React.MouseEvent<HTMLButtonElement>, action: string) {
        e.preventDefault();
        navigate(action, { replace: true });
    }

    return (
        <button 
            className={`authbutton ${color==="primary"? "authprimary": "authsecondary"}`}
            // onClick={()=>navigate(action)}
            onClick={(e)=>goToRoute(e, action)}
        >
            {text}
        </button>
    )
}