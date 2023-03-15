import { useState, useEffect } from "react"
import { fetchIt } from '../auth/fetchit.js'

export const AddForm = ({project_id}) => {
    const [editTicket, setEditTicket] = useState({
        title: "",
        description: "",
        project: 0,
        assignee: null, 
        completed: false
    })

    const handleSaveButtonClick = (click) => {
        click.preventDefault()
        console.log(editTicket)

        fetch(`http://localhost:8000/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editTicket)
        })  .then(() => {
            window.location.reload()
        })
            .catch(error => console.log(error))
    }

        return (
        <>
        <div id={`add`} className='modal'>
            <div className="modal-content">
                <span className="close"
                    onClick={()=>{
                        {document.getElementById(`add`).style.display = "none"}
                    }}>&times;</span>
                <h1>Create A New Ticket</h1>
                <div className="modal-body">
                <form className="ticketForm">
                                <fieldset>
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            required autoFocus
                                            type="text"
                                            className="form-control"
                                            defaultValue={""}
                                            onChange={
                                                (evt) => {
                                                    const copy = { ...editTicket }
                                                    copy.title = evt.target.value
                                                    setEditTicket(copy)
                                                }
                                            } />
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="description">description:</label>
                                            <textarea
                                                required autoFocus
                                                type="text"
                                                defaultValue={""}
                                                className="form-control"
                                                onChange={
                                                    (evt) => {
                                                        const copy = { ...editTicket }
                                                        copy.description = evt.target.value
                                                        copy.project = project_id
                                                        setEditTicket(copy)
                                                    }
                                                } />
                                        </div>
                                    </fieldset>

                                </fieldset>
    
                                <div className="form-group">
                                    <button className="save-ticket" onClick={handleSaveButtonClick}>Save</button>
                                </div>
                </form>
                </div>
            </div>
        </div>
    </>
        )
    }