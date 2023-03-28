import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { fetchIt } from '../auth/fetchit.js'
import { Tickets } from "./tickets.js"
import './project.css'
import { AddForm } from "./addForm.js"

export const ProjPage = () =>{
    let project_id = useParams()
        project_id = project_id.project_id
    let current_user = localStorage.getItem('twine_token')
        current_user = JSON.parse(current_user)
    const [project, setProject] = useState({})
    const [leadAcc, setLeadAccount] = useState({})
    let isLead = false

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/projects/${project_id}`)
                .then((data) => {
                    setProject(data)
                })
        },
        []
    )
    
    let lead_id = project?.lead?.id

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/employees/${lead_id}`)
                .then((data) => {
                    setLeadAccount(data)
                })
        },
        [project]
    )

    let dept = leadAcc.department
    let deptName = dept?.name.split(' ').join('-').toLowerCase()
    let cardId = deptName + "-card"

    if(leadAcc?.user?.id===current_user.id){
        isLead = true
    } else {
        isLead = false
    }

    return<>
    <div className='content-frame'>
        <div className='content-title'>
            {project.title}
        </div>
                <section className='project-box'>
                    <div id={cardId} className='ticket-container'>
                    <div className="ticket-label"><label>To-Do...</label>{
                        isLead
                        ? <h1 onClick={()=>{{document.getElementById(`add`).style.display = "block"}}}>&#43;</h1>
                        : <h1></h1>
                    }
                    <AddForm project_id={project.id}/>
                    </div>
                        <Tickets project={project_id} status={"unassigned"} dept={deptName} isLead={lead_id} />
                    </div>
                    <div id={cardId} className='ticket-container'>
                    <div className="ticket-label"><label>In-Progress..</label></div> 
                    <Tickets project={project_id} status={"assigned"} dept={deptName} isLead={lead_id}/>
                    </div>
                    <div id={cardId} className='ticket-container'>
                    <div className="ticket-label"><label>Completed</label></div>
                    <Tickets project={project_id} status={"completed"} dept={deptName} isLead={lead_id}/>
                    </div>
                </section>
    </div>
    </>
    
}