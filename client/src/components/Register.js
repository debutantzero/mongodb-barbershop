import axios from 'axios'
import React, { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [entreprise, setEntreprise] = useState("")
    const [errorPassword, setErrorPassword]= useState("")
    const [errorEmail, setErrorEmail]= useState("")
    const [errorEntreprise, setErrorEntreprise]= useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            withCredentials: true,
            url: "/apikey/register",
            data: {
                email, password, entreprise
            }
        }).then(data => {
            if(data.data.includes("address email")){
                setErrorEmail(data.data)
                setErrorPassword("")
                setErrorEntreprise("")
            }
            if(data.data.includes("entreprise")){
                setErrorEmail("")
                setErrorPassword("")
                setErrorEntreprise(data.data)
            }
            if(data.data.includes("trop court")){
                setErrorEmail("")
                setErrorPassword(data.data)
                setErrorEntreprise("")
            }
            if(data.data.includes("created")){
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control m-2" />
                    <p className="text-danger mx-2">{errorEmail}</p>
                <label className="form-label mx-2">Nom de boutique</label>
                <input
                    required
                    value={entreprise}
                    onChange={(e) => setEntreprise(e.target.value)}
                    type="text"
                    className="form-control m-2" />
                    <p className="text-danger mx-2">{errorEntreprise}</p>
                <label className="form-label mx-2">Mot de passe</label>
                <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control m-2" />
                <p className="text-danger mx-2">{errorPassword}</p>
                <button type="submit" className="m-2 btn btn-outline-dark form-control" >S'inscrire</button>
            </form>
        </div>
    )
}
