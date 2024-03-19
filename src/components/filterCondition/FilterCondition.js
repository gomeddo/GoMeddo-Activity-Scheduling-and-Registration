import React from "react";
import IconPlus from "../icons/IconPlus";
import IconCross from "../icons/IconCross";
import "./FilterCondition.css";

function FilterCondition({ filterText, handleFilterToggle, showCrossIcon }) {
    return (
        <div className="filter-condition-container"> {/* Container for the filter condition */}
            <div
                className={showCrossIcon ? "plus-box" : "cross-box"} // Dynamically applying class based on whether showCrossIcon is true or false
                onClick={handleFilterToggle} // Event handler for toggling the filter
            >
                {showCrossIcon ? ( // Conditionally rendering IconPlus or IconCross based on showCrossIcon
                    <IconPlus className="plus-icon" /> // Rendering IconPlus if showCrossIcon is true
                ) : (
                    <IconCross className="cross-icon" /> // Rendering IconCross if showCrossIcon is false
                )}
                <div>{filterText}</div> {/* Displaying the filter text */}
            </div>
        </div>
    );
}

export default FilterCondition;