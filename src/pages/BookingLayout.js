import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/GoMeddoLogo.png';
import './BookingLayout.css';

function Layout() {

    return (
        <div className = "booking-layout-conatiner">
            <div className = "booking-header-container">
                <div className = "logo-container">
                    <img src = {Logo} alt = "GoMeddo Logo" />
                </div>
            </div>

            <div className = "booking-container">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;