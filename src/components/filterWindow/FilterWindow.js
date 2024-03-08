import React, { useRef, useState } from "react";
import "./FilterWindow.css";
import IconFilter from "../icons/IconFilter";

const FilterWindow = ({ onClose }) => {
    const [severityOptions, setSeverityOptions] = useState([
        { string: "Low" },
        { string: "Medium" },
        { string: "High" },
    ]);

    const [activityOptions, setActivityOptions] = useState([
        { string: "Hot Yoga" },
        { string: "BodyStep" },
        { string: "BodyBalance" },
        { string: "Pilates" },
        { string: "Zumba" },
    ]);

    const handleApplyFilters = () => {
        onClose();
    };

    const handleResetFilters = () => { };

    return (
        <div className="filter-window-container">
            <div className="filter-window-header"></div>
            <div className="filter-window-body-container">
                <div className="filter-window-body"></div>
            </div>
            <div className="filter-window-footer"></div>
        </div>
    );
};

export default FilterWindow;
