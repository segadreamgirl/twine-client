import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Register = (props) => {
    let current_user=""
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    })
    const [employee, setEmployee] = useState({
        user_id:0,
        profile_pic:"",
        department_id:0
    })
    const [dept, setDept] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8000/departments`)
            .then(res => res.json())
                .then((res) => {
                    setDept(res)
                })
        },
        []
    )

    let navigate = useNavigate()

    const registerNewUser = (e) => {
        e.preventDefault()
        return fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem(
                      "twine_token",
                      JSON.stringify({
                        id: createdUser.id,
                        first_name: createdUser.first_name,
                        last_name: createdUser.last_name,
                        token: createdUser.token
                      }),
                      current_user = {...employee},
                      employee.user_id = createdUser.id,
                      console.log(employee),
                      fetch("http://localhost:8000/employees", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json"
                      },
                      body: JSON.stringify(employee)
                  }))
                }
                navigate("/home")
                window.location.reload(false);
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    const updateEmployee = (evt) => {
        const copy = {...employee}
        copy[evt.target.id] = evt.target.value
        setEmployee(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={registerNewUser}>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                           type="text" id="first_name" className="form-control"
                           placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser}
                           type="text" id="last_name" className="form-control"
                           placeholder="Enter your last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateUser}
                        type="password" className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset>
                <label htmlFor="profile_pic">Profile Pic</label>
                    <input onChange={updateEmployee}
                        type="profile_pic" id="profile_pic" className="form-control"
                        placeholder="profile pic url" required />
                </fieldset>
                <fieldset>
                <label htmlFor="department">Department</label>
                <select defaultValue={null}
                                            onChange={(event) => {
                                                const copy = { ...employee }
                                                copy.department_id = parseInt(event.target.value)
                                                setEmployee(copy)
                                            }}
                                        >
                                            <option defaultValue="null">Department</option>
                                            {
                                            dept.map((dep) => {
                                                return (
                                                    <option key={dep.id} value={dep.id}>
                                                        {dep.name}
                                                    </option>
                                                )
                                            })}
                 </select>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}