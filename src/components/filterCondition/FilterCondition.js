import React from "react";
import IconPlus from "../icons/IconPlus";
import IconCross from "../icons/IconCross";
import "./FilterCondition.css";

function FilterCondition({ filterText, handleFilterToggle, showCrossIcon }) {
    return (
        <div className="filter-condition-container">
            <div
                className={showCrossIcon ? "plus-box" : "cross-box"}
                onClick={handleFilterToggle}
            >
                {showCrossIcon ? (
                    <IconPlus className="plus-icon" />
                ) : (
                    <IconCross className="cross-icon" />
                )}
                <div>{filterText}</div>
            </div>
        </div>
    );
}

export default FilterCondition;
