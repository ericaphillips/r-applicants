// HTML representation of Applicants, used in ApplicantList
import React from "react"

export const Applicant = ({ applicant }) => (
    <section className="applicant">
        <h4 className="applicant_name">
            {applicant.firstName} {applicant.lastName}
        </h4>
        <div className="applicant_occupation">{applicant.occupation}</div>
        <div className="applicant_ssn">{applicant.ssnInfo}</div>
    </section>
)
