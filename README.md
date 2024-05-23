<h1 align="center">Book an Activity</h1>

<p align="center">
  <img src="./src/assets/Dashboard.png" alt="Dashboard" width="650" height="367">
</p>

# Get started with the GoMeddo JS SDK
This project uses the [GoMeddo JS SDK](https://github.com/gomeddo/js-sdk) to implement an application that lets a user register for a gym class via [GoMeddo](https://gomeddo.com).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fgomeddo%2FGoMeddo-Activity-Scheduling-and-Registration&showOptionalTeamCreation=false)

## Demo

You can find a demo <a href="https://gomeddo-activity-scheduling-and-registration.vercel.app/home" target="_blank">here</a>.

## High-Level Use Case
This example provides a starting point for integrating *GoMeddo's* "**activity registration**" capabilities into your website using the Javascript SDK.

An activity has a certain **capacity**, a **staff member** and a **location**. Your customers can sign up for this activity.

The example demonstrates this by allowing customers to book a gym class, while focused on gym class bookings it demonstrates the process and structure needed for a range of activity booking scenarios.

## Overview of User Interaction on the Frontend
The dashboard of the application lists various activities available which is filtered based on dates and time. Users can additionally filter the activities using the filter option provided on the UI. Once a user selects an activity from available activities the 'Book' button will be visible on the UI if the capacity of the activity is not full. Users will be then prompted to input the contact information and make their reservation for the selected activity.

## GoMeddo setup

- The activity itself is an existing **reservation** in *GoMeddo*.
- The activity types are **reservation types** in *GoMeddo* with descriptions and images attached to them.
- Visitors of the activity become contacts in Salesforce using **reservation contacts**.
- Staff are the instructors.
- Both locations and staff have **availability**.
- The location where the activity happens is a **resource** in *GoMeddo* with a specific **resource type**
  - **City**: Fitness Centres are categorized by their location (e.g., Amsterdam).
  - **Fitness Centre**: Within each city, specific fitness centres are identified (e.g., GymNow).
  - **Room** (Intensity Levels): Rooms within each fitness centre are designated by intensity levels (e.g., Entry-Level Room).
- **Custom Fields Creation**: To use and display information from other objects, We must introduce custom fields within the Salesforce reservation object, such as Center_Name__c, Room_Name__c, etc. These fields are essential for getting detailed information about each activity.
- **Resource Details Setting:** Ensure that each resource in GoMeddo is marked as '**_isActive_**' and '**_Api Visible_**' to be displayed and available through the API.

Ensure that **resources**, **resources types**, **staff** and **reservation types** are set up in Salesforce. For the booking system to accurately display available gym classes, each class must be created as a reservation within *GoMeddo*. This step is vital as the SDK relies on these existing **reservations** to present customers with real-time availability and booking options.

## API Key Requirement

To access to the SDK’s functionalities, an API key from *GoMeddo* is required. For instructions on obtaining this key refer to [First time Set-up](https://gomeddo.atlassian.net/wiki/spaces/WID/pages/3353837569/First+time+Set-up). Remember to **whitelist** your domain as a part of the setup process and grant **privileged** access to the API key.

### UI Setup

The UI is built as a React website which can be accessed by users to make reservations. The code is organized as a standard react application which communicates with the GoMeddo to make reservations.

Perform the following steps to run the project in a local environment.

 - Clone the code to a local repository
 - Install necessary dependencies and packages by running `npm install`
 - Create a file with the extension `.env.local` in the root folder
 - Start the local dev server using the command `npm run start`

#### Link to Github and Wiki
For further information on utilizing the GoMeddo Javascript SDK, visit [GoMeddo JS SDK wiki](https://github.com/GoMeddo/js-sdk/wiki).

#### Similar use cases
- Have your students sign up for sports activities
- Have your patients sign up for group sessions
- Have your student sign up for coding bootcamps.
- Have your educators enrolled in professional development seminars.
- Have your healthcare professionals enrolled in continuing education courses.
- Have your students volunteer for peer mentoring programs.
