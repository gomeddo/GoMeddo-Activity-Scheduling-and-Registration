import React, { useRef, useState } from "react";
import "./FilterWindow.css";
import IconFilter from "../icons/IconFilter";
import resources from "../../i18n/resources";
import { useTranslation } from "react-i18next";


const FilterWindow = ({ onClose }) => {
    const { t } = useTranslation();

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
            <div className="filter-window-header">{t(resources.button_filters)}</div>
            <div className="filter-window-body-container">
                <div className="filter-window-body">
                    <form>
                        <div className="filter-dropdown-container">
                            <select className="filter-dropdown filter-dropdown1">
                                <option value="Instuctors1">Instuctors1</option>
                                <option value="Instuctors2">Instuctors2</option>
                                <option value="Instuctors3">Instuctors3</option>
                            </select>
                            <select className="filter-dropdown filter-dropdown2">
                                <option value="Location1">Location1</option>
                                <option value="Location2">Location2</option>
                                <option value="Location3">Location3</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
            <div className="filter-window-footer"></div>
        </div>
    );
};

export default FilterWindow;
