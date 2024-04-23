import React, { useState } from "react";
import "./enterApiKey.css";
function EnterApiKey() {
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

        // Redirect to dashboard after successful submission
        window.location.href = "/dashboard";

        // Clear the input field after successful submission (optional)
        setApiKey("");
    };
    return (
        <>
            <meta charSet="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta
                name="description"
                content="Web site created using create-react-app"
            />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            {/* <title>GoMeddo Booking Demo</title> */}
            {/* <header>
        <div>
          <object data="%PUBLIC_URL%/gomeddo.svg" type="image/svg+xml" />
          <h2>JS SDK Example</h2>
        </div>
        <a
          className="view-on-github"
          href="https://github.com/gomeddo/GoMeddo-Booking-Demo"
        >
          <img src="%PUBLIC_URL%/github.png" alt="github" />
          View on GitHub
        </a>
      </header> */}
            <main>
                <section>
                    <div>
                        <h1>GoMeddo Booking Demo</h1>
                        <p>
                            This page shows an example on how to implement the GoMeddo JS SDK
                        </p>
                    </div>
                </section>
                <section>
                    <div>
                        <h2>Example: Book your demo online</h2>
                        <div id="sales-appointment" />
                        <form onSubmit={handleSubmit} id="config">
                            <label htmlFor="apiKey">Enter API Key:</label>
                            <input
                                type="text"
                                id="apiKey"
                                name="apiKey"
                                placeholder="Enter your API key"
                                value={apiKey}
                                onChange={handleInputChange}
                            />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </section>
                <section>
                    <div>
                        <h3>Installing the SDK</h3>
                        <h4>NPM</h4>
                        <pre>
                            {"          "}npm install @gomeddo/sdk{"\n"}
                            {"        "}
                        </pre>
                        <h4>Yarn</h4>
                        <pre>
                            {"          "}yarn add @gomeddo/sdk{"\n"}
                            {"        "}
                        </pre>
                    </div>
                </section>
            </main>
            <footer></footer>
        </>
    );
}

export default EnterApiKey;