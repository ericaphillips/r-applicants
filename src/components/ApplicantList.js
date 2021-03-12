// List of applicants. Renders on /applicants
import React, { useContext, useEffect, useState } from "react"
import { ApplicantContext } from "./ApplicantProvider" 
import { Applicant } from "./Applicant"

/* 
Add props as a parameter because we're passing
a property object to the applicant
*/

// Creates a list of applicants to be viewed by user
export const ApplicantList = (props) => {
    // Get applicants state variable and functinos to see all and delete single applicants
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
            <h1>Applicants</h1>
            {
                applicants.map(applicant => <Applicant key={applicant.id} applicant={applicant} props={props}/> )
            }

            <button class="button--addApplicant" onClick={() => props.history.push("/createApplicant")}>
                Add new Applicant
            </button>
        </div>
    )
}