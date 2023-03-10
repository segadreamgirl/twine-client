import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { fetchIt } from '../auth/fetchit.js'
import './project.css'

export const ProjPage = () =>{
    let project_id = useParams()
        project_id = project_id.project_id
    const [project, setProject] = useState({})
    const [employeeAcc, setEmployeeAccount] = useState({})

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
                    setEmployeeAccount(data)
                })
        },
        []
    )

    let dept = employeeAcc.department
    let deptName = dept?.name.split(' ').join('-').toLowerCase()
    let cardId = deptName + "-card"

    return<>
    <div className='content-frame'>
        <div className='content-title'>
            {project.title}
        </div>
                <section className='project-box'>
                    <div id={cardId} className='ticket-container'>
                        <div className='ticket' id={deptName}>
                            <p className='title'>Ticket Title</p>
                            <p className='assignee'>ticket assigned to <b>you</b></p>
                        </div>
                        <div className='ticket'></div>
                        <div className='ticket'></div>
                        <div className='ticket'></div>
                    </div>
                    <div id={cardId} className='ticket-container'>
                    <div className='ticket'></div>
                        <div className='ticket'></div>
                        <div className='ticket'></div>
                        <div className='ticket'></div>
                    </div>
                    <div id={cardId} className='ticket-container'>
                        <div className='ticket'></div>
                        <div className='ticket'></div>
                        <div className='ticket'></div>
                        <div className='ticket'></div>
                        <div className='ticket'></div>
                        <div className='ticket'></div>
                    </div>
                </section>
    </div>
    </>
    
}