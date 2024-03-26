import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Booking.css';
import { useTranslation } from "react-i18next";
import resources from "../../i18n/resources";
import { SObject } from '@gomeddo/sdk';
import { buildReservationObj } from "./helpers.js"
import useGoMeddo from '../../hooks/useGoMeddo.js';

function Booking() {
    const location = useLocation(); // Accessing current location
    const { name, time, date } = location.state || {}; // Destructure name, time, and date from location state with fallback to empty object
    const reservation = buildReservationObj(location.state.reservation); // Build reservation object using data from location state
    const [hasConfirmed, setHasConfirmed] = useState(false); // State variable for tracking confirmation status
    const { t } = useTranslation();
    const gm = useGoMeddo();


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
            reservation.addReservationContact(reservationContact);
            await gm.updateReservation(reservation);
            console.log(reservation);
        } catch (error) {
            console.log(error);
        }

        // Set confirmation status to true
        setHasConfirmed(true);
    };
    const navigate = useNavigate(); // Hook for navigation

    // Function to navigate to dashboard
    const handleCancel = () => {
        const path = `/dashboard`;
        navigate(path);
    };

    // Function to navigate back to dashboard after confirmation
    const handleBackToDashboard = () => {
        const path = `/dashboard`;
        navigate(path);
    };

    return (
        <div className="booking-form-container"> {/* Container for booking form */}
            {hasConfirmed ? ( // Conditional rendering based on confirmation status
                <div className="booking-form-confirmation"> {/* Confirmation message */}
                    <div className="booking-form-header">
                        <h2>{t(resources.label_booking_confirmed)}</h2>
                    </div>
                    <div className="booking-form-confirmation-content">
                        <p>{t(resources.message_booking_confirmed_thankyou)}</p>
                        <p>{t(resources.message_booking_confirmed_confirmed)}</p>
                        <p className="booking-form-confirmed-class">
                            {t(resources.message_booking_confirmed_class_date, {
                                name, date: date?.toLocaleString("default", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }), time
                            })}
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
                <div className="booking-form">
                    <div className="booking-form-header">
                        <h2>{t(resources.label_booking_confirm_name, { name })}</h2>
                    </div>
                    <div className="booking-form-map">
                        {/* Embed map component or image here */}
                    </div>
                    <div className="booking-form-time">
                        {date?.toLocaleString("default", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                        })}{" "}
                        - {time}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="booking-form-inputs">
                            <input type="text" name="firstName" placeholder={t(resources.label_first_name)} required />
                            <input type="text" name="lastName" placeholder={t(resources.label_last_name)} required />
                            <input type="email" name="email" placeholder={t(resources.label_email_address)} required />
                            <input type="tel" name="mobileNumber" placeholder={t(resources.label_mobile_number)} required />
                        </div>
                        <div className="booking-form-consent">
                            <input type="checkbox" id="consentCheckbox" required />
                            <label htmlFor="consentCheckbox">
                                {t(resources.message_booking_permission)}
                            </label>
                        </div>
                        <div className="booking-form-actions">
                            <button
                                type="button"
                                className="booking-form-button booking-form-cancel"
                                onClick={handleCancel}
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
                    </form>
                </div>
            )}
        </div>
    );
}
export default Booking;
