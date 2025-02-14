import "../styles/components/DashboardHeader.scss"
import notification from "../assets/svgs/notification.svg";

export default function DashboardHeader() {
    return (
        <div className="dashboardHeader">
            <img src={notification} alt="notification" />
            <div className="dashboardHeader_circle"></div>
        </div>
    )
}