// List of applicants
import React, { useContext, useEffect, useState } from "react"
import { ApplicantContext } from "./ApplicantProvider"
import { Applicant } from "./Applicant"
import "./Applicant.css"

/* 
Add props as a parameter because we're passing
a property object to the applicant
*/

// Creates a list of applicants to be viewed by user
export const ApplicantList = (props) => {
    // Get applicants state variable and functions to see all and delete single applicants
    const { applicants, getApplicants, deleteApplicant } = useContext(ApplicantContext)

    /* Component is mounted to the DOM,
    React renders blank HTML first,
    then re-renders after getting applicants
    */
    useEffect(() => {
        getApplicants()
    }, [])

    return (
        <div>
            <div className="topOfPage">
            <h1>Applicants</h1>
            </div>
            {/* Iterates through the list of applicants to show the HTML representations
            from Applicant.js */}
            <div className="applicantList">
            {
                applicants.map(applicant => <Applicant key={applicant.id} applicant={applicant} props={props} />)
            }
            <button class="button--add" onClick={() => props.history.push("/createApplicant")}>
                Add new Applicant
            </button>
            </div>
        </div>
    )
}