import { fetchIt } from '../auth/fetchit.js'
import { useState, useEffect } from 'react'
import './dashboard.css'
import { Link } from 'react-router-dom'

export const MyProjects = () => {
    let current_user = localStorage.getItem('twine_token')
        current_user = JSON.parse(current_user)
    const [contributorTo, setContributorTo] = useState([])
    const [leadOf, setLeadOf] = useState([])

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/teams?employee_id=${current_user.id}`)
                .then((data) => {
                    setContributorTo(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/projects?lead_id=${current_user.id}`)
                .then((data) => {
                    setLeadOf(data)
                })
        },
        []
    )
        let projects = []

        for(const entry of contributorTo){
            projects.push(entry.project)
        }
        for (const entry of leadOf){
            projects.push(entry)
        }

    const createCard = () => {
       return projects.map(
            (project) =>{
                let employeeAccount = project?.lead?.employee_account[0]
                let dept = employeeAccount?.department?.name
                let theme = dept.replace(/\s+/g, '-').toLowerCase();
                let cardIdName = theme+ "-card"
                let isLead = false

                if(employeeAccount?.user?.id===current_user.id){
                    isLead = true
                }

                return <><section id={cardIdName} className='project-card' key={project.id}>
                    <div id={theme} className='project-info'>
                        <h2><Link to={`/projects/${project.id}`}>{project.title}</Link></h2>
                        <div>
                            <p>Project lead by 
                            {
                                isLead 
                                ? <b> you!</b>
                                : <b> {employeeAccount?.user?.first_name[0]}. {employeeAccount?.user?.last_name}</b>
                            }
                            </p><img src={employeeAccount.profile_pic} /> 
                            </div>
                    </div>
                    </section>
                </>
            }
        )
    }

    return <>
    <div className='content-frame'>
        <div className='content-title'>
            All Of Your Projects
        </div>
                <section className='project-box'>
                    {
                        createCard()
                    }
                </section>
    </div>
    </>
}