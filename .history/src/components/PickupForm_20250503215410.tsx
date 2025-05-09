import "../styles/components/PickupForm.scss";
import { DatePicker, TimePicker } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';


export default function PickupForm() {
  return (
    <div className="pickupformCont">
      <form>
        <input placeholder="Enter pick up location" />
        <input placeholder="Enter destination" />

        <div className="date-time-container">
          <div className="date-picker">
            <DatePicker 
              suffixIcon={<CalendarOutlined />}
              placeholder="Today"
              allowClear={false}
              bordered={false}
            />
          </div>
          
          <div className="time-picker">
            <TimePicker 
              suffixIcon={<ClockCircleOutlined />}
              placeholder="Now"
              allowClear={false}
              bordered={false}
              format="h:mm a"
            />
          </div>
        </div>
        <button type="submit">Next</button>
        {/* <div className="pickupformCont_text">Go anywhere with RidetEGO.. Request a ride, hop in, and go</div> */}
      </form>
    </div>
  );
}
