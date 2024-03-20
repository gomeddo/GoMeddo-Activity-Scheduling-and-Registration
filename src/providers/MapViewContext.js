import React, { createContext, useContext, useState } from "react";

// Create a context to manage map view state and functions
const MapViewContext = createContext();

// Custom hook to consume the map view context
export function useMapView() {
    return useContext(MapViewContext);
}

// Provider component to manage map view state
export const MapViewProvider = ({ children }) => {
    const [isMapView, setIsMapView] = useState(false);

    // Function to toggle map view
    const handleToggleMap = (value) => {
        setIsMapView(value);
    };

    // Provide map view state and function through context
    return (
        <MapViewContext.Provider value={{ isMapView, handleToggleMap }}>
            {children}
        </MapViewContext.Provider>
    );
};
