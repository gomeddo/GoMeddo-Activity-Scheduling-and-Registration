import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Booking.css';
import { useTranslation } from "react-i18next";
import resources from "../../i18n/resources";

function Booking() {
    const location = useLocation();
    const { name, time, date } = location.state || {}; // Default to empty object if state is undefined
    const [hasConfirmed, setHasConfirmed] = useState(false);
    const { t } = useTranslation();
    // Add form submission handling logic
    const handleSubmit = (event) => {
        event.preventDefault();
        // Form submission logic
        setHasConfirmed(true);
    };
    const navigate = useNavigate();
    const handleCancel = () => {
        const path = `/dashboard`;
        navigate(path);
    };
    const handleBackToDashboard = () => {
        const path = `/dashboard`;
        navigate(path);
    };
    return (
        <div className="booking-form-container">
            {hasConfirmed ? (
                <div className="booking-form-confirmation">
                    <div className="booking-form-header">
                        <h2>{t(resources.label_booking_confirmed)}</h2>
                    </div>
                    <div className="booking-form-confirmation-content">
                        <p>{t(resources.message_booking_confirmed_thankyou)}</p>
                        <p>{t(resources.message_booking_confirmed_confirmed)}</p>
                        <p className="booking-form-confirmed-class">
                            {name} on{" "}
                            {date?.toLocaleString("default", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}{" "}
                            at {time}.
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
                        {/* <h2>Confirm your {name} Booking</h2> */}
                        <h2>Confirm your {name} Booking</h2>
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
                            <input type="text" placeholder="First Name" required />
                            <input type="text" placeholder="Last Name" required />
                            <input type="email" placeholder="Email Address" required />
                            <input type="tel" placeholder="Mobile Number" required />
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