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
  } = useFilters();
  const { t } = useTranslation();

  const [instructorFilter, setInstructorFilter] = useState(selectedInstructor);
  const [locationFilter, setLocationFilter] = useState(selectedLocation);
  const [classesFilter, setClassesFilter] = useState(selectedClasses);
  const [intensitiesFilter, setIntensitiesFilter] =
    useState(selectedIntensities);

  // To set the position of the filters below the button, we need to
  // manually calculate the top/right and set the position of the container.
  const { top, right } = useMemo(() => {
    const anchor = document.getElementById("filters-button");
    if (!anchor) {
      return {
        top: undefined,
        right: undefined,
      };
    }

    const rect = anchor.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    return {
      top: rect.bottom + 8,
      right: windowWidth - rect.right,
    };
  }, []);

  const onApplyFilters = () => {
    setSelectedClasses(classesFilter);
    setSelectedInstructor(instructorFilter);
    setSelectedIntensities(intensitiesFilter);
    setSelectedLocation(locationFilter);
    onClose?.();
  };

  const onResetFilters = () => {
    setSelectedClasses([]);
    setSelectedInstructor(undefined);
    setSelectedIntensities([]);
    setSelectedLocation(undefined);
    onClose?.();
  };

  return (
    // <div className="filter-window-container">
    <div className="filter-window-container" style={{ top: top, right: right }}>
      <div className="filter-window-header">
        {t(resources.button_filters)}
        <IconWhiteCross className="close-icon" onClick={onClose} />
      </div>
      <div className="filter-window-body-container">
        <div className="filter-window-body">
          <form>
            <div className="filter-dropdown-container">
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
            </div>
            <div className="filter-intensity">
              <p className="filter-label">{t(resources.filter_intensity)}</p>
              <div className="filter-plus-cross-container">
                {intensities.map((intensity, index) => (
                  <FilterCondition
                    key={index}
                    filterText={intensity}
                    showCrossIcon={!intensitiesFilter.includes(intensity)}
                    handleFilterToggle={() => {
                      setIntensitiesFilter((state) => {
                        if (state.includes(intensity)) {
                          return state.filter((i) => i !== intensity);
                        }

                        return [...state, intensity];
                      });
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="filter-class-type">
              <p className="filter-label">{t(resources.filter_type)}</p>
              <div className="filter-plus-cross-container under-plus-cross-container">
                {classes.map((className, index) => (
                  <FilterCondition
                    key={index}
                    filterText={className}
                    showCrossIcon={!classesFilter.includes(className)}
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
        <button
          className="footer-button button-with-icon"
          onClick={onResetFilters}
        >
          <div className="button-container">
            <IconFilter className="filterIcon" />
            <span>{t(resources.filter_reset)}</span>
          </div>
        </button>
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