import React, { useMemo, useState } from "react";
import { useFilters } from "../../providers/FilterContext";
import "./FilterWindow.css";
import IconFilter from "../icons/IconFilter";
import IconWhiteCross from "../icons/IconWhiteCross";
import resources from "../../i18n/resources";
import { useTranslation } from "react-i18next";
import FilterCondition from "./../filterCondition/FilterCondition";

const FilterWindow = ({ onClose }) => {
  const {
    instructors,
    selectedInstructor,
    setSelectedInstructor,
    locations,
    selectedLocation,
    setSelectedLocation,
    classes,
    selectedClasses,
    setSelectedClasses,
    intensities,
    selectedIntensities,
    setSelectedIntensities,
  } = useFilters(); // Extracting filter data and setter functions using custom hook
  const { t } = useTranslation(); // Hook for using translation functionality

  // Initializing state variables for filters
  const [instructorFilter, setInstructorFilter] = useState(selectedInstructor);
  const [locationFilter, setLocationFilter] = useState(selectedLocation);
  const [classesFilter, setClassesFilter] = useState(selectedClasses);
  const [intensitiesFilter, setIntensitiesFilter] = useState(selectedIntensities);

  // To set the position of the filters below the button, we need to
  // manually calculate the top/right and set the position of the container.
  const position = useMemo(() => {
    const anchor = document.getElementsByClassName("filters-container")[0]; // Getting the button element by ID
    if (!anchor) { // If button element doesn't exist, return default values
      return {
        top: undefined,
        right: undefined,
      };
    }

    const rect = anchor.getBoundingClientRect(); // Getting the position and dimensions of the button
    const windowWidth = window.innerWidth; // Getting the width of the window

    return {
      top: rect.bottom, // Setting the top position below the button
      right: windowWidth - rect.right, // Setting the right position
    };
  }, []);

  // Function to apply selected filters
  const onApplyFilters = () => {
    setSelectedClasses(classesFilter);
    setSelectedInstructor(instructorFilter);
    setSelectedIntensities(intensitiesFilter);
    setSelectedLocation(locationFilter);
    onClose?.(); // Closing the filter window
  };

  // Function to reset filters
  const onResetFilters = () => {
    setSelectedClasses([]);
    setSelectedInstructor(undefined);
    setSelectedIntensities([]);
    setSelectedLocation(undefined);
    onClose?.(); // Closing the filter window
  };

  return (
    <div className="filter-window-container" style={position}> {/* Container for the filter window with dynamic positioning */}
      <div className="filter-window-header">
        {t(resources.button_filters)}
        <IconWhiteCross className="close-icon" onClick={onClose} /> {/* Close icon */}
      </div>
      <div className="filter-window-body-container">
        <div className="filter-window-body">
          <form>
            <div className="filter-dropdown-container">
              {/* Dropdown for selecting instructors */}
              <select
                className="filter-dropdown filter-dropdown1"
                value={instructorFilter ?? -1}
                onChange={(e) => {
                  const value = e.target.value;
                  setInstructorFilter(
                    typeof value === "string" ? value : undefined
                  );
                }}
              >
                <option value={-1}>{t(resources.label_instructor_selection)}</option>
                {instructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
              {/* Dropdown for selecting locations */}
              <select
                className="filter-dropdown filter-dropdown2"
                value={locationFilter ?? -1}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocationFilter(
                    typeof value === "string" ? value : undefined
                  );
                }}
              >
                <option value={-1}>{t(resources.label_location_selection)}</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {/* Dropdown for intensity */}
              <select
                className="filter-dropdown filter-dropdown2"
                value={intensitiesFilter[0] ?? -1}
                onChange={(e) => {
                  const value = e.target.value;
                  setIntensitiesFilter(
                    typeof value === "string" ? [value] : undefined
                  );
                }}
              >
                <option value={-1}>{t(resources.filter_intensity)}</option>
                {intensities.map((intensity) => (
                  <option key={intensity} value={intensity}>
                    {intensity}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-class-type">
              {/* Filter conditions for class types */}
              <p className="filter-label">{t(resources.filter_type)}</p>
              <div className="filter-plus-cross-container under-plus-cross-container">
                {classes.map((className, index) => (
                  <FilterCondition
                    key={index}
                    filterText={className}
                    showMinusIcon={!classesFilter.includes(className)}
                    handleFilterToggle={() => {
                      setClassesFilter((state) => {
                        if (state.includes(className)) {
                          return state.filter((c) => c !== className);
                        }

                        return [...state, className];
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="filter-window-footer">
        {/* Button to reset filters */}
        <button
          className="footer-button button-with-icon"
          onClick={onResetFilters}
        >
          <div className="button-container">
            <IconFilter className="filterIcon" /> {/* Icon for filter */}
            <span>{t(resources.filter_reset)}</span>
          </div>
        </button>
        {/* Button to apply filters */}
        <button
          className="footer-button button-without-icon"
          onClick={onApplyFilters}
        >
          {t(resources.filter_apply)}
        </button>
      </div>
    </div>
  );
};

export default FilterWindow;