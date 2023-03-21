import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchIt } from "../auth/fetchit"
import './sidebar.css'

export const SideBar = () => {
    let current_user = localStorage.getItem('twine_token')
        current_user = JSON.parse(current_user)
    const [employeeAcc, setEmployeeAccount] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/employees/${current_user.id}`)
                .then((data) => {
                    setEmployeeAccount(data)
                })
        },
        []
    )
    //this stores the employee's department in a local variable. this is so it can be formatted to match the Ids created for each department's navigation theme in the CSS.
    let dept = employeeAcc.department
    let deptName = dept?.name.split(' ').join('-').toLowerCase()

    return <>
    <div className="sidebar">
        <section id={deptName}>
            <img src={employeeAcc.profile_pic}></img>
            <span>Good morning, <b>{current_user.first_name}</b></span>
        </section>
        <div><button
        onClick={()=>{
          navigate('/home')
        }}>All Projects</button>
        </div>
        <div><button        onClick={()=>{
          navigate('/my-projects')
        }}>My Projects</button>
        </div>
        <div><button onClick={()=>{
          navigate('/inbox')
        }}> Inbox </button>
        </div>
        <div><button
        onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to log out, ${current_user.first_name}?`
              )
            ) {
              localStorage.removeItem("twine_token");
              navigate("/", { replace: true });
            }
          }}>Logout</button>
        </div>
    </div>
    </>
}