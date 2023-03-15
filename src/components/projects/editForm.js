import { useState, useEffect } from "react"
import { fetchIt } from '../auth/fetchit.js'

export const EditForm = ({ticket, project_id}) => {
    const [editTicket, setEditTicket] = useState({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        project: project_id,
        completed: ticket.completed,
        assignee: ticket.assignee
    })
    const [team, setTeam] = useState([])

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/teams?project_id=${project_id}`)
                .then((data) => {
                    setTeam(data)
                })
        },
        []
    )

    const handleSaveButtonClick = (click) => {
        click.preventDefault()

        fetch(`http://localhost:8000/tickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editTicket)
        })
            .then(() => {
                window.location.reload()
            })
            .catch(error => console.log(error))
    }

        return (
        <>
        <div id={`edit--${ticket.id}`} className='modal'>
            <div className="modal-content">
                <span className="close"
                    onClick={()=>{
                        {document.getElementById(`edit--${ticket.id}`).style.display = "none"}
                    }}>&times;</span>
                <h1>Edit {ticket.title}</h1>
                <div className="modal-body">
                <form className="ticketForm">
                                <fieldset>
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            required autoFocus
                                            type="text"
                                            className="form-control"
                                            defaultValue={ticket.title}
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
                                                className="form-control"
                                                defaultValue={ticket.description}
                                                onChange={
                                                    (evt) => {
                                                        const copy = { ...editTicket }
                                                        copy.description = evt.target.value
                                                        setEditTicket(copy)
                                                    }
                                                } />
                                        </div>
                                    </fieldset>
                                    <div className="form-group">
                                        <select defaultValue={ticket.assignee_id}
                                            onChange={(event) => {
                                                const copy = { ...editTicket }
                                                copy.assignee = parseInt(event.target.value)
                                                setEditTicket(copy)
                                            }}
                                        >
                                            <option defaultValue="null">Assign Ticket</option>
                                            {team.map((member) => {
                                                return (
                                                    <option key={member.id} value={member?.employee?.employee_account[0]?.id}>
                                                        {member?.employee?.employee_account[0]?.user?.first_name[0]}. {member?.employee?.employee_account[0]?.user?.last_name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
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