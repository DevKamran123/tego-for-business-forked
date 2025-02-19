import { ErrorMessage, Field, Form, Formik } from "formik";
import "../styles/components/PlanRide.scss";
import { TInput } from "./styled";
import * as Yup from "yup";
import { DatePicker, InputProps } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import calendar from "../assets/icons/calendar.png";
import { useState } from "react";

dayjs.extend(customParseFormat);

const dateFormat = 'MM-DD-YYYY';
const currentDate = dayjs(); // Get current date

const LoginSchema = Yup.object().shape({
  location: Yup.string().required("Pickup location is required"),
  destination: Yup.string().required("Destination is required"),
  passengers: Yup.number()
  .required("Number of passengers is required"),
});

export default function PlanRide() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [tempDate, setTempDate] = useState<Dayjs | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleDateChange = (date: Dayjs | null) => {
        setTempDate(date);
        setSelectedDate(date);
    };

    const handleOk = () => {
        setSelectedDate(tempDate);
        setIsCalendarOpen(false);
    };

    const handleCancel = () => {
        setTempDate(null);
        setSelectedDate(null);
    };

    const handleFocus = () => {
        setIsCalendarOpen(true);
        // Add any additional focus handling logic here
    };

    return (
        <Formik
        initialValues={{ location: "", destination: "", passengers:"" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
            console.log(values);
        }}
        >
            <Form className="planRide">
                <div className="planRide_date">
                    <div className="planRide_date_top">
                        <div className="planRide_date_top_select">Select date</div>
                        <label>
                            <div className="planRide_date_top_layout">
                                <div>
                                    Enter date
                                </div>
                                <img src={calendar} alt="calendar" />
                            </div>
                            <img src="" alt="" />
                        </label>
                    </div>
                    <div className="planRide_date_bottom">
                        <div className="dateContainer">

                            <DatePicker
                                required
                                placeholder="mm/dd/yy"
                                format={dateFormat}
                                minDate={currentDate}
                                maxDate={currentDate.add(3, 'year')}
                                value={selectedDate}
                                onChange={handleDateChange}
                                onFocus={handleFocus} // Add focus handler
                                open={isCalendarOpen} // Control calendar visibility
                                allowClear={false}
                                style={{ width: '100%' }}
                            />
                            <div className="lab">
                                Date
                            </div>
                        </div>

                        <div className="planRide_date_bottom_actions">
                            <div 
                                onClick={handleCancel}
                                className="planRide_date_bottom_actions_cancel"
                            >
                                Cancel
                            </div>
                            <div 
                                onClick={handleOk}
                                className="planRide_date_bottom_actions_ok"
                            >
                                Ok
                            </div>
                        </div>
                    </div>
                </div>
                <div className="planRide_place">
                    <div className="planRide_place_cont">
                        <label htmlFor="location">Enter pick up location</label>
                        <Field name="location">
                        {({ field }: { field: InputProps }) => (
                            <TInput
                            {...field}
                            type="text"
                            placeholder=""
                            />
                        )}
                        </Field>
                        <ErrorMessage
                        name="location"
                        component="p"
                        className="input-error"
                        />
                    </div>
                    
                    <div className="planRide_place_cont">
                        <label htmlFor="passengers">Number of passengers</label>
                        <Field name="passengers">
                        {({ field }: { field: InputProps }) => (
                            <TInput
                            {...field}
                            type="number"
                            placeholder=""
                            />
                        )}
                        </Field>
                        <ErrorMessage
                        name="passengers"
                        component="p"
                        className="input-error"
                        />
                    </div>

                    <div className="planRide_place_cont">
                        <label htmlFor="destination">Enter destination</label>
                        <Field name="destination">
                        {({ field }: { field: InputProps }) => (
                            <TInput
                            {...field}
                            type="text"
                            placeholder=""
                            />
                        )}
                        </Field>
                        <ErrorMessage
                        name="destination"
                        component="p"
                        className="input-error"
                        />
                    </div>

                    <div className="planRide_place_cont">
                        <button>Done</button>
                    </div>

                    
                </div>
            </Form>
        
        </Formik>
    )
}