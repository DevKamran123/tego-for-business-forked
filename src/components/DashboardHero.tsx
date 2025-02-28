import React from 'react'
import "../styles/components/DashboardHero.scss";
import Header from './Header';
import Homesidebar from './HomeSidebar';
import OrderRide from './OrderRide';
import MobileHeader from './MobileHeader';

const DashboardHero: React.FC = () => {
  return (
    <div className='dashboardHero'>
      <div className='dashboardHero_overlay'>
      </div>
      <div className='dashboardHero_content'>
        <MobileHeader />
        <div className='dashboardHero_content_layout'>
        <Homesidebar />
          <div className='dashboardHero_content_layout_welcome'>
            Book a ride
          </div>
          <div className='dashboardHero_content_layout_ad'>
            We take you there. For less
          </div>
            <OrderRide />
        </div>
      </div>
    </div>
  )
}

export default DashboardHero