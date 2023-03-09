import { useState, useEffect } from "react"
import { redirect, useNavigate, Link } from "react-router-dom"

export const Login = (  ) =>{
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  })

  const handleLogin = () => {
    if (email === ""){
      window.alert("Please enter an email")
      return
    }
    if (password === ""){
      window.alert("Please enter a password")
      return
    }
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ 
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.valid) {
          localStorage.setItem(
            "twine_token",
            JSON.stringify({
              id: authInfo.id,
              first_name: authInfo.first_name,
              last_name: authInfo.last_name,
              token: authInfo.token,
            }))
            navigate("/home");
            } else{
                window.alert("Login failed. Please try again.")
                return
            }
        })
  }

return <>
      <form>
        <fieldset>
          <label htmlFor="inputEmail">
            Enter your email address:
          </label>
          <input
            type="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            onKeyUp={(evt) => {
              if (evt.key === 'Enter') {
                handleLogin()
              }
            }}
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">
            Enter your password:
          </label>
          <input
            onChange={(evt) => setPassword(evt.target.value)}
            type="password"
            id="password"
            className="form-control"
            value={password}
            placeholder="Password"
            required
          />
        </fieldset>
      </form>
      <button onClick={() =>{handleLogin()}}>Login
    </button>
    </>
}