import { ErrorMessage, Field, Form, Formik } from "formik";
import "../styles/components/PlanRide.scss";
import { TInput } from "./styled";
import * as Yup from "yup";
import { DatePicker, InputProps } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import calendar from "../assets/icons/calendar.png";

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
                        <DatePicker
                            // defaultValue={currentDate}
                            placeholder="mm/dd/yy"
                            format={dateFormat}
                            minDate={currentDate} // Set minimum date to current date
                            maxDate={currentDate.add(3, 'year')} // Optional: set maximum date to 1 year from now
                            // style={{ width: '100%', color: 'blue' }} // Make date picker full width
                        />

                        <div className="planRide_date_bottom_actions">
                            <div>Cancel</div>
                            <div>Ok</div>
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