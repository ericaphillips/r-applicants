import React, { useState } from "react"

/* 
This context is used by individual components
that need data about applicants. Provides 
fetch calls to create, read, update, and remove applicants
*/

// Context stores data. Export makes context available to other modules
export const ApplicantContext = React.createContext()

// Provider establishes what data can be used by other modules
// Props used to pass data from one component to another

export const ApplicantProvider = (props) => {
    // Need useState() hook to store data about components
    // Define a variable to hold the state of the component, and a function that updates it
    const [ applicants, setApplicants ] = useState([])

    // Create functions to perform state transitions in the database

    // Function with fetch call to get list of applicants
    const getApplicants = () => {
        // Request the data for all applicants
        return fetch("http://localhost:8088/applicants")
        // Convert the JSON string response to a JavaScript data structure
        .then(response => response.json())
        // Set state of applicants
        .then(setApplicants)
    }

    // Function with fetch call to create an applicant
    const createApplicant = applicant => {
        // Get current applicant data
        return fetch("http://localhost:8088/applicants", {
            // POST method needed to send data to API
            method: "POST",
            // Send request body as JSON
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(applicant)
        })
    // Update state of applicants after creation
    .then(getApplicants)
    }

    // Function with fetch call to update applicant
    const updateApplicant = applicant => {
        return fetch(`http://localhost:8088/applicants/${applicant.id}`, {
            // Use PUT method since it is idempotent
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(applicant)
        })
        .then(getApplicants)
    }

    //Function with fetch call to delete an applicant
    const removeApplicant = applicantId => {
        return fetch(`http://localhost:8088/applicants/${applicantId}`, {
        method: "DELETE"
        })
        .then(getApplicants)
    } 

    // Return statement explicitly defines which functions can be used by other modules

    /* 
    Return a context provider which has the applicants state, and the functions as keys.
    Allows any child elements to access them.
    */
    return (
        <ApplicantContext.Provider value={{
            applicants, setApplicants, getApplicants, createApplicant, updateApplicant, removeApplicant
        }}>
            {props.children}
        </ApplicantContext.Provider>
    )
}