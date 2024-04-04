import { useTranslation } from "react-i18next";
import IconFilter from "../icons/IconFilter";
import resources from "../../i18n/resources";
import FilterWindow from "../filterWindow/FilterWindow";
import React, { useState } from "react";

function FiltersButton() {
  const { t } = useTranslation();

  const [isFilterPopupOpen, setFilterPopupOpen] = useState(false); // State variable for controlling filter window visibility

  const handleFilters = () => { // Function to handle filter button click
    console.log("Filters clicked");
    setFilterPopupOpen(true); // Opening the filter window
  };

  return (
    <div className="filters-container"> {/* Container for filters button */}
      {/* Button to open filter window */}
      <button type="button" className="filters-button" onClick={handleFilters}>
        <IconFilter />
        {t(resources.button_filters)}
      </button>
      {/* Render the filter window if isFilterPopupOpen is true */}
      {isFilterPopupOpen && (
        <FilterWindow
          className="filters-window-container"
          onClose={() => setFilterPopupOpen(false)}
        >
          {/* Dropdown or other content */}
        </FilterWindow>
      )}
    </div>
  );
}

export default FiltersButton;
