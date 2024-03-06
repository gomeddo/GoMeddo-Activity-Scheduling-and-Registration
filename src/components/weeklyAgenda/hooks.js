/*
 * This custom hook returns a function that decrements the current day by one day.
 * It updates the state using the setCurrentMonthFirstDay function passed as an argument.
 * It ensures that the new date is not before the current date to prevent going back in time.
 */
export function usePreviousDay(setCurrentMonthFirstDay) {
    return () =>
        setCurrentMonthFirstDay((state) => {
            const newDate = new Date(state);
            newDate.setDate(newDate.getDate() - 1);

            // Prevent going back past the current date
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (newDate >= currentDate) {
                return newDate;
            }

            return state;
        });
}

/*
 * This custom hook returns a function that increments the current date by one day.
 * It updates the state using the setCurrentMonthFirstDay function passed as an argument.
 */
export function useNextDay(setCurrentMonthFirstDay) {
    return () =>
        setCurrentMonthFirstDay((state) => {
            const newDate = new Date(state);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
}

/*
 * This custom hook returns a function that sets the current date to the first day of the next month.
 * It updates the state using the setCurrentMonthFirstDay function passed as an argument.
 */
export function useNextMonth(setCurrentMonthFirstDay) {
    return () =>
        setCurrentMonthFirstDay((state) => {
            const newDate = new Date(state.getFullYear(), state.getMonth() + 1, 1);
            return newDate;
        });
}

/*
 * This custom hooks returns a function that sets the current date to the first day of the previous month
 * It updates the state using the setCurrentMonthFirstDay function passed as an argument.
 * It ensures that the new date is not before the current month to prevent going back in time.
 */
export function usePreviousMonth(setCurrentMonthFirstDay) {
    return () =>
        setCurrentMonthFirstDay((state) => {
            const newDate = new Date(state);
            newDate.setMonth(newDate.getMonth() - 1);
            newDate.setDate(1);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Prevent going back past the current month
            if (
                newDate.getMonth() < today.getMonth() &&
                newDate.getFullYear() === today.getFullYear()
            ) {
                return state;
            }

            // Check if the newDate is in the current month and year
            if (
                newDate.getMonth() === today.getMonth() &&
                newDate.getFullYear() === today.getFullYear()
            ) {
                // If we are navigating back to the current month, set the date to today's date
                return today;
            } else {
                // Otherwise, just update the month
                return newDate;
            }
        });
}

/*
 * This custom hook returns a function that checks if selecting the previous day is allowed.
 * It compares the new date with the current date to determine if it's before the current date.
 */
export function useCanSelectPreviousDay(currentMonthFirstDay) {
    return () => {
        const newDate = new Date(currentMonthFirstDay);
        newDate.setDate(newDate.getDate() - 1);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        return newDate >= currentDate;
    };
}

/*
 * This custom hook returns a function that checks if selecting the previous month is allowed.
 * It compares the new date with the current month and year to determine if it's before the current month and year
 */
export function useCanSelectPreviousMonth(currentMonthFirstDay) {
    return () => {
        const newDate = new Date(currentMonthFirstDay);
        newDate.setMonth(newDate.getMonth() - 1);
        newDate.setDate(1);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return (
            newDate.getMonth() > today.getMonth() &&
            newDate.getFullYear() >= today.getFullYear()
        );
    };
}

/*
 * This custom hook returns an array of dates representing the current week.
 * It starts from the currentMonthFirstDay and generates the dates for the next 7 days.
 */
export function useCurrentWeekDate(currentMonthFirstDay) {
    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(currentMonthFirstDay);
        date.setDate(currentMonthFirstDay.getDate() + i);
        return date;
    });
}
