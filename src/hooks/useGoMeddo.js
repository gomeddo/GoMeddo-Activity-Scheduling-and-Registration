import { useState, useEffect, useMemo } from "react";
import GoMeddo from "@gomeddo/sdk";

export default function useGoMeddo() {
  const [apiKey, setApiKey] = useState(""); // State variable to hold user-entered or localStorage API key
  const [goMeddoInstance, setGoMeddoInstance] = useState(null); // State variable to hold GoMeddo instance

  // Fetch API key from localStorage on component mount
  useEffect(() => {
    const fetchApiKeyFromEnvOrLocalStorage = () => {
      try {
        const envApiKey = process.env.REACT_APP_API_KEY;

        if (envApiKey) {
          setApiKey(envApiKey);
          console.log("API key fetched from env variables");
          return;
        }

        const storedApiKey = localStorage.getItem("goMeddoApiKey");
        if (storedApiKey) {
          setApiKey(storedApiKey);
          console.log("API key fetched from localStorage");
        }
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };

    fetchApiKeyFromEnvOrLocalStorage();
  }, []); // Empty dependency array ensures it runs only on mount

  // Create GoMeddo instance only when apiKey is available and valid
  return useMemo(() => new GoMeddo(apiKey), [apiKey]);
}
