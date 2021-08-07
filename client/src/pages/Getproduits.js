import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SendMail from '../components/SendMail'
import swal from 'sweetalert';

export default function Getproduits() {
    const [render, setRender] = useState()
    const [hour, setHour] = useState("Selectionnez l'heure . . .")
    const [name, setName] = useState("")

    useEffect(() => {
        axios({
            method: "get",
            withCredentials: true,
            url: "/api/getproduits"
        }).then(data => {
            setRender(data.data)
        }).catch(err => console.log(err))
    }, [])


    const sendMail = (url, prix, email, hour, name) => {
        axios({
            method: 'post',
            url: "/api/sendmail",
            withCredentials: true,
            data: {
                prix, url, email, hour, name
            }
        }).then(data => {
            console.log("envoyer")
            swal({
                title: "Mail envoyé",
                icon: "success",
                buttons: { cancel: true },
            });
        }).catch(err => {
            swal({
                title: "Mail non envoyé",
                icon: "error"
            });
        })
    }

    return (
        <div className="mt-4 pt-4">
            <Navbar />
            <div className="flex mt-4">

                {render &&
                    render.map((data, key) => {
                        return (
                            <form
                                onSubmit={(e) => { e.preventDefault(); sendMail(data.url, data.prix, data.email, hour, name) }}
                                key={key}
                                className="card my-card m-4">
                                <div className="card-body">
                                    <img src={data.url} className="card-img" />
                                    <div>
                                        <label className="form-label mt-2">Prix: {data.prix}</label>
                                        <select className="form-select" value={data.id && hour} onChange={(e) => setHour(e.target.value)}>
                                            <option value="Selectionnez l'heure . . ." disabled>Selectionnez l'heure . . .</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00" >12:00</option>
                                        </select>
                                        <input type="text"
                                            id={data.id}
                                            value={data.id && name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control mt-1"
                                            placeholder="Entrez votre nom . . ." required />
                                    </div>

                                </div>
                                <div className="card-footer">
                                    <button
                                        type="submit"
                                        className="btn btn-dark form-control"
                                    >Envoyer</button>
                                    <SendMail />
                                </div>
                            </form>
                        )
                    })
                }
            </div>
        </div>
    )
}
