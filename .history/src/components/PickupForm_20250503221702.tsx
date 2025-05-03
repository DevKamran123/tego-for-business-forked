// import "../styles/components/PickupForm.scss";
// import { DatePicker, TimePicker } from "antd";
// import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

// export default function PickupForm() {
//   return (
//     <div className="pickupformCont">
//       <form>
//         <input placeholder="Enter pick up location" />
//         <input placeholder="Enter destination" />

//         <div className="date-time-container">
//           <div className="date-picker">
//             <DatePicker
//               suffixIcon={<CalendarOutlined />}
//               placeholder="Today"
//               allowClear={false}
//               bordered={false}
//             />
//           </div>

//           <div className="time-picker">
//             <TimePicker
//               suffixIcon={<ClockCircleOutlined />}
//               placeholder="Now"
//               allowClear={false}
//               bordered={false}
//               format="h:mm a"
//             />
//           </div>
//         </div>
//         <button type="submit">Next</button>
//         {/* <div className="pickupformCont_text">Go anywhere with RidetEGO.. Request a ride, hop in, and go</div> */}
//       </form>
//     </div>
//   );
// }

import "../styles/components/PickupForm.scss";
import { DatePicker, TimePicker } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function PickupForm() {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  return (
    <div className="pickupformCont">
      <form>
        <input placeholder="Enter pick up location" />
        <input placeholder="Enter destination" />

        <div className="date-time-container">
          <div
            className="custom-picker date-picker"
            onClick={() => setDatePickerOpen(!datePickerOpen)}
          >
            <CalendarOutlined className="picker-icon" />
            <span className="picker-text">Today</span>
            <DatePicker
              open={datePickerOpen}
              onOpenChange={setDatePickerOpen}
              allowClear={false}
              bordered={false}
              className="hidden-picker"
            />
          </div>

          <div
            className="custom-picker time-picker"
            onClick={() => setTimePickerOpen(!timePickerOpen)}
          >
            <ClockCircleOutlined className="picker-icon" />
            <span className="picker-text">Now</span>
            <span className="dropdown-arrow">▼</span>
            <TimePicker
              open={timePickerOpen}
              onOpenChange={setTimePickerOpen}
              allowClear={false}
              bordered={false}
              format="h:mm a"
              className="hidden-picker"
            />
          </div>
        </div>

        <div className="cta_section">
          <button type="submit">Next</button>

          <div className="signup-link">
            <a href="#">Sign up now and Go</a>
          </div>
        </div>
      </form>
    </div>
  );
}
