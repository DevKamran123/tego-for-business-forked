import CouponCard from "../components/CouponCard";
import DashboardHeader from "../components/DashboardHeader";
import MobileHeader from "../components/MobileHeader";
import MobileSidebar from "../components/MobileSiebar";
import useCouponStore from "../store/Coupon";
import "../styles/pages/Coupon.scss";

export default function Coupon() {
    const activeTab = useCouponStore((state)=>state.activeTab);
    const setActiveTab = useCouponStore((state)=>state.setActiveTab);

    return (
        <div className="coupon">
            <DashboardHeader />
            <div>
                <MobileHeader />
            </div>
            <div style={{position: "relative"}}>
                <MobileSidebar />
                <div className="coupon_title">
                    Coupons
                </div>
                <div className="coupon_tabs">
                    <div 
                        className={activeTab==="available" ? "coupon_tabs_active": ""}
                        onClick={()=>setActiveTab("available")}
                    >
                        Available
                    </div>
                    <div 
                        className={activeTab==="used" ? "coupon_tabs_active": ""}
                        onClick={()=>setActiveTab("used")}
                    >
                        Used
                    </div>
                    <div 
                        className={activeTab==="expired" ? "coupon_tabs_active": ""}
                        onClick={()=>setActiveTab("expired")}
                    >
                        Expired
                    </div>
                </div>

                <div className="coupon_layout">
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                </div>
            </div>
        </div>
    )
}