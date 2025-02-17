import BookRideForm from "../components/BookRideForm";
import DashboardHeader from "../components/DashboardHeader";
import HistoryCard from "../components/HistoryCard";
import PlanRide from "../components/PlanRide";
import TotalCard from "../components/TotalCard";
import { deliveryDetails, totalCardItems } from "../data/dashboard";
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
                    <BookRideForm />
                </div>
                <div className="dashboard_actions_activities">
                    <div className="dashboard_actions_activities_total">
                        {totalCardItems.map(
                            (items)=>(<TotalCard items={items} key={items.text}/>)
                        )}
                    </div>
                    <div className="dashboard_actions_activities_plan">
                        <div className="dashboard_actions_activities_plan_title">
                            Plan a ride
                        </div>
                        <div className="dashboard_actions_activities_plan_layout">
                            <PlanRide />
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard_history">
                <div className="dashboard_history_title">
                    Recent History
                </div>
                <HistoryCard deliveryDetails={deliveryDetails}/>
            </div>
        </div>
    )
}