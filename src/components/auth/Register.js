import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Register = (props) => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        profile_pic: ""
    })

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
                      })
                    );
                    navigate("/")
                    window.location.reload(false);
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
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
                    <input onChange={updateUser}
                        type="profile_pic" id="profile_pic" className="form-control"
                        placeholder="profile pic url" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}