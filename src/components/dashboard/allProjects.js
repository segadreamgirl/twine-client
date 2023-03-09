import { fetchIt } from '../auth/fetchit.js'
import { useState, useEffect } from 'react'
import './dashboard.css'

export const AllProjects = () => {
    let current_user = localStorage.getItem('twine_token')
        current_user = JSON.parse(current_user)
    const [projects, setProjects] = useState([])

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/projects`)
                .then((data) => {
                    setProjects(data)
                })
        },
        []
    )

    const createCard = () => {
       return projects.map(
            (project) =>{
                let dept = project?.lead?.employee_account[0]?.department?.name
                let theme = dept.replace(/\s+/g, '-').toLowerCase();
                let idName = theme+ "-card"

                return <><section id={idName} className='project-card' key={project.id}>
                    {project.title}
                    </section>
                </>
            }
        )
    }

    return <>
    <div className='content-frame'>
        <div className='content-title'>
            All Current Projects
        </div>
            <div className='content-box'>
                <section className='project-box'>
                    {
                        createCard()
                    }
                </section>
            </div>
    </div>
    </>
}