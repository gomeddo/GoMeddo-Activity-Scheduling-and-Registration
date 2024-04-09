import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMapView } from "../providers/MapViewContext";
import Logo from "../assets/GoMeddoLogo.png";
import IconMapFill from "../components/icons/IconMapFill";
import IconCalendar from "../components/icons/IconCalendar";
import "./Layout.css";
import IconGlobe from "../components/icons/IconGlobe";
import Languages from "../constants/Languages";
import { useTranslation } from "react-i18next";

function Layout() {
    const { isMapView, handleToggleMap } = useMapView();

    const location = useLocation();
    const { pathname } = location;
    const isBooking = pathname === "/booking";

    const { i18n } = useTranslation();

    return (
        <div className="layout-container">
            <div className="header-container">
                {/* Placeholder div to keep the title centered */}
                {!isBooking && (
                    <div className="toggle-container-language">
                        <IconGlobe />
                        <select
                            value={i18n.language}
                            onChange={(e) => {
                                i18n.changeLanguage(e.target.value);
                            }}
                        >
                            {Languages.map((language) => (
                                <option key={language.code} value={language.code}>
                                    {language.language}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="logo-container">
                    {/* Image for the logo */}
                    <img src={Logo} alt="Logo" />
                </div>
                {!isBooking && (
                    <div className="toggle-container">
                        <span
                            className={isMapView ? "toggle-inactive" : "toggle-active"}
                            onClick={() => handleToggleMap(false)}
                        >
                            <IconCalendar />
                        </span>
                        <span
                            className={isMapView ? "toggle-active" : "toggle-inactive"}
                            onClick={() => handleToggleMap(true)}
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
