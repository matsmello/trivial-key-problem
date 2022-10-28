# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

First, an epic will be created to group all tickets.
There will be 3 primary tickets, backend, frontend, and QA.
These are my assumptions:
    The public id will be a field to be shown to the user
    It will be a single field, not repeated, and can be changed after some validations
    The Facilities that will be responsible for customizing these values
    It doesn't need to be scalable as the use case is extremely restricted
    Any UTF-8 character combination is accepted
    It is necessary to limit to a minimum of 4 characters
    We have designs
    The endpoint is already secure and only accepts requests from authorized people

Backend
    Database Modeling
        It will required to generate a migration to add this new field to the model table
    Accept new field in the endpoint
        Normally the endpoint has safe parameters it means that it will require a new field after this change
    Add a new field in the reports
        The fields that are generated by the reports will need to be updated
frontend
    Add a new input field to accept the public id
        In the current platform, it is necessary to add a new field, which will receive the public id
    Send this parameter to the backend via Patch request
        Since the Agent model will be updated, we need to make a request to update this field
    Render the error messages
        It is necessary to map the errors coming from the server
        It is necessary to control requests per second so that the user does not abuse the endpoint
QA Test
    Test the happy flow
    Test edge cases like numbers + characters + not UTF-8 characters, empty strings...
    Test responsiveness of the front end