import "../styles/components/PickupForm.scss";
import { DatePicker, TimePicker } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";

export default function PickupForm() {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(dayjs());

  // Format date for display
  const displayDate = selectedDate
    ? selectedDate.isSame(dayjs(), "day")
      ? "Today"
      : selectedDate.format("MMM D, YYYY")
    : "Today";

  // Format time for display
  const displayTime = selectedTime
    ? selectedTime.isSame(dayjs(), "hour") &&
      selectedTime.isSame(dayjs(), "minute")
      ? "Now"
      : selectedTime.format("h:mm A")
    : "Now";

  // Handle date change
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    setDatePickerOpen(false);
  };

  // Handle time change
  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    setSelectedTime(time);
    setTimePickerOpen(false);
  };

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
            <span className="picker-text">{displayDate}</span>
            <DatePicker
              open={datePickerOpen}
              onOpenChange={setDatePickerOpen}
              onChange={handleDateChange}
              value={selectedDate}
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
            <span className="picker-text">{displayTime}</span>
            <span className="dropdown-arrow">▼</span>
            <TimePicker
              open={timePickerOpen}
              onOpenChange={setTimePickerOpen}
              onChange={handleTimeChange}
              value={selectedTime}
              allowClear={false}
              bordered={false}
              format="h:mm A"
              className="hidden-picker"
            />
          </div>
        </div>

        <div className="cta_section">
          <button className="button" type="submit">
            Next
          </button>

          <div className="signup-link">
            <a href="#">Sign up now and Go</a>
          </div>
        </div>
      </form>
    </div>
  );
}
