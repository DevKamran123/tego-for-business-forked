import DashboardHeader from "../components/DashboardHeader"
import MobileHeader from "../components/MobileHeader";
import MobileSidebar from "../components/MobileSiebar";
import PlannedRidesCard from "../components/PlannedRidesCard";
import RideHistoryCard from "../components/RideHistoryCard";
import { deliveryData } from "../data/dashboard";
import useRideStore from "../store/RideStore"
import "../styles/pages/Rides.scss"

export default function Rides() {
    const activeTab = useRideStore((state)=>state.activeTab);
    const setActiveTab = useRideStore((state)=>state.setActiveTab);

    return (
        <div className="rides">
            <DashboardHeader />
            <MobileHeader />

            <div style={{position: "relative"}}>
                <MobileSidebar />
                <div className="rides_tabs">
                    <div 
                        className={activeTab==="ride-history" ? "rides_tabs_active": ""}
                        onClick={()=>setActiveTab("ride-history")}
                    >
                        Trip History
                    </div>
                    <div 
                        className={activeTab==="planned-rides" ? "rides_tabs_active": ""}
                        onClick={()=>setActiveTab("planned-rides")}
                    >
                        Scheduled Rides
                    </div>
                </div>

                {activeTab==="ride-history" && 
                <div className="rides_allHistory">
                    {deliveryData.map((deliveryDetails)=> (
                        <RideHistoryCard deliveryDetails={deliveryDetails} key={deliveryDetails.id}/>
                    ))}
                </div>}

                {activeTab==="planned-rides" && 
                <div className="rides_allHistory">
                    {deliveryData.map((deliveryDetails)=> (
                        <PlannedRidesCard deliveryDetails={deliveryDetails} key={deliveryDetails.id}/>
                    ))}
                </div>}
            </div>
        </div>
    )
}