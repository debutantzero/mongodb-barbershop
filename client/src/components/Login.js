import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            withCredentials: true,
            url: "/apikey/login",
            data: { email, password }
        }).then(data => {
            if (data.data.includes("password")) {
                setErrorPassword(data.data)
                setErrorEmail("")
            }
            if (data.data.includes("email")) {
                setErrorPassword("")
                setErrorEmail(data.data)
            }
            if (data.data[0]._id) {
                window.location = "/service"
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <label className="form-label mx-2">Email</label>
                <input
                    required
                    type="email"
                    className="form-control m-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-danger mx-2">{errorEmail}</p>
                <label className="form-label mx-2">Mot de passe</label>
                <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control m-2" />
                <p className="text-danger mx-2">{errorPassword}</p>
                <button type="submit" className="m-2 btn btn-outline-dark form-control" >Se connecter</button>
            </form>
        </div>
    )
}
