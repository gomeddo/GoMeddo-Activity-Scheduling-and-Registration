// Formats a date to a long format, including the weekday, day, and month.
export function formatLongDate(date) {
    return date?.toLocaleString("default", {
        weekday: "long", // Include the full name of the weekday (e.g., Monday).
        day: "numeric", // Include the numeric representation of the day (e.g., 1 for the 1st day of the month).
        month: "long", // Include the full name of the month (e.g., January).
    });
}

// Formats a date to a short format, including the month, day, and year.
export function formatDate(date) {
    return date?.toLocaleString("default", {
        month: "numeric",
        day: "numeric",
        year: "numeric", // Include the numeric representation of the year (e.g., 2022).
    });
}

//  Formats a date to display only the month and year.
export function formatMonth(date) {
    return date?.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });
}