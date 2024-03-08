import { useTranslation } from "react-i18next";
import IconFilter from "../icons/IconFilter";
import resources from "../../i18n/resources";
import FilterWindow from "../filterWindow/FilterWindow";
import React, { useState } from "react";

function FiltersButton() {
  const { t } = useTranslation();

  const [ isFilterPopupOpen, setFilterPopupOpen ] = useState(false);

  const handleClosePopup = () => {
    setFilterPopupOpen(false);
  }

  const handleFilters = () => {
    console.log("Filters clicked");
    setFilterPopupOpen(true);
  };

  return (
    <div className="filters-container">
      <button type="button" className="filters-button" onClick={handleFilters}>
        <IconFilter />
        {t(resources.button_filters)}
      </button>
      {isFilterPopupOpen && (
        <FilterWindow className="filters-window-container" onClose={() => setFilterPopupOpen(false)}>
          {/* Dropdown */}
        </FilterWindow>
      )}
    </div>
  );
}

export default FiltersButton;