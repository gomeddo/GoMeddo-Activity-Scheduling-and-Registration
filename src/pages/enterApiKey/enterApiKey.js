import React, { useState, useEffect } from "react";
import "./enterApiKey.css";
import resources from "../../i18n/resources";
import { useTranslation } from "react-i18next";

function EnterApiKey() {
    const [apiKey, setApiKey] = useState("");
    const [showApiKey, setShowApiKey] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        // Retrieve the API key from environment variables if available
        const envApiKey = process.env.REACT_APP_API_KEY;
        if (envApiKey) {
            setApiKey(envApiKey);
        }
    }, []);

    const handleInputChange = (event) => {
        setApiKey(event.target.value);
        setErrorMessage(null); // Clear any previous errors
    };

    const toggleApiKeyVisibility = () => {
        setShowApiKey(!showApiKey);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation (replace with your validation logic)
        if (apiKey.length !== 36) {
            setErrorMessage(t(resources.message_apiKey_error));
            return;
        }

        // Ideally, you wouldn't store the API key in frontend code
        // For illustrative purposes only:
        console.log("API key entered:", apiKey);
        //add to local storage
        localStorage.setItem("goMeddoApiKey", apiKey);

        // Redirect to dashboard after successful submission
        window.location.href = "/dashboard";

        // Clear the input field after successful submission (optional)
        setApiKey("");
    };

    return (
        <div className="enter-api-key">
            <meta charSet="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>GoMeddo Activity Scheduling & Registration</title>
            <main>
                <section style={{padding: "5rem 0"}}>
                    <div>
                        <h1 style={{textAlign: "center", paddingBottom: "2rem"}}>GoMeddo Activity Scheduling & Registration Demo</h1>
                        <p style={{textAlign: "center"}}>
                            This page shows an example on how to implement the GoMeddo JS SDK into a activity scheduling and registration frontend.
                        </p>
                    </div>
                </section>
                <section style={{ padding: "3rem 0" }}>
                    <div>
                        <h2>Example: Book your gym class online</h2>
                        <div id="sales-appointment" />
                        <form onSubmit={handleSubmit} id="config">
                            <label htmlFor="apiKey" style={{ color: "white", fontSize: "1.2rem"}}>
                                Enter API Key:
                            </label>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type={showApiKey ? "text" : "password"}
                                    style={{ width: "450px", marginRight: "10px" }}
                                    id="apiKey"
                                    name="apiKey"
                                    placeholder="Enter your API key"
                                    value={apiKey}
                                    onChange={handleInputChange}
                                />
                                <button type="button" onClick={toggleApiKeyVisibility}>
                                    {showApiKey ? "Hide" : "Show"}
                                </button>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </section>
                <section style={{padding: "4rem 0"}}>
                    <div>
                        <h3>Installing the SDK</h3>
                        <h4>NPM</h4>
                        <pre>
                            {"          "}npm install @gomeddo/sdk{"\n"}
                            {"        "}
                        </pre>
                        <br></br>
                        <h4>Yarn</h4>
                        <pre>
                            {"          "}yarn add @gomeddo/sdk{"\n"}
                            {"        "}
                        </pre>
                    </div>
                </section>
            </main>
            <footer>
                <a
                    className="view-on-github"
                    href="https://github.com/gomeddo/GoMeddo-Activity-Scheduling-and-Registration"
                >
                    <img src="/github.png" alt="github" />
                    View on GitHub
                </a>
            </footer>
        </div>
    );
}

export default EnterApiKey;
