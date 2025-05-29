import React, { useState, useRef, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"; // Removed FormikValues
import * as Yup from "yup";
import "../styles/pages/Login.scss"; 
import { TInput, TInputLabel } from "../components/styled";
import { InputProps } from "antd";
import TButton from "../components/buttons/TButton";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/AppStore";
import rideTegoLogo from "../assets/images/rideTegoLogo.png";
import toast from "react-hot-toast";
import { submitOnboardingData, uploadProfileImage } from "../lib/auth/onboarding";
import { OnboardingPayload } from "../types/onboarding";
import PlacesSuggestions from "../components/personal-map-view/PlacesSuggestions";
import { useLoadScript } from "@react-google-maps/api";
import { getGoogleMapsApiKey } from "../utils/env";
import Loader from "../components/Loader";
import usePlacesAutocomplete, { getGeocode, getZipCode, Suggestion } from "use-places-autocomplete";

const OnboardingSchema = Yup.object().shape({
  residentialAddress: Yup.string().required("Residential address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal code is required"),
  socialSecurityNumber: Yup.string().required("Social Security Number is required"),
  profileImage: Yup.mixed().required("Profile image is required").nullable(), // Added nullable
});

interface OnboardingFormValues {
  residentialAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  socialSecurityNumber: string;
  profileImage: File | null; 
}

const libraries: ("places")[] = ["places"];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { setSession } = useAppStore((state) => state);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: getGoogleMapsApiKey(),
    libraries,
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    init,
  } = usePlacesAutocomplete({
    initOnMount: false, 
    debounce: 300,
  });

  useEffect(() => {
    if (isLoaded && !ready) {
      console.log("Google Maps script loaded, initializing usePlacesAutocomplete...");
      init(); 
    }
    if (ready) {
      console.log("usePlacesAutocomplete is ready.");
    }
    if (loadError) {
        console.error("Google Maps script load error:", loadError);
    }
  }, [isLoaded, ready, init, loadError]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: File | null) => void) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFieldValue("profileImage", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFieldValue("profileImage", null);
      setProfileImagePreview(null);
    }
  };

  // Renamed from handleAddressSelect to onAddressSuggestionSelect for clarity
  const onAddressSuggestionSelect = async (
    suggestion: Suggestion, // Expects a Suggestion object
    formikSetFieldValue: (field: keyof OnboardingFormValues, value: string, shouldValidate?: boolean) => void
  ) => {
    setValue(suggestion.description, false); 
    clearSuggestions();
    formikSetFieldValue("residentialAddress", suggestion.description);
    
    try {
      const results = await getGeocode({ address: suggestion.description }); // Use suggestion.description
      if (results && results[0]) {
        const geoResult = results[0];
        let city = "";
        let state = "";
        let country = "";
        let postalCode = "";

        for (const component of geoResult.address_components) {
          if (component.types.includes("locality")) city = component.long_name;
          if (component.types.includes("administrative_area_level_1")) state = component.long_name;
          if (component.types.includes("country")) country = component.long_name;
          if (component.types.includes("postal_code")) postalCode = component.long_name;
        }
        
        if (!postalCode && geoResult.geometry?.location) {
            try {
                const zipResult = await getZipCode(geoResult, false); 
                if (zipResult) postalCode = zipResult;
            } catch (e) {
                console.warn("Could not get zip code via getZipCode:", e);
            }
        }
        formikSetFieldValue("city", city);
        formikSetFieldValue("state", state);
        formikSetFieldValue("country", country);
        formikSetFieldValue("postalCode", postalCode);
      }
    } catch (error) {
      console.error("Error getting geocode: ", error);
      toast.error("Could not fetch address details.");
    }
  };

  if (loadError) return <div>Error loading maps. Please check your API key or network.</div>;
  // Keep the loader until both script is loaded and places hook is ready.
  if (!isLoaded || !ready) {
    // console.log(`Waiting for maps: isLoaded=${isLoaded}, ready=${ready}`)
    return <Loader />;
  } 

  return (
    <>
      <div className="login-head">
        <div className="login-head_logo">
          <img src={rideTegoLogo} alt="logo" />
          RideTEGO
        </div>
        <div className="login-head_text">Complete Your Profile</div>
      </div>
      <div className="login_wrapper">
        <div
          className="login_fluff"
          style={{ backgroundImage: `url("/src/assets/images/bgAuth.png")` }}
        >
          <div>
            <p>Welcome to RideTEGO</p>
          </div>
        </div>
        <div className="login_content">
          <h2 className="login_header">Onboarding</h2>
          <div className="login_form_wrapper">
            <Formik
              initialValues={{
                residentialAddress: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                socialSecurityNumber: "",
                profileImage: null,
              } as OnboardingFormValues}
              validationSchema={OnboardingSchema}
              onSubmit={async (values: OnboardingFormValues, { setSubmitting }: FormikHelpers<OnboardingFormValues>) => {
                setSubmitting(true);
                let uploadedImageUrl: string | null = null; 

                if (values.profileImage) { 
                  const formData = new FormData();
                  formData.append("files", values.profileImage);
                  try {
                    const imageUploadResponse = await uploadProfileImage(formData);
                    if (imageUploadResponse.success && imageUploadResponse.data && imageUploadResponse.data[0]) {
                      uploadedImageUrl = imageUploadResponse.data[0];
                    } else {
                      toast.error(imageUploadResponse.message || "Failed to upload profile image.");
                      setSubmitting(false);
                      return;
                    }
                  } catch (uploadError) {
                    let message = "An error occurred during image upload.";
                    if (uploadError instanceof Error) message = uploadError.message;
                    toast.error(message);
                    setSubmitting(false);
                    return;
                  }
                }

                if (!uploadedImageUrl) {
                  toast.error("Profile image is required and was not uploaded.");
                  setSubmitting(false);
                  return;
                }

                const onboardingPayload: OnboardingPayload = {
                  residentialAddress: values.residentialAddress,
                  city: values.city,
                  state: values.state,
                  country: values.country,
                  postalCode: values.postalCode,
                  socialSecurityNumber: values.socialSecurityNumber,
                  profileImage: uploadedImageUrl, 
                };

                try {
                    const response = await submitOnboardingData(onboardingPayload);
                    if (response.success && response.data) {
                    const currentSession = JSON.parse(localStorage.getItem("session") || "{}");
                    const newSessionData = { 
                        ...currentSession, 
                        profile: { ...currentSession.profile, ...response.data }
                    };
                    localStorage.setItem("session", JSON.stringify(newSessionData));
                    setSession(JSON.stringify(newSessionData)); 
                    toast.success(response.message);
                    navigate("/dashboard");
                    } else {
                    toast.error(response.message || "Onboarding failed.");
                    }
                } catch (submissionError) {
                    let message = "An error occurred during onboarding submission.";
                    if (submissionError instanceof Error) message = submissionError.message;
                    toast.error(message);
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid, setFieldValue: formikSetFieldValue }) => (
                <Form className="standard-form">
                  <div style={{ position: 'relative' }}>
                    <TInputLabel htmlFor="residentialAddress">Residential Address</TInputLabel>
                    <Field name="residentialAddress">
                      {({ field }: { field: InputProps }) => (
                        <TInput
                          {...field} 
                          value={value} // Controlled by usePlacesAutocomplete
                          onChange={(e) => setValue(e.target.value)} // Update usePlacesAutocomplete value
                          placeholder="Enter your residential address"
                          disabled={!ready} 
                        />
                      )}
                    </Field>
                    {/* Correctly pass props to PlacesSuggestions */}
                    {status === "OK" && data.length > 0 && (
                        <PlacesSuggestions 
                            suggestions={data} 
                            open={status === "OK" && data.length > 0} // Control open state
                            onSelect={(suggestion: Suggestion) => 
                                onAddressSuggestionSelect(suggestion, formikSetFieldValue as (field: keyof OnboardingFormValues, value: string, shouldValidate?: boolean) => void)
                            }
                            variant="dark" // Optional: Add variant prop if needed
                        />
                    )}
                    <ErrorMessage name="residentialAddress" component="p" className="input-error" />
                  </div>

                  <div>
                    <TInputLabel htmlFor="city">City</TInputLabel>
                    <Field name="city">
                      {({ field }: { field: InputProps }) => (
                        <TInput {...field} placeholder="City" readOnly />
                      )}
                    </Field>
                    <ErrorMessage name="city" component="p" className="input-error" />
                  </div>

                  <div>
                    <TInputLabel htmlFor="state">State</TInputLabel>
                    <Field name="state">
                      {({ field }: { field: InputProps }) => (
                        <TInput {...field} placeholder="State" readOnly />
                      )}
                    </Field>
                    <ErrorMessage name="state" component="p" className="input-error" />
                  </div>

                  <div>
                    <TInputLabel htmlFor="country">Country</TInputLabel>
                    <Field name="country">
                      {({ field }: { field: InputProps }) => (
                        <TInput {...field} placeholder="Country" readOnly />
                      )}
                    </Field>
                    <ErrorMessage name="country" component="p" className="input-error" />
                  </div>

                  <div>
                    <TInputLabel htmlFor="postalCode">Postal Code</TInputLabel>
                    <Field name="postalCode">
                      {({ field }: { field: InputProps }) => (
                        <TInput {...field} placeholder="Postal Code" readOnly />
                      )}
                    </Field>
                    <ErrorMessage name="postalCode" component="p" className="input-error" />
                  </div>

                  <div>
                    <TInputLabel htmlFor="socialSecurityNumber">Social Security Number</TInputLabel>
                    <Field name="socialSecurityNumber">
                      {({ field }: { field: InputProps }) => (
                        <TInput {...field} placeholder="Social Security Number" />
                      )}
                    </Field>
                    <ErrorMessage name="socialSecurityNumber" component="p" className="input-error" />
                  </div>

                  <div>
                    <TInputLabel htmlFor="profileImage">Profile Image</TInputLabel>
                    <input 
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      ref={fileInputRef}
                      onChange={(event) => handleImageChange(event, formikSetFieldValue as (field: string, value: File | null) => void)}
                      className="file-input"
                      accept="image/*" 
                    />
                    {profileImagePreview && (
                      <img 
                        src={profileImagePreview} 
                        alt="Profile Preview" 
                        style={{ marginTop: '10px', width: '100px', height: '100px', objectFit: 'cover' }} 
                      />
                    )}
                    <ErrorMessage name="profileImage" component="p" className="input-error" />
                  </div>

                  <TButton
                    htmlType="submit"
                    disabled={isSubmitting || !isValid}
                    loading={isSubmitting}
                    tvariant="secondary"
                  >
                    Complete Onboarding
                  </TButton>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
