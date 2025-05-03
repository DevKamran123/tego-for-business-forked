import "../styles/components/PickupForm.scss";
import { DatePicker, InputProps } from "antd";

export default function PickupForm() {
  return (
    <div className="pickupformCont">
      <form>
        <input placeholder="Enter pick up location" />
        <input placeholder="Enter destination" />

        <div>
          <div className="dateContainer">
            <DatePicker
              required
              placeholder="Today"
              //   format={dateFormat}
              //   minDate={currentDate}
              //   maxDate={currentDate.add(3, "year")}
              //   value={selectedDate}
              //   onChange={handleDateChange}
              allowClear={false}
              style={{ width: "100%" }}
            />
            <div className="lab">Date</div>
          </div>
        </div>
        <button type="submit">Next</button>
        {/* <div className="pickupformCont_text">Go anywhere with RidetEGO.. Request a ride, hop in, and go</div> */}
      </form>
    </div>
  );
}
