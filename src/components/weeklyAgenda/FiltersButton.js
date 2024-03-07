import { useTranslation } from "react-i18next";
import IconFilter from "../icons/IconFilter";
import resources from "../../i18n/resources";

function FiltersButton() {
  const { t } = useTranslation();
  const handleFilters = () => {
    console.log("Filters clicked");
  };

  return (
    <div className="filters-container">
      <button type="button" className="filters-button" onClick={handleFilters}>
        <IconFilter />
        {t(resources.button_filters)}
      </button>
    </div>
  );
}

export default FiltersButton;