import { useState, useEffect } from "react"
import { fetchIt } from "../auth/fetchit"
import './sidebar.css'

export const SideBar = () => {
    let current_user = localStorage.getItem('twine_token')
        current_user = JSON.parse(current_user)
    const [employeeAcc, setEmployeeAccount] = useState({})
    useEffect(
        () => {
            fetchIt(`http://localhost:8000/employees/${current_user.id}`)
                .then((data) => {
                    setEmployeeAccount(data)
                })
        },
        []
    )

    let dept = employeeAcc.department
    let deptName = dept?.name.split(' ').join('-').toLowerCase()
    
    //this stores the employee's department in a local variable. this is so it can be formatted to match the Ids created for each department's navigation theme in the CSS.

    return <>
    <div className="sidebar">
        <section id={deptName}>
            <img src={employeeAcc.profile_pic}></img>
            <span>Good morning, <b>Hazel</b></span>
        </section>
        <div><button>All Projects</button>
        </div>
        <div><button>My Projects</button>
        </div>
        <div><button> Inbox </button>
        </div>
        <div><button>Logout</button>
        </div>
    </div>
    </>
}