import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './Booking.css';

function Booking() {
const location = useLocation();
const { name, time, date} = location.state || {};

// Add form submission handling logic
const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic
    const path = '/dashboard';
    navigate(path);
};

const navigate = useNavigate();
const cancel = () => {
    const path = '/dashboard';
    navigate(path);
}

return (
    <div className = "booking-form-container">
        <div className = "booking-form-header">
            <h2>Confirm your {name} Booking</h2>
        </div>
        <div className = "booking-form-map">
            {/* Embed map component or image here */}
        </div>
        <div className = "booking-form-time">
            {date?.toLocaleString('default', { year: 'numeric', month: 'numeric', day: 'numeric'})} - {time}
        </div>
        <form onSubmit = {handleSubmit}>
            <div className = "booking-form-inputs">
                <input type = "text" placeholder =  "First Name" required />
                <input type = "text" placeholder = "Last Name" required />
                <input type = "email" placeholder = "Email Address" required />
                <input type = "tel" placeholder = "Mobile Number" required />
            </div>
            <div className = "booking-form-consent">
                <input type = "checkbox" id = "consentCheckbox" required />
                <label htmlFor = "consentCheckbox">
                    I give permission to save the data I have entered here and use this data to contact me.
                    More information in our privacy statement.
                </label>
            </div>

            <div className = "booking-form-actions">
                <button type = "button" className = "booking-form-cancel" onClick = {cancel}>
                    Cancel
                </button>
                <button type = "submit" className = "booking-form-submit">
                    Confirm
                </button>
            </div>
        </form>
    </div>
);
}

export default Booking;