// import "../styles/components/PickupForm.scss";

// export default function PickupForm() {
//     return (
//         <div className="pickupformCont">
//             <form>
//                 <input placeholder="Enter pick up location"/>
//                 <input placeholder="Enter destination"/>
//                 <button type="submit">Next</button>
//                 {/* <div className="pickupformCont_text">Go anywhere with RidetEGO.. Request a ride, hop in, and go</div> */}
//             </form>
//         </div>
//     )
// }

import "../styles/components/PickupForm.scss";
import { FaCalendarAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";

export default function PickupForm() {
  return (
    <div className="pickupformCont">
      <form>
        <div className="input-container">
          <input placeholder="Enter pick up location" />
        </div>
        <div className="input-container">
          <input placeholder="Enter destination" />
        </div>
        <div className="date-time-container">
          <div className="date-field">
            <FaCalendarAlt className="icon" />
            <span>Today</span>
          </div>
          <div className="time-field">
            <IoTimeOutline className="icon" />
            <span>Now</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
        <button type="submit">Next</button>
        <div className="signup-link">
          <a href="#">Sign up now and Go</a>
        </div>
      </form>
    </div>
  );
}
