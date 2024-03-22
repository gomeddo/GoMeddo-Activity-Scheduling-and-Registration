import { useEffect, useState } from "react";
import { useFilters } from "../../providers/FilterContext";
import useGoMeddo from "../../hooks/useGoMeddo";
import resources from "../../i18n/resources";
import { useTranslation } from "react-i18next";
import { AndCondition, Condition, Operator } from "@gomeddo/sdk";

export function useReservations(date) {
    // State variables to manage loading, error, and reservations
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [reservations, setReservations] = useState([]);
    const gm = useGoMeddo();

    const {
        selectedClasses,
        selectedInstructor,
        selectedLocation,
        selectedIntensities,
    } = useFilters();

    useEffect(() => {
        // Function to fetch reservations
        const fetchData = async () => {
            setLoading(true); // Set loading state to true

            try {
                //Temporary workaround to filtering by dates as the locale doesn't seem to work even
                //thought the SDK implies local time...
                const startOfDay = new Date(date);
                startOfDay.setHours(0);
                startOfDay.setMinutes(0);
                startOfDay.setSeconds(0);
                startOfDay.setMilliseconds(0);

                const previousDay = new Date(startOfDay);
                previousDay.setDate(previousDay.getDate() - 1);

                const nextDay = new Date(startOfDay);
                nextDay.setDate(nextDay.getDate() + 2);

                // Assuming buildReservationRequest and withStatus methods exist and work as expected
                let request = gm
                    .buildReservationRequest()
                    .withStatus("Definite")
                    .withStartDatetimeBefore(nextDay)
                    .withEndDatetimeAfter(previousDay)
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
                    ]);

                const conditions = [];

                if (!!selectedInstructor) {
                    conditions.push(
                        new Condition("Staff_Name__c", Operator.EQUAL, selectedInstructor)
                    );
                }

                if (!!selectedLocation) {
                    conditions.push(
                        new Condition("City_Location__c", Operator.EQUAL, selectedLocation)
                    );
                }

                if (!!selectedClasses && !!selectedClasses.length) {
                    conditions.push(
                        new Condition("B25__Title__c", Operator.IN, selectedClasses)
                    );
                }

                if (!!selectedIntensities && !!selectedIntensities.length) {
                    conditions.push(
                        new Condition("Room_Name__c", Operator.IN, selectedIntensities)
                    );
                }

                if (!!conditions.length) {
                    request = request.withCondition(new AndCondition(conditions));
                }

                const reservationResult = await request.getResults();

                // Filter reservations manually by selectedDate here
                const filteredReservations = reservationResult
                    .getReservations()
                    .filter((reservation) => {
                        const startDate = new Date(
                            reservation.customProperties.get("B25__Start_Local_DateTime__c")
                        );
                        return startDate.toDateString() === date.toDateString();
                    });

                // Set reservations and clear error on successful fetch
                setReservations(filteredReservations);
                setError(undefined);
            } catch {
                setError(error);
                setReservations([]);
            } finally {
                setLoading(false); // Set loading state to false regardless of success or failure
            }
        };

        fetchData();
    }, [
        date,
        selectedClasses,
        selectedInstructor,
        selectedIntensities,
        selectedLocation,
        gm,
        setLoading,
        setError,
        setReservations,
    ]);

    return { loading: loading, error: error, reservations: reservations };
}

// Custom hook to organize reservations into agenda items
export function useAgendaItems(reservations) {
    const { t } = useTranslation();
    // Function to categorize reservations by time of day
    const categorizeByTimeOfDay = (reservation) => {
        const startTime = new Date(
            reservation.customProperties.get("B25__Start_Local_DateTime__c")
        ).getHours();
        if (startTime >= 6 && startTime < 12) return t(resources.label_morning);
        if (startTime >= 12 && startTime < 18) return t(resources.label_afternoon);
        if (startTime >= 18 && startTime <= 23) return t(resources.label_evening);
        return "Other";
    };

    // Function to format instructor's name
    const formatName = (name) => {
        const [firstName, lastName] = name.split(" ");
        return `${firstName} ${lastName[0]}.`;
    };

    // Organize reservations into sections based on time of day
    const sections = reservations.reduce((acc, reservation) => {
        const timeOfDay = categorizeByTimeOfDay(reservation);
        if (!acc[timeOfDay]) {
            acc[timeOfDay] = {
                header: `${timeOfDay} - ${timeOfDay === t(resources.label_morning)
                    ? "6:00am to 12:00pm"
                    : timeOfDay === t(resources.label_afternoon)
                        ? "12:00pm to 6:00pm"
                        : "6:00pm to 9:00pm"
                    }`,
                items: [],
            };
        }
        // Add reservation details to the corresponding time slot
        acc[timeOfDay].items.push({
            id: reservation.id,
            name: reservation.customProperties.get("B25__Title__c"),
            room: reservation.customProperties.get("Room_Name__c"),
            instructor: formatName(reservation.customProperties.get("Staff_Name__c")),
            time: `${new Date(
                reservation.customProperties.get("B25__Start_Local_DateTime__c")
            ).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            })} - ${new Date(
                reservation.customProperties.get("B25__End_Local_DateTime__c")
            ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
            attendees: reservation.customProperties.get("Room_Capacity__c"),
            location: reservation.customProperties.get("City_Location__c"),
            center: reservation.customProperties.get("Center_Name__c"),
            spaces: reservation.customProperties.get("B25LP__Capacity__c"),
            start: new Date(reservation.customProperties.get("B25__Start_Local_DateTime__c")),
        });
        return acc;
    }, {});

    // Sort reservations within each section based on start time
    Object.values(sections).forEach(section => {
        section.items.sort((a, b) => a.start - b.start);
    });

    // Return sections in the desired order
    return [t(resources.label_morning), t(resources.label_afternoon), t(resources.label_evening)]
        .map((timeOfDay) => sections[timeOfDay])
        .filter(Boolean);
}