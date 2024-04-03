import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMapView } from "../providers/MapViewContext";
import Logo from "../assets/GoMeddoLogo.png";
import IconMapFill from "../components/icons/IconMapFill";
import IconCalendar from "../components/icons/IconCalendar";
import "./Layout.css";
import IconEnglish from "../components/icons/IconEnglish";
import IconGerman from "../components/icons/IconGerman";
import { useTranslation } from "react-i18next";
import IconDutch from "../components/icons/IconDutch";

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
                    <div className="toggle-container">
                        <span
                            className={
                                i18n.language === "en" ? "toggle-active" : "toggle-inactive"
                            }
                            onClick={() => i18n.changeLanguage("en")}
                        >
                            <IconEnglish />
                        </span>
                        <span
                            className={
                                i18n.language === "de" ? "toggle-active" : "toggle-inactive"
                            }
                            onClick={() => i18n.changeLanguage("de")}
                        >
                            <IconGerman />
                        </span>
                        <span
                            className={
                                i18n.language === "nl" ? "toggle-active" : "toggle-inactive"
                            }
                            onClick={() => i18n.changeLanguage("nl")}
                        >
                            <IconDutch />
                        </span>
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
                            style={{ padding: "2px" }}
                        >
                            <IconCalendar />
                        </span>
                        <span
                            className={isMapView ? "toggle-active" : "toggle-inactive"}
                            onClick={() => handleToggleMap(true)}
                            style={{ padding: "2px" }}
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