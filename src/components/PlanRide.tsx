import { ErrorMessage, Field, Form, Formik } from "formik";
import "../styles/components/PlanRide.scss";
import { TInput, TInputLabel } from "./styled";
import * as Yup from "yup";
import { InputProps } from "antd";


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
                            <div>
                                Enter date
                            </div>
                            <img src="" alt="" />
                        </label>
                    </div>
                    <div className="planRide_date_bottom">
                        <input type="date" />
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