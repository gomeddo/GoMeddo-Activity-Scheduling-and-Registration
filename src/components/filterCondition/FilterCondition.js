import React from "react";
import IconPlus from "../icons/IconPlus";
import IconMinus from "../icons/IconMinus";
import "./FilterCondition.css";

function FilterCondition({ filterText, handleFilterToggle, showMinusIcon }) {
    return (
        <div className="filter-condition-container"> {/* Container for the filter condition */}
            <div
                className={showMinusIcon ? "plus-box" : "cross-box"} // Dynamically applying class based on whether showMinusIcon is true or false
                onClick={handleFilterToggle} // Event handler for toggling the filter
            >
                {showMinusIcon ? ( // Conditionally rendering IconPlus or IconMinus based on showMinusIcon
                    <IconPlus className="plus-icon" /> // Rendering IconPlus if showMinusIcon is true
                ) : (
                    <IconMinus className="cross-icon" /> // Rendering IconMinus if showMinusIcon is false
                )}
                <div>{filterText}</div> {/* Displaying the filter text */}
            </div>
        </div>
    );
}

export default FilterCondition;