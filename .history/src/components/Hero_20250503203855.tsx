import React from 'react'
import "../styles/components/Hero.scss";
import Header from './Header';
import PickupForm from './PickupForm';
import Homesidebar from './HomeSidebar';

const Hero: React.FC = () => {
  return (
    <div className='heroCont'>
      {/* <div className='heroCont_overlay'>
      </div> */}
      <div className='heroCont_content'>
        <Header />
        <div className='heroCont_content_layout'>
        <Homesidebar />
          <div className='heroCont_content_layout_welcome'>
            Welcome to RideTEGO
          </div>
          <div className='heroCont_content_layout_ad'>
            We take you there for less
          </div>
          <PickupForm />
        </div>
      </div>
    </div>
  )
}

export default Hero