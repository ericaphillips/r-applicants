import React from "react"
import { Route } from "react-router-dom"
import { Applicant } from "./components/Applicant"
import { ApplicantList } from "./components/ApplicantList"
import { ApplicantProvider } from "./components/ApplicantProvider"
import { ApplicantForm } from "./components/ApplicantForm"

export const Application = (props) => {
    return (
        <>
        <ApplicantProvider>
            <Route exact path="/" render={
                props => <ApplicantList {...props} />
            } />
            <Route exact path="/createApplicant" render={
                props => <ApplicantForm {...props} />
            } />
            {/* the route saves the number at the end of the URL 
            as a variable named applicantId, which is then used in ApplicantForm for Edit
            */}
            <Route path="/edit/:applicantId(\d+)" render={
                props => <ApplicantForm {...props} />
            } />
        </ApplicantProvider>
    </>
    )
}
