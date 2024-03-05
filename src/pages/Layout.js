import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMapView } from "../providers/MapViewContext";
import Logo from "../assets/GoMeddoLogo.png";
import IconMapFill from "../components/icons/IconMapFill";
import IconCalendar from "../components/icons/IconCalendar";
import "./Layout.css";

function Layout() {
    const { isMapView, toggleMap } = useMapView();

    const location = useLocation();
    const { pathname } = location;
    const isBooking = pathname === "/booking";

    return (
        <div className="layout-container">
            <div className="header-container">
                {/* Placeholder div to keep the title centered */}
                {!isBooking && <div className="header-placeholder" />}
                <div className="logo-container">
                    {/* Image for the logo */}
                    <img src={Logo} alt="Logo" />
                </div>
                {!isBooking && (
                    <div className="toggle-container">
                        <span
                            className={isMapView ? "toggle-inactive" : "toggle-active"}
                            onClick={() => toggleMap(false)}
                        >
                            <IconCalendar />
                        </span>
                        <span
                            className={isMapView ? "toggle-active" : "toggle-inactive"}
                            onClick={() => toggleMap(true)}
                        >
                            <IconMapFill />
                        </span>
                    </div>
                )}
            </div>
            {/* Content container where nested routes will be rendered */}
            <div
                className={
                    isBooking ? "booking-content-container" : "content-container"
                }
            >
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;