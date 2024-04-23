// Function to map form data to HTML element attributes
function mapFormToElement(data, el, name, attribute) {
    // Get the value of the specified form field
    const value = data.get(name);

    // If the value exists
    if (value) {
        // Set the specified attribute on the HTML element
        el.setAttribute(attribute, value);
    } else {
        // If the value does not exist, remove the specified attribute from the HTML element
        el.removeAttribute(attribute);
    }
}

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Find the root element with the ID "sales-appointment"
    const root = document.querySelector("#sales-appointment");
    // If the root element is found
    if (root !== null) {
        // Add a submit event listener to the form with the ID "config"
        document.querySelector("#config").addEventListener("submit", (event) => {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Create a new FormData object from the submitted form
            const config = new FormData(event.target);
            // Log the form data to the console for debugging purposes
            console.debug(config);

            // Map form data to HTML element attributes for various fields
            mapFormToElement(config, root, "apiKey", "data-api-key");
            mapFormToElement(config, root, "environment", "data-environment");
            mapFormToElement(config, root, "resources", "data-resources");
            mapFormToElement(config, root, "timeslotLength", "data-timeslot-length");
        });
    }
});
