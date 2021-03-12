import React from "react"
import { Route } from "react-router-dom"
import { Applicant } from "./components/Applicant"
import { ApplicantList } from "./components/ApplicantList"
import { ApplicantProvider } from "./components/ApplicantProvider"

export const Application = (props) => {
    return (
        <>
        <ApplicantProvider>
            <Route path="/" render={
                props => <ApplicantList {...props} />
            } />
            <Route exact path="/applicants" render={
                props => <ApplicantList {...props} />
            } />
        </ApplicantProvider>
    </>
    )
}
