import { useState, useEffect } from "react"
import { fetchIt } from '../auth/fetchit.js'
import { EditForm } from "./editForm.js"
import { TicketModal } from "./ticketModal.js"
import { useNavigate } from "react-router-dom"

export const Tickets = ({project, status, dept, isLead}) =>{
    const [openTickets, setOpenTickets] = useState([])
    const [inProgressTickets, setInProgressTickets] = useState([])
    const [completedTickets, setCompletedTickets] = useState([])
    let current_user = localStorage.getItem('twine_token')
    current_user = JSON.parse(current_user)
    let isAssigned = ""
    const navigate = useNavigate()

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/tickets?project_id=${project}&unassigned`)
                .then((data) => {
                    setOpenTickets(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/tickets?project_id=${project}&assigned`)
                .then((data) => {
                    setInProgressTickets(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/tickets?project_id=${project}&completed`)
                .then((data) => {
                    setCompletedTickets(data)
                })
        },
        []
    )

    const [team, setTeam] = useState([])

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/teams?project_id=${project}`)
                .then((data) => {
                    setTeam(data)
                })
        },
        []
    )

    let teamIdArray=[]
    for(const member of team){
        teamIdArray.push(member?.employee?.employee_account[0]?.id)
    }
    teamIdArray.push(isLead)
    let isContributor = false
    if(teamIdArray.includes(current_user.id)){
     isContributor = true
    }

    const assignTicketToYourself = (ticket) => {
        let editTicket = {
                id: ticket.id,
                title: ticket.title,
                description: ticket.description,
                project: ticket?.project?.id,
                completed: false,
                assignee: current_user.id
        }

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

    const reopenCloseTicket = (ticket) => {
        let editTicket = {}
        if(ticket.completed){
            editTicket ={
                id: ticket.id,
                title: ticket.title,
                description: ticket.description,
                project: ticket?.project?.id,
                completed: false,
                assignee: ticket?.assignee?.id
            }
        } else {
            editTicket ={
                id: ticket.id,
                title: ticket.title,
                description: ticket.description,
                project: ticket?.project?.id,
                completed: true,
                assignee: ticket?.assignee?.id
            }
        }
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

    const deleteTicket = (id) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this ticket?"
        );
        if (!confirmed) return;
        fetch(`http://localhost:8000/tickets/${id}`, {
          method: "DELETE",
        }).then(() => {
          navigate(0); //refreshes the page
        });
      };
    
    const getOpenTickets = () =>{
       return openTickets.map((ticket) =>{
            return <>
            <div className='ticket' id={dept} key={ticket.id}>{
                isLead === current_user.id
                ? <div className="lead-options"><span onClick={()=>{document.getElementById(`edit--${ticket.id}`).style.display="block"}}>edit</span> <span onClick={()=>{ deleteTicket(ticket.id)}}>remove</span></div>
                : <div className="lead-options"></div>
            }
            <p className='title' onClick={()=>{
                {document.getElementById(`${ticket.id}`).style.display = "block"}
            }} >{ticket.title}</p>{
                isContributor
                ? <p className='assignee'><h5 onClick={()=>{assignTicketToYourself(ticket)}}><b>assign to yourself</b></h5></p>
                : <p/>
            }
            </div>
            < TicketModal ticket={ticket} />
            <EditForm  ticket={ticket} project_id={project}/>
            </>
        })
    }

    const getInProgressTickets = () =>{
        return inProgressTickets.map((ticket) =>{
            const assigneeAcc = ticket?.assignee?.employee_account

            return <>
            <div className='ticket' key={ticket.id} id={dept}>{
                isLead === current_user.id
                ? <div className="lead-options"><span onClick={()=>{document.getElementById(`edit--${ticket.id}`).style.display="block"}}>edit</span> <span onClick={()=>{ deleteTicket(ticket.id)}}>remove</span> <span onClick={()=>{reopenCloseTicket(ticket)}}>close</span></div>
                : <div className="lead-options"></div>
            }{
                assigneeAcc[0]?.user?.id===current_user.id
                ?  <div className="lead-options"><span onClick={()=>{reopenCloseTicket(ticket)}}>close</span></div>
                : <span></span>
        }
            <p className='title' onClick={()=>{
                {document.getElementById(`${ticket.id}`).style.display = "block"}
            }}>{ticket.title}</p>
            <div className="assignee-info"><p className='assignee'>assigned to 
            {
                    assigneeAcc[0]?.user?.id===current_user.id
                    ? <b> you!</b>
                    : <b> {assigneeAcc[0].user.first_name[0]}. {assigneeAcc[0].user.last_name}</b>
            }
            </p><img src={assigneeAcc[0].profile_pic}/>
                </div>
            </div>
            < TicketModal ticket={ticket} current_user={current_user} lead_id={isLead}/>
            < EditForm ticket={ticket} project_id={project}/>
            </>
        })
    }

    const getCompletedTickets = () =>{
        return completedTickets.map((ticket) =>{
            const assigneeAcc = ticket?.assignee?.employee_account
            
            if(assigneeAcc[0]?.user?.id===current_user.id){
                isAssigned = true
            }

            return <>
            <div className='ticket' key={ticket.id} id={dept}>{
                isLead === current_user.id
                ? <div className="lead-options"><span onClick={()=>{reopenCloseTicket(ticket)}}>reopen</span></div>
                : <div className="lead-options"></div>
            }
            <p className='title' onClick={()=>{
                {document.getElementById(`${ticket.id}`).style.display = "block"}
            }}>{ticket.title}</p>
            <div className="assignee-info"><p className='assignee'>completed by 
            {
                    assigneeAcc[0]?.user?.id===current_user.id
                    ? <b> you!</b>
                    : <b> {assigneeAcc[0].user.first_name[0]}. {assigneeAcc[0].user.last_name}</b>
            }
            </p><img src={assigneeAcc[0].profile_pic}/>
                </div>
            </div>
            < TicketModal ticket={ticket} lead_id={isLead} method={"display"} project_id={project.id}/>
            </>
        })
    }

    const verifyTickets = () =>{
        if (status === "unassigned"){
            return getOpenTickets()
        } else if (status === "assigned"){
            return getInProgressTickets()
        }
        else {
            return getCompletedTickets()
        }
    }

    return <>{
        verifyTickets()
    }
    </>
}