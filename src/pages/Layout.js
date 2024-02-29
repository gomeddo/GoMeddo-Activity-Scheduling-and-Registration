import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../assets/GoMeddoLogo.png';
import IconMapFill from '../components/icons/IconMapFill';
import IconCalendar from '../components/icons/IconCalendar';
import './Layout.css';

function Layout() {

    const location = useLocation();
    const { pathname } = location;
    const isBooking = pathname === '/booking';
    const handleToggle = () => {
        console.log('Toggle button clicked');
    }

    return (
        <div className="layout-container">
            <div className="header-container">
                {/* Placeholder div to keep the title centered */}
                {!isBooking &&
                    <div className="header-placeholder"></div>
                }
                <div className="logo-container">
                    <img src={Logo} alt="GoMeddo Logo" />
                </div>
                {!isBooking &&
                    <button className="toggle-button" onClick={handleToggle}>
                        <span className="toggle-active"><IconCalendar /></span><span className="toggle-inactive"><IconMapFill /></span>
                    </button>
                }
            </div>

            {/* Content container where nested routes will be rendered */}
            <div className={!isBooking ? 'content-container' : 'booking-content-container'}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;