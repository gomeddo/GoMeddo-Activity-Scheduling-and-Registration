import React, { useState } from "react";

function ApiKeyInput() {
    const [apiKey, setApiKey] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (event) => {
        setApiKey(event.target.value);
        setErrorMessage(null); // Clear any previous errors
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation (replace with your validation logic)
        if (apiKey.length !== 36) {
            setErrorMessage("Invalid API key format. Please check and try again.");
            return;
        }

        // Ideally, you wouldn't store the API key in frontend code
        // For illustrative purposes only:
        console.log("API key entered:", apiKey);
        //add to local storage
        localStorage.setItem("goMeddoApiKey", apiKey);

        // Make API calls using the apiKey here (if applicable)
        // ...

        // Clear the input field after successful submission (optional)
        setApiKey("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="apiKey">Enter API Key:</label>
            <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={handleInputChange}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Submit</button>
        </form>
    );
}

export default ApiKeyInput;
