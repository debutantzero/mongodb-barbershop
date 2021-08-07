import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

export default function Connexion() {
    const [render, setRender] = useState(false)
    return (
        <div className="connexion">
            <div className="img-container">

            </div>
            <div className="connexion-container">
            {
                render ?
                <div>
                        <h1 className="text-center">Se connecter</h1>
                        <Login />
                        <button 
                        className="btn btn-dark form-control m-2"
                        onClick={
                            () => setRender(!render)
                        }>Inscription</button>
                    </div>
                    :
                    <div>
                        <h1 className="text-center">S'inscrire</h1>
                        <Register />
                        <button 
                        className="btn btn-dark form-control m-2"
                        onClick={
                            () => setRender(!render)
                        }>Connexion</button>
                    </div>
            }
            </div>
        </div>
    )
}
