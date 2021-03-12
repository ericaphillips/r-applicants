// HTML representation of Applicants, used in ApplicantList
import React, { useContext } from "react"
import { ApplicantContext } from "./ApplicantProvider"

export const Applicant = ({ applicant, props }) => {
    const { removeApplicant } = useContext(ApplicantContext)

    const confirmRemoveApplicant = () => {
        const prompt = window.confirm("Are you sure you want to delete this applicant?")
        if (prompt === true) {
            removeApplicant(applicant.id)
                .then(() => { props.history.push(`/`) })
        }
    }

    return (
    <section className="applicant">
        <h4 className="applicant_name">
            {applicant.firstName} {applicant.lastName}
        </h4>
        <div className="applicant_occupation">{applicant.occupation}</div>
        <div className="applicant_ssn">{applicant.ssnInfo}</div>
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
