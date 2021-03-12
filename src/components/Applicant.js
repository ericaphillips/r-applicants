// HTML representation of Applicants, used in ApplicantList
import React, { useContext } from "react"
import { ApplicantContext } from "./ApplicantProvider"

export const Applicant = ({ applicant, props }) => {
    // Get function to delete single applicant from the context
    const { removeApplicant } = useContext(ApplicantContext)

    // Create modal to confirm desire to remove an applicant from the database
    const confirmRemoveApplicant = () => {
        const prompt = window.confirm("Are you sure you want to delete this applicant?")
        if (prompt === true) {
            removeApplicant(applicant.id)
                .then(() => { props.history.push(`/`) })
        }
    }

    /* Return the HTML representation of each applicant 
    and buttons to edit and delete the applicant
    */
    return (
        <section className="applicant">
            <h4 className="applicant_name">
                {applicant.firstName} {applicant.lastName}
            </h4>
            <div className="applicant_occupation">{applicant.occupation}</div>
            <div className="applicant_ssn">{applicant.ssnInfo}</div>
            {/* Edit button changes url to edit/applicant's id */}
            <button class="button--edit" onClick={() => {
                props.history.push(`/edit/${applicant.id}`)
            }}>Edit Applicant's Details</button>
            <button className="button--delete" onClick={() => {
                confirmRemoveApplicant()
            }}>
                Delete Applicant
                </button>
        </section>
    )
}
