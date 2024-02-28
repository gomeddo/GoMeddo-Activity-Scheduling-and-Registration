import IconFilter from '../icons/IconFilter';

function FiltersButton() {

  const handleFilters = () => {
    console.log('Filters clicked');
  };

  return (
    <div className = "filters-container">
      <button type = "button" className = "filters-button" onClick = {handleFilters}><IconFilter />Filters</button>
    </div>
  );
  
}

export default FiltersButton;
