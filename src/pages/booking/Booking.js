import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Booking.css";
import { useTranslation } from "react-i18next";
import resources from "../../i18n/resources";
import { SObject } from "@gomeddo/sdk";
import { buildReservationObj } from "./helpers.js";
import useGoMeddo from "../../hooks/useGoMeddo.js";
import AppRoutes from "../../constants/AppRoutes";

function Booking() {
    const currentLocation = useLocation(); // Accessing current location
    const { name, time, date, room, instructor, imageUrl, center, location } = currentLocation.state || {}; // Destructure name, time, and date from location state with fallback to empty object
    const reservation = buildReservationObj(currentLocation.state.reservation); // Build reservation object using data from location state
    const [hasConfirmed, setHasConfirmed] = useState(false); // State variable for tracking confirmation status
    const [isLoading, setIsLoading] = useState(false); // State variable for tracking loading status
    const [opacity, setOpacity] = useState(0); // New state for controlling opacity
    const { t } = useTranslation();
    const gm = useGoMeddo();
    const navigate = useNavigate(); // Hook for navigation

    // useEffect to handle the transition
    useEffect(() => {
        // Start the transition after mounting
        setOpacity(1);
    }, []);

    // Add form submission handling logic
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Extract form input values
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const email = event.target.elements.email.value;
        const mobileNumber = event.target.elements.mobileNumber.value;
        const contactData = `${firstName}, ${lastName}, ${email}, ${mobileNumber}`;

        //Update reservation contact with form input data
        const reservationContact = new SObject();
        reservationContact.setCustomProperty("B25__Notes__c", contactData);

        try {
            setIsLoading(true); // Set loading to true when data submission starts
            reservation.addReservationContact(reservationContact);
            await gm.updateReservation(reservation);
            setHasConfirmed(true);
        } finally {
            setIsLoading(false); // Set loading to false after data submission completes
        }
    };

    // Function to navigate back to dashboard after confirmation
    const handleBackToDashboard = () => {
        const path = AppRoutes.dashboard;
        navigate(path);
    };

    return (
        <div
            className={`booking-form-container ${isLoading ? "booking-form-loading" : ""} ${opacity === 1 ? "booking-form-container-active" : ""}`}
            style={{ opacity }} // This controls the fading effect
        >
            <div className="booking-form">
                {isLoading ? ( // Show loader if isLoading is true
                    <div className="booking-form-loading">
                        {t(resources.message_booking_loading)}
                        <div className="booking-form-loading-spinner"></div>{" "}
                        {/* Loader spinner */}
                    </div>
                ) : hasConfirmed ? ( // Show confirmation message if hasConfirmed is true
                    <div className="booking-form-confirmation">
                        {" "}
                        {/* Confirmation message */}
                        <div className="booking-form-header">
                            <h2>{t(resources.label_booking_confirmed)}</h2>
                        </div>
                        <div className="booking-form-confirmation-content">
                            <p>{t(resources.message_booking_confirmed_thankyou)}</p>
                            <p>{t(resources.message_booking_confirmed_confirmed)}</p>
                            <p className="booking-form-confirmed-class">

                                <div class="booking-class-container">
                                    <div class="booking-class-image">
                                        <img src={imageUrl} alt={name} />
                                    </div>
                                    <div className="booking-class-details">
                                        <div>
                                            <div class="booking-class-name">
                                                {name}
                                                <br />
                                            </div>
                                            <div class="booking-class-time">
                                                {date?.toLocaleString("default", {
                                                    weekday: "long",
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}, {time}
                                            </div>
                                        </div>
                                        <div class="booking-class-room-instructor">
                                            <span>{room}</span> <span> / </span> <span>{instructor}</span>
                                        </div>
                                        <div class="booking-class-location-center">
                                            <span className="class-center">{center}</span><span> | </span><span>{location}</span>
                                        </div>
                                    </div>
                                </div>

                            </p>
                            <p>{t(resources.message_booking_confirmed_email)}</p>
                        </div>
                        <div className="booking-form-actions">
                            <button
                                type="button"
                                className="booking-form-button booking-form-back-button"
                                onClick={handleBackToDashboard}
                            >
                                {t(resources.message_booking_confirmed_back)}
                            </button>
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <div className="booking-form-header">
                            <h2>{t(resources.label_booking_confirm_name, { name })}</h2>
                        </div>
                        <div className="booking-form-time">
                            {date?.toLocaleString("default", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                            })}{" "}
                            - {time}
                        </div>
                        <div className="booking-form-map">
                            {/* Embed map component or image here */}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="booking-form-inputs">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder={t(resources.label_first_name)}
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder={t(resources.label_last_name)}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t(resources.label_email_address)}
                                    required
                                />
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    placeholder={t(resources.label_mobile_number)}
                                    required
                                />
                            </div>
                            <div className="booking-form-consent">
                                <input type="checkbox" id="consentCheckbox" required />
                                <label htmlFor="consentCheckbox">
                                    {t(resources.message_booking_permission)}
                                </label>
                            </div>
                            <div className="booking-form-footer">
                                <div className="booking-form-actions">
                                    <button
                                        type="button"
                                        className="booking-form-button booking-form-cancel"
                                        onClick={handleBackToDashboard}
                                    >
                                        {t(resources.button_cancel)}
                                    </button>
                                    <button
                                        type="submit"
                                        className="booking-form-button booking-form-submit"
                                    >
                                        {t(resources.button_confirm)}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default Booking;