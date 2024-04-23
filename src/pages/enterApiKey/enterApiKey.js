import ApiKeyInput from "../../components/home/Home";
import React from "react";
import "./enterApiKey.css";
function EnterApiKey() {
    return (
        <>
            <ApiKeyInput />
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
                        <form id="config">
                            <h3>Configuration</h3>
                            <p>
                                Remember to configure the url %PUBLIC_URL% under whitelisted
                                domains in the welcome.gomeddo.com page.
                            </p>
                            <input placeholder="API Key" name="apiKey" />

                            <button type="submit">Apply config</button>
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
                <section>
                    <div>
                        <h3>Getting timeslots for a specific resource and day</h3>
                        <pre>
                            {"          "}
                            <code>import GoMeddo from '@gomeddo/sdk';</code>
                            {"\n"}
                            {"          "}
                            <code />
                            {"\n"}
                            {"          "}
                            <code>const gm = new GoMeddo(apiKey);</code>
                            {"\n"}
                            {"          "}
                            <code />
                            {"\n"}
                            {"          "}
                            <code>gm</code>
                            {"\n"}
                            {"          "}
                            <code>{"  "}.buildResourceRequest()</code>
                            {"\n"}
                            {"          "}
                            <code>{"  "}.includeAllResourcesAt(resourceId)</code>
                            {"\n"}
                            {"          "}
                            <code>{"  "}.withAvailableSlotsBetween(</code>
                            {"\n"}
                            {"          "}
                            <code>
                                {"    "}new Date('&lt;%= (new Date()).getFullYear() %&gt;-&lt;%=
                                (new Date()).getMonth()+1 %&gt;-&lt;%= (new Date()).getDate()
                                %&gt;'),
                            </code>
                            {"\n"}
                            {"          "}
                            <code>
                                {"    "}new Date('&lt;%= (new Date()).getFullYear() %&gt;-&lt;%=
                                (new Date()).getMonth()+1 %&gt;-&lt;%= (new Date()).getDate() +
                                1 %&gt;')
                            </code>
                            {"\n"}
                            {"          "}
                            <code>{"  "})</code>
                            {"\n"}
                            {"          "}
                            <code>{"  "}.getResults()</code>
                            {"\n"}
                            {"          "}
                            <code>
                                {"  "}.then((resources) =&gt; /* Do something with the resource
                                */);
                            </code>
                            {"\n"}
                            {"        "}
                        </pre>
                    </div>
                </section>
                <section>
                    <div>
                        <h3>Creating a reservation</h3>
                        <pre>
                            {"          "}
                            <code>
                                import GoMeddo, {"{"} Reservation, Lead {"}"} from
                                '@gomeddo/sdk';
                            </code>
                            {"\n"}
                            {"          "}
                            <code />
                            {"\n"}
                            {"          "}
                            <code>const gm = new GoMeddo(apiKey);</code>
                            {"\n"}
                            {"          "}
                            <code />
                            {"\n"}
                            {"          "}
                            <code>const resource = resources[0];</code>
                            {"\n"}
                            {"          "}
                            <code>const timeslots = resource.getTimeSlots();</code>
                            {"\n"}
                            {"          "}
                            <code />
                            {"\n"}
                            {"          "}
                            <code>const reservation = new Reservation();</code>
                            {"\n"}
                            {"          "}
                            <code>reservation.setResource(resource);</code>
                            {"\n"}
                            {"          "}
                            <code>
                                reservation.setStartDatetime(timeslots[0].startOfSlot);
                            </code>
                            {"\n"}
                            {"          "}
                            <code>reservation.setEndDatetime(timeslots[0].endOfSlot);</code>
                            {"\n"}
                            {"          "}
                            <code />
                            {"\n"}
                            {"          "}
                            <code>const lead = new Lead(firstName, lastName, email);</code>
                            {"\n"}
                            {"          "}
                            <code>reservation.setLead(lead);</code>
                            {"\n"}
                            {"          "}
                            <code />
                            {"\n"}
                            {"          "}
                            <code>gm</code>
                            {"\n"}
                            {"          "}
                            <code>{"  "}.saveReservation(reservation)</code>
                            {"\n"}
                            {"          "}
                            <code>
                                {"  "}.then((response) =&gt; /* Do something with the response
                                */);
                            </code>
                            {"\n"}
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
