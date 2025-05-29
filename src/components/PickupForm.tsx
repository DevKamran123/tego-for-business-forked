import "../styles/components/PickupForm.scss";
import { DatePicker, TimePicker } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { usePlacesAutocompleteHook } from "../hooks/usePlacesAutocompleteHook"; // Assuming this is the correct path
import PlacesSuggestions from "./personal-map-view/PlacesSuggestions"; // Assuming this is the correct path
import { Suggestion } from "use-places-autocomplete"; // Import Suggestion

// Assuming LatLngLiteral is defined, e.g.:
type LatLngLiteral = { lat: number; lng: number };

export default function PickupForm() {
  const navigate = useNavigate();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(dayjs());

  const [pickUpPosition, setPickUpPosition] = useState<LatLngLiteral | null>(null);
  const [destinationPosition, setDestinationPosition] = useState<LatLngLiteral | null>(null);

  // Pickup Autocomplete
  const {
    ready: pickUpReady,
    value: pickUpValue,
    setValue: setPickUpValue,
    suggestions: pickUpSuggestionsData,
    suggestionsOpen: pickUpSuggestionsOpen,
    handleSelect: handlePickUpLocationLogic,
    containerRef: pickUpContainerRef,
  } = usePlacesAutocompleteHook();

  // Destination Autocomplete
  const {
    ready: destinationReady,
    value: destinationValue,
    setValue: setDestinationValue,
    suggestions: destinationSuggestionsData,
    suggestionsOpen: destinationSuggestionsOpen,
    handleSelect: handleDestinationLocationLogic,
    containerRef: destinationContainerRef,
  } = usePlacesAutocompleteHook();

  // Wrapped handlers to update positions
  const handlePickUpSelect = async (suggestion: Suggestion) => { // Changed parameter type
    const address = suggestion.description; // Get address from suggestion
    const position = await handlePickUpLocationLogic(address);
    if (position) {
      setPickUpPosition(position);
    }
    // setPickUpValue(address, false); // Already handled by handlePickUpLocationLogic
  };

  const handleDestinationSelect = async (suggestion: Suggestion) => { // Changed parameter type
    const address = suggestion.description; // Get address from suggestion
    const position = await handleDestinationLocationLogic(address);
    if (position) {
      setDestinationPosition(position);
    }
    // setDestinationValue(address, false); // Already handled by handleDestinationLocationLogic
  };

  // Format date for display
  const displayDate = selectedDate
    ? selectedDate.format("MMM D, YYYY")
    : "Today";

  // Format time for display
  const displayTime = selectedTime ? selectedTime.format("h:mm A") : "Now";

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

  const handleNext = () => {
    // Basic validation: ensure locations are selected
    if (!pickUpPosition || !destinationPosition) {
      alert("Please select both pickup and destination locations.");
      return;
    }
    navigate('/personal/ride', { 
      state: { 
        pickUp: pickUpPosition, 
        destination: destinationPosition, 
        date: selectedDate?.toISOString(), // Pass as ISO string
        time: selectedTime?.toISOString(), // Pass as ISO string
        pickUpAddress: pickUpValue,
        destinationAddress: destinationValue
      } 
    });
  };

  return (
    <div className="pickupformCont">
      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
        <div ref={pickUpContainerRef} style={{ position: 'relative' }}>
          <input 
            placeholder="Enter pick up location" 
            value={pickUpValue}
            onChange={(e) => setPickUpValue(e.target.value)}
            disabled={!pickUpReady}
          />
          {pickUpSuggestionsOpen && pickUpValue && (
            <PlacesSuggestions 
              suggestions={pickUpSuggestionsData} 
              onSelect={handlePickUpSelect}
              open={pickUpSuggestionsOpen} 
              variant="dark" // Added dark variant
            />
          )}
        </div>
        <div ref={destinationContainerRef} style={{ position: 'relative' }}>
          <input 
            placeholder="Enter destination" 
            value={destinationValue}
            onChange={(e) => setDestinationValue(e.target.value)}
            disabled={!destinationReady}
          />
          {destinationSuggestionsOpen && destinationValue && (
            <PlacesSuggestions 
              suggestions={destinationSuggestionsData} 
              onSelect={handleDestinationSelect}
              open={destinationSuggestionsOpen}
              variant="dark" // Added dark variant
            />
          )}
        </div>

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
          <button className="button" type="button" onClick={handleNext}> {/* Changed type to button and added onClick */}
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
