import React, { useEffect } from 'react'
import Hero from '../components/Hero';
import "../styles/pages/Home.scss";
import HomeCard from '../components/HomeCard';
import InfoCard from '../components/InfoCard';
import Download from '../components/Download';

import driver from "../assets/images/driver.webp";
import road from "../assets/images/road.webp";
import aboutUs from "../assets/svgs/aboutUs.svg";
import newsroom from "../assets/svgs/newsroom.svg";
import home from "../assets/svgs/home.svg";
import Footer from '../components/Footer';
import useMenuStore from '../store/MenuStore';

const cardData = [
  {
    title: "Our Commitment to your safety",
    text: "With every safety feature and every standard in our Community Guidelines, we're committed to helping to create a safe environment for our users.",
    image: driver,
    link1: "Read About Our Community Guidelines",
    link2: "See all safety features"
  },

  {
    title: "Setting 10,000+ cities in motion",
    text: "The app is available in thousands of cities worldwide, so you can request a ride even when you’re far from home.",
    image: road,
    link1: "View All Cities",
    link2: ""
  }
]


const infoCard = [
  {
    image: aboutUs,
    title: "About Us",
    text: "Find out how we started, what drives us, and how we’re igniting opportunity.",
  },

  {
    image: newsroom,
    title: "Newsroom",
    text: "See announcements about our latest releases, initiatives, and partnerships.",
  },

  {
    image: home,
    title: "Global Citizenship",
    text: "Read about our commitment to making a positive impact in the cities we serve.",
  }
]

const Home: React.FC = () => {
  const { setIsOpen: showSidebar } = useMenuStore((state) => state);

  useEffect(()=> {
    showSidebar(false);
  }, []);

  return (
    <div className='homeCont'>
      <Hero />
      <div className='homeCont_business'>
        <div className='homeCont_business_writeup'>
          <div className='homeCont_business_writeup_title'>
            TEGO For Business
          </div>
          <div className='homeCont_business_writeup_content'>
            Transform the way your company moves and feeds its people.
          </div>
          <div className='homeCont_business_writeup_see'>
            <div>See How</div>
            <div className='homeCont_business_writeup_see_image'>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4764 6.16658L6.00637 1.69657L7.18487 0.518066L13.6667 6.99992L7.18487 13.4817L6.00637 12.3032L10.4764 7.83325H0.333374V6.16658H10.4764Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className='homeCont_safety'>
        <div className='homeCont_safety_title'>
          Focus on safety, Wherever you go
        </div>
        <div className='homeCont_safety_layout'>
          {cardData.map((data)=> (<HomeCard data={data} key={data.title}/>))}
        </div>
      </div>

      <div className='homeCont_app'>
        <div className='homeCont_app_cont'>
          <div className='homeCont_app_cont_title'>
            There’s more to love in the apps
          </div>

          <div className='homeCont_app_cont_layout'>
            <Download text='Download the Rider app' />
            <Download text='Download the Driver app'/>
          </div>
        </div>
      </div>

      <div className='homeCont_moreInfo'>
        {infoCard.map((info)=> (<InfoCard info={info} key={info.title}/>))}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home