import { createContext, useContext, useEffect, useState } from "react";
import useGoMeddo from "../hooks/useGoMeddo";

// Create a context to manage filter-related state and functions
const FilterContext = createContext({
    instructors: [],
    selectedInstructor: undefined,
    setSelectedInstructor: (id) => { },
    locations: [],
    selectedLocation: undefined,
    setSelectedLocation: (id) => { },
    classes: [],
    selectedClasses: [],
    setSelectedClasses: (id) => { },
    intensities: [],
    selectedIntensities: [],
    setSelectedIntensities: (id) => { },
});

// Custom hook to consume the filter context
export function useFilters() {
    return useContext(FilterContext);
}

// Utility function to extract distinct values from reservations
function getDistinctValues(reservationResult, field) {
    return reservationResult
        .getReservations()
        .reduce((values, reservation) => {
            const value = reservation.getCustomProperty(field);
            if (!!value && !values.includes(value)) {
                values.push(value);
            }
            return values;
        }, [])
        .sort((left, right) => left.localeCompare(right));
}

// Provider component to manage filter state and fetch data
export function FilterProvider({ children }) {
    const [instructors, setInstructors] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState(undefined);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(undefined);
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [intensities, setIntensities] = useState([]);
    const [selectedIntensities, setSelectedIntensities] = useState([]);

    const gm = useGoMeddo(); // Access the Gomeddo SDK

    useEffect(() => {
        // Fetch data from Gomeddo SDK
        const fetchData = async () => {
            try {
                const reservationResult = await gm
                    .buildReservationRequest()
                    .withStatus("Definite")
                    .includeAdditionalFields([
                        "B25__Title__c",
                        "B25__Start_Local_DateTime__c",
                        "B25__End_Local_DateTime__c",
                        "Staff_Name__c",
                        "Room_Name__c",
                        "Room_Capacity__c",
                        "B25LP__Capacity__c",
                        "City_Location__c",
                        "Center_Name__c",
                    ])
                    .getResults();

                // Extract distinct values for each filter category
                setIntensities(getDistinctValues(reservationResult, "Room_Name__c"));
                setInstructors(getDistinctValues(reservationResult, "Staff_Name__c"));
                setLocations(getDistinctValues(reservationResult, "City_Location__c"));
                setClasses(getDistinctValues(reservationResult, "B25__Title__c"));
            } catch (error) {
                // Handle error, if any
                console.error("Error fetching data:", error);
            }
        };

        // Execute fetchData function
        fetchData();
    }, [gm, setInstructors, setLocations, setClasses, setIntensities]); // Dependency array includes gm and state setters

    // Provide filter state and functions through context
    return (
        <FilterContext.Provider
            value={{
                instructors: instructors,
                selectedInstructor: selectedInstructor,
                setSelectedInstructor: setSelectedInstructor,
                locations: locations,
                selectedLocation: selectedLocation,
                setSelectedLocation: setSelectedLocation,
                classes: classes,
                selectedClasses: selectedClasses,
                setSelectedClasses: setSelectedClasses,
                intensities: intensities,
                selectedIntensities: selectedIntensities,
                setSelectedIntensities: setSelectedIntensities,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}
