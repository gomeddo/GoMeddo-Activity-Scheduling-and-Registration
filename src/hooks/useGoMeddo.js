import { useState, useEffect, useMemo } from "react";
import GoMeddo from "@gomeddo/sdk";

export default function useGoMeddo() {
    const [apiKey, setApiKey] = useState(""); // State variable to hold user-entered or localStorage API key
    const [goMeddoInstance, setGoMeddoInstance] = useState(null); // State variable to hold GoMeddo instance

    // Fetch API key from localStorage on component mount
    useEffect(() => {
        const fetchApiKeyFromLocalStorage = () => {
            try {
                const storedApiKey = localStorage.getItem("goMeddoApiKey");
                if (storedApiKey) {
                    setApiKey(storedApiKey);
                    console.log("API key fetched from localStorage:", storedApiKey);
                }
            } catch (error) {
                console.error("Error fetching API key from localStorage:", error);
            }
        };

        fetchApiKeyFromLocalStorage();
    }, []); // Empty dependency array ensures it runs only on mount

    // Create GoMeddo instance only when apiKey is available and valid
    return useMemo(() => new GoMeddo(apiKey), [apiKey]);
}
