/* Creates a Form to input information about an applicant, either for
adding a new one of updating an existing one
*/
import React, { useContext, useEffect, useState } from "react"
import { ApplicantContext } from "./ApplicantProvider"


export const ApplicantForm = (props) => {
    // Get applicants state variable and functions to see all, create, and update single applicants
    const { createApplicant, updateApplicant, getApplicants, applicants } = useContext(ApplicantContext)

    // Component state
    const [applicant, setApplicant] = useState({})

    /* Checks for URL parameter to see if the applicant exists
    to differentiate between editing and adding new
    */
    const toEdit = props.match.params.hasOwnProperty("applicantId")

    /* When changing a state object or array, create a
    new one and change state instead of modifying current
    */
    const handleApplicantEdit = (event) => {
        const newApplicant = Object.assign({}, applicant)
        newApplicant[event.target.name] = event.target.value
        setApplicant(newApplicant)
    }

    /* If there an applicantId in the URL, the user wants
    to edit an applicant
    First, get the value of the applicantId
    Second, use Id to find applicant
    Then, update the component state variable
    */
    const getApplicantToEdit = () => {
        if (toEdit) {
            const applicantId = parseInt(props.match.params.applicantId)
            const selectedApplicant = applicants.find(applicant => applicant.id === applicantId) || {}
            setApplicant(selectedApplicant)
        }
    }

    // Get applicants on initialization
    useEffect(() => {
        getApplicants()
    }, [])


    // Once the provider is updated, see if applicant is to be edited
    useEffect(() => {
        getApplicantToEdit()
    }, [applicants])

    // Differentiates use of update or create applicant based on if toEdit is true
    const addNewApplicant = () => {
        if (toEdit) {
            updateApplicant({
                // Need to get id to update an applicant, cannot to create one
                id: applicant.id,
                firstName: applicant.firstName,
                lastName: applicant.lastName,
                occupation: applicant.occupation,
                ssnInfo: applicant.ssnInfo
            })
                .then(() => props.history.push("/"))
        }
        else {
            createApplicant({
                firstName: applicant.firstName,
                lastName: applicant.lastName,
                occupation: applicant.occupation,
                ssnInfo: applicant.ssnInfo
            })
                .then(() => props.history.push("/"))
        }
    }

    return (
        <form className="applicantForm">
            {/* Form renders differently depending on if it is edit or add */}
            <h2 className="applicantForm__title">{toEdit ? "Edit Applicant's Details" : "Add Applicant"}</h2>
            <form>
                <div className="form-section">
                    <label htmlFor="firstName">Applicant's First Name: </label>
                    <input type="text" name="firstName" required autoFocus className="form-control"
                        placeholder="Applicant's first name"
                        value={applicant.firstName}
                        onChange={handleApplicantEdit}
                    />
                </div>

                <div className="form-section">
                    <label htmlFor="lastName">Applicant's Last Name: </label>
                    <input type="text" name="lastName" required autoFocus className="form-control"
                        placeholder="Applicant's last name"
                        value={applicant.lastName}
                        onChange={handleApplicantEdit}
                    />
                </div>

                <div className="form-section">
                    <label htmlFor="occupation">Applicant's Occupation: </label>
                    <input type="text" name="occupation" required autoFocus className="form-control"
                        placeholder="Applicant's occupation"
                        value={applicant.occupation}
                        onChange={handleApplicantEdit}
                        required
                    />
                </div>

                <div className="form-section">
                    <label htmlFor="ssnInfo">Applicant's SSN Information: </label>
                    <input type="number" min="1" required name="ssnInfo" required autoFocus className="form-control"
                        placeholder="Applicant's SSN"
                        value={applicant.ssnInfo}
                        onChange={handleApplicantEdit}
                    />
                </div>

            </form>

            <button type="submit"
                onClick={event => {
                    event.preventDefault()
                    addNewApplicant()
                }}
                className="button--save">
                {/* Submit button renders differently depending on if it is edit or add */}
                {toEdit ? "Save Changes" : "Add Applicant"}
            </button>

            {/* Cancel button if user does not want to edit or add an applicant */}
            <button class="button--cancel" onClick={() => props.history.push("/")}>
                Cancel
            </button>
        </form>
    )
}