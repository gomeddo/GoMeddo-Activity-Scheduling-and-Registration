import React, { useRef, useState } from "react";
import "./FilterWindow.css";
import IconFilter from "../icons/IconFilter";
import IconWhiteCross from "../icons/IconWhiteCross";
import resources from "../../i18n/resources";
import { useTranslation } from "react-i18next";
import FilterCondition from "./../filterCondition/FilterCondition";

const FilterWindow = ({ onClose }) => {
  const insRef = useRef(null);
  const locRef = useRef(null);

  const [plusCrossStatusIntensity, setPlusCrossStatusIntensity] = useState([
    true,
    true,
    true,
  ]);

  const [plusCrossStatusType, setPlusCrossStatusType] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);

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

  const handleIntensityClick = (index) => {
    const newStates = [...plusCrossStatusIntensity];
    newStates[index] = !newStates[index];
    setPlusCrossStatusIntensity(newStates);
  };

  const handleTypeClick = (index) => {
    const newStates = [...plusCrossStatusType];
    newStates[index] = !newStates[index];
    setPlusCrossStatusType(newStates);
  };

  const handleApplyFilters = () => {
    onClose();
  };

  const handleExitFilter = () => {
    onClose();
  };

  const handleResetFilters = () => {
    if (insRef.current && locRef.current) {
      insRef.current.value = "Instructor1";
      locRef.current.value = "Location1";
    }
    setPlusCrossStatusIntensity([true, true, true]);
    setPlusCrossStatusType([true, true, true, true, true]);
  };

  return (
    <div className="filter-window-container">
      <div className="filter-window-header">
        {t(resources.button_filters)}
        <IconWhiteCross className="close-icon" onClick={handleExitFilter} />
      </div>
      <div className="filter-window-body-container">
        <div className="filter-window-body">
          <form>
            <div className="filter-dropdown-container">
              <select className="filter-dropdown filter-dropdown1" ref={insRef}>
                <option value="Instructor1">Instructor1</option>
                <option value="Instructor2">Instructor2</option>
                <option value="Instructor3">Instructor3</option>
              </select>
              <select className="filter-dropdown filter-dropdown2" ref={locRef}>
                <option value="Location1">Location1</option>
                <option value="Location2">Location2</option>
                <option value="Location3">Location3</option>
              </select>
            </div>
            <div className="filter-intensity">
              <p className="filter-label">{t(resources.filter_intensity)}</p>
              <div className="filter-plus-cross-container">
                {severityOptions.map((text, index) => (
                  <FilterCondition
                    key={index}
                    filterText={text.string}
                    showCrossIcon={plusCrossStatusIntensity[index]}
                    handleFilterToggle={() => handleIntensityClick(index)}
                  />
                ))}
              </div>
            </div>
            <div className="filter-class-type">
              <p className="filter-label">{t(resources.filter_type)}</p>
              <div className="filter-plus-cross-container under-plus-cross-container">
                {activityOptions.map((text, index) => (
                  <FilterCondition
                    key={index}
                    filterText={text.string}
                    showCrossIcon={plusCrossStatusType[index]}
                    handleFilterToggle={() => handleTypeClick(index)}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="filter-window-footer">
        <button
          className="footer-button button-with-icon"
          onClick={handleResetFilters}
        >
          <div className="button-container">
            <IconFilter className="filterIcon" />
            <span>{t(resources.filter_reset)}</span>
          </div>
        </button>
        <button
          className="footer-button button-without-icon"
          onClick={handleApplyFilters}
        >
          {t(resources.filter_apply)}
        </button>
      </div>
    </div>
  );
};

export default FilterWindow;
