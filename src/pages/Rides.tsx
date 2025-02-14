import DashboardHeader from "../components/DashboardHeader"
import HistoryCard from "../components/HistoryCard";
import { deliveryData } from "../data/dashboard";
import useRideStore from "../store/RideStore"
import "../styles/pages/Rides.scss"

export default function Rides() {
    const activeTab = useRideStore((state)=>state.activeTab);
    const setActiveTab = useRideStore((state)=>state.setActiveTab);

    return (
        <div className="rides">
            <DashboardHeader />
            <div className="rides_tabs">
                <div 
                    className={activeTab==="ride-history" ? "rides_tabs_active": ""}
                    onClick={()=>setActiveTab("ride-history")}
                >
                    Ride History
                </div>
                <div 
                    className={activeTab==="planned-rides" ? "rides_tabs_active": ""}
                    onClick={()=>setActiveTab("planned-rides")}
                >
                    Planned Rides
                </div>
            </div>

            <div className="rides_allHistory">
                {deliveryData.map((deliveryDetails)=> (
                    <HistoryCard deliveryDetails={deliveryDetails} key={deliveryDetails.id}/>
                ))}
            </div>
        </div>
    )
}