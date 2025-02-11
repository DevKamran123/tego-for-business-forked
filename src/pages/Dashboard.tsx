// import BookRideForm from "../components/BookRideForm";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/pages/Dashboard.scss";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="dashboard_header">
                <DashboardHeader />
            </div>
            <div className="dashboard_title">
                Book a ride
            </div>

            <div className="dashboard_actions">
                <div className="dashboard_actions_location">
                    {/* <BookRideForm /> */}
                </div>
                <div className="dashboard_actions_activities">
                    
                </div>
            </div>
        </div>
    )
}