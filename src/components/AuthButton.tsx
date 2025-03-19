// import { useNavigate } from "react-router-dom";
import "../styles/components/AuthButton.scss";

interface AuthButtonProps {
    text: string;
    color: string;
    action?: string;
}

export default function AuthButton({text, color, ...props}: AuthButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    // const navigate = useNavigate();

    // function goToRoute(e: React.MouseEvent<HTMLButtonElement>, action: string) {
    //     e.preventDefault();
    //     navigate(action, { replace: true });
    // }

    return (
        <button 
            className={`authbutton ${color==="primary"? "authprimary": "authsecondary"}`}
            // onClick={()=>navigate(action)}
            {...props}
        >
            {text}
        </button>
    )
}