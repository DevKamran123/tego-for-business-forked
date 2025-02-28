import { useMediaQuery } from "react-responsive";
import BookRideForm from "../components/BookRideForm";
import DashboardHeader from "../components/DashboardHeader";
import PlanRide from "../components/PlanRide";
import RecentHistory from "../components/RecentHistory";
import TotalCard from "../components/TotalCard";
import { deliveryDetails, totalCardItems } from "../data/dashboard";
import "../styles/pages/Dashboard.scss";
import Hero from "../components/Hero";
import DashboardHero from "../components/DashboardHero";


export default function Dashboard() {
    const isMobile = useMediaQuery({maxWidth: 862});
    
    return (
        <div className="dashboard">
            <div className="dashboard_header">
                <DashboardHeader />
            </div>
            <div className="dashboard_title">
                Book a ride
            </div>

            <div className="dashboard_actions">
                {isMobile && <DashboardHero />}
                <div className="dashboard_actions_location">
                    {<BookRideForm />}
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
                <RecentHistory deliveryDetails={deliveryDetails}/>
            </div>
        </div>
    )
}