# Roostify Applicants

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`
### OR
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## View it Yourself:
1. Clone this repository and cd into the directory in your terminal
```sh
git clone git@github.com:ericaphillips/r-applicants.git
cd r-applicants
```

2. Launch the database from the api:
```sh
cd api
json-server -p 8088 -w database.json
```

3. Launch the client:

```sh
    cd .. (make sure you are in the root directory r-applicants)
    npm install
    npm start
```

## The Problem:
-- Create an app, which shows up list of applicants, with data such as first name, last name, occupation, ssn information.
<br>
-- Initial data will be loaded asynchronously, from a mock json.
<br>
-- One should be able to add/ update/ remove applicant.
<br>
-- Add/ Update should take to a form based details screen, and navigate back to list dashboard on successful save/ update or cancel.
<br>
-- Remove should ask for a confirmation in a modal window, before actually removing the borrower.
<br>
Would prefer functional components, but feel free to use Class based as well, based on your familiarity.

## Workflow and Layout:
At localhost:3000/ you will see the list of applicants (src/components/ApplicantList.js and src/components/Applicant.js). You can click on links to edit applicant's details, delete the applicant which will cause a modal to pop up for confirmation, and at the bottom you can click a button to add a new applicant.
<br><br>
At localhost:3000/createApplicant you will see the form to create a new applicant to be saved to the database (src/components/ApplicantForm.js). You can complete the form and then click the submit button to save the new applicant.
<br><br>
At localhost:3000/edit/5 you will see the form to edit the applicant with an ID of 5 (src/components/ApplicantForm.js). You can update anything about the applicant and then click save changes to save the changes.
<br><br>
The mock JSON data is stored in api/database.json


