/* Creates a Form to input information about an applicant, either for
adding a new one of updating an existing one
*/
import React, {useContext, useEffect, useState } from "react"   
import { ApplicantContext } from "./ApplicantProvider"


export const ApplicantForm = (props) => {
    //context provider for data
    const { createApplicant, updateApplicant, getApplicants, applicants } = useContext(ApplicantContext)

    //component state
    const [applicant, setApplicant] = useState({})

    /* checks for URL parameter to see if the applicant exists
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

   //get applicants on initialization
   useEffect (() => {
       getApplicants()
   }, [])

   
   //Once the provider is updated, see if comedian is to be edited
   useEffect (() => {
       getApplicantToEdit()
   }, [applicants])

   //differentiates use of change or add comedian based on if toEdit is true
   const addNewApplicant = () => {
       if (toEdit) {
           updateApplicant({
               id: applicant.id,
               firstName: applicant.firstName,
               lastName: applicant.lastName,
               occupation: applicant.occupation,
               ssnInfo: applicant.ssnInfo
           })
           .then(() => props.history.push("/"))
       }
       else{
           createApplicant({
                firstName: applicant.firstName,
                lastName: applicant.lastName,
                occupation: applicant.occupation,
                ssnInfo: applicant.ssnInfo
           })
           .then(() => props.history.push("/"))
       }
   }

   //form renders differently depending on if it is edit or add
   return (
       <form className="applicantForm">
           <h2 className="applicantForm__title">{toEdit ? "Edit Applicant's Details" : "Add Applicant"}</h2>
            
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
                    />
                </div>

                <div className="form-section">
                    <label htmlFor="ssnInfo">Applicant's SSN Information: </label>
                    <input type="text" name="ssnInfo" required autoFocus className="form-control"
                    placeholder="Applicant's SSN"
                    value={applicant.ssnInfo}
                    onChange={handleApplicantEdit}
                    />
                </div>
            
            <button type="submit"
            onClick={event => {
                event.preventDefault()
                addNewApplicant()
            }}
            className="button--save">
                {toEdit ? "Save Changes" : "Add Applicant"}
            </button>

            <button class="button--cancel" onClick={() => props.history.push("/")}>
                Cancel
            </button>
       </form>
   )
}