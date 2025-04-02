// import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import "../styles/components/AuthButton.scss";
import { LoadingOutlined } from '@ant-design/icons';

interface AuthButtonProps {
    text: string;
    color: string;
    action?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

export default function AuthButton({text, color, isLoading, disabled, ...props}: AuthButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {

    return (
        <button 
            className={`authbutton ${color==="primary"? "authprimary": "authsecondary"}`}
            disabled={disabled}
            {...props}
        >
            {isLoading? <Spin indicator={<LoadingOutlined style={{ color: color==="primary" ? 'grey' : 'white' }} spin />} />: text}
        </button>
    )
}