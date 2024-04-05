<h1 align="center">Book an Activity</h1>

## High-Level Use Case
This example provides a starting point for integrating *GoMeddo's* "**activity registration**" capabilities into your website using the Javascript SDK.

An activity has a certain **capacity**, a **staff member** and a **location**. Your customers can sign up for this activity.

The example demonstrates this by allowing customers to book a gym class, while focused on gym class bookings it demonstrates the process and structure needed for a range of activity booking scenarios.

## Overview of User Interaction on the Frontend
The dashboard of the application lists various activities available to be taken on different dates. Users can additionally filter the activities using the filter option provided on the UI. Once a user selects an activity from available activities the 'Book' button will be visible on the UI if the capacity of the activity is not full. Users will be then prompted to input the contact information and make their reservation for the selected activity.

## Salesforce setup

- The activity itself is an existing **reservation** in *GoMeddo*.
- The activity types are **reservation types** in *GoMeddo* with descriptions and images attached to them.
- Visitors of the activity become contacts in Salesforce using **reservation contacts**
- Staff are the instructors
- Both locations and staff have **availability**
- The location where the activity happens is a **resource** in *GoMeddo*
- **Custom Fields Creation**: To use and display information from other objects, We must introduce custom fields within the Salesforce reservation object, such as Center_Name__c, Room_Name__c, etc. These fields are essential for getting detailed information about each activity.
- **API Key Requirement**: The application’s functionality hinges on obtaining an API key from *GoMeddo*, which is essential for accessing the SDK's features. The key is obtainable [here](https://welcome.booker25.com/configure/), where you'll also need to whitelist your domain to keep things running smoothly.

Ensure that **resources**, **resources types**, **staff** and **reservation types** are set up in Salesforce. For the booking system to accurately display available gym classes, each class must be created as a reservation within *GoMeddo*. This step is vital as the SDK relies on these existing **reservations** to present customers with real-time availability and booking options.

## Resource Types Configuration

Within Salesforce, Centres and classes are organized with a clear hierarchical structure focusing on three key aspects: **City**, **Fitness Center**, and **Room**:

- **City**: Fitness Centres are categorized by their location (e.g., Amsterdam).
- **Fitness Centre**: Within each city, specific fitness centres are identified (e.g., GymNow).
- **Room** (Intensity Levels): Rooms within each fitness centre are designated by intensity levels (e.g., Entry-Level Room).

### UI Setup

The UI is built as a React website which can be accessed by users to make reservations. The code is organized as a standard react application which communicates with the Salesforce to make reservations.

Perform the following steps to run the project in a local environment.

 - Clone the code to a local repository
 - Install necessary dependencies and packages by running `npm install`
 - Create a file with the extension `.env.local` in the root folder
 - Add the API key from *GoMeddo* in the above file as a key-value pair using key `REACT_APP_GOMEDDO_API_KEY`
 - Start the local dev server using the command `npm run start`

#### Similar use cases
- Have your students sign up for sports activities
- Have your patients sign up for group sessions