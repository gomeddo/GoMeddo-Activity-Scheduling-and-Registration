import React, { createContext, useContext, useState } from "react";

const MapViewContext = createContext();

export function useMapView() {
    return useContext(MapViewContext);
}

export const MapViewProvider = ({ children }) => {
    const [isMapView, setIsMapView] = useState(false);

    const toggleMap = (value) => {
        setIsMapView(value);
    };

    return (
        <MapViewContext.Provider value={{ isMapView, toggleMap }}>
            {children}
        </MapViewContext.Provider>
    );
};