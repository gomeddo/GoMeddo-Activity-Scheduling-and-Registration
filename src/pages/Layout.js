import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/GoMeddoLogo.png';
import IconMapFill from './components/icons/IconMapFill';
import IconCalendar from './components/icons/IconCalendar';
import './Layout.css';

function Layout() {

    const handleToogle = () => {
        console.log('Toggle button clicked');
    }

    return (
        <div className="layout-container">
            <div className="header-container">
                <div className="header-placegolder"></div>
                <div className="logo-container">
                    <img src={Logo} alt="GoMeddo Logo" />
                </div>
                <button className="toggle-button" onClick={handleToogle}>
                    <span className="toggle-active"><IconCalendar /></span><span className="toggle-inactive"><IconMapFill /></span>
                </button>
            </div>

            {/* Content container where nested routes will be rendered */}
            <div className="content-container">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;