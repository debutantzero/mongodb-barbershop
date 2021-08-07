import React, { useEffect, useState } from 'react'
import app from "../config"
import axios from "axios"
import sweet from 'sweetalert'
export default function Add() {
    const [prix, setPrix] = useState("")
    const [file, setFile] = useState("")
    const [restartRender, setRestartRender] = useState("")
    const [state, setState] = useState("")
    const [newPrix, setNewPrix] = useState("")
    const [renderNewPrix, setRenderNewPrix] = useState(true)
    const [sendId, setSendId]=useState("")

    const storageRef = app.storage().ref()

    const handleSubmit = (e) => {
        e.preventDefault()
        const fileRef = storageRef.child(file.name)
        fileRef.put(file)
            .then(data => {
                data.ref.getDownloadURL()
                    .then(url => {
                        axios({
                            method: 'post',
                            withCredentials: true,
                            url: "/apikey/addproduit",
                            data: {
                                prix, url
                            }
                        }).then(data => {
                            sweet({
                                icon:"success",
                                title:"Produit ajouté"
                            })
                            setRestartRender(data.data)
                            getproduits()
                        })
                            .catch(err =>{
                                sweet({
                                    icon:"error",
                                    title:"Produit non ajouté"
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }

    const deleteProduit = (id) => {
        axios({
            method: "get",
            withCredentials: true,
            url: "/apikey/remove/" + id,
        }).then(data => {
            setRestartRender(data.data)
            getproduits()
        })
            .catch(err => console.log(err))
    }
    const updatePrix = (id, e) => {
        axios({
            method: "post",
            withCredentials: true,
            url: "/apikey/prix/" + id,
            data: {
                prix: newPrix
            }
        }).then(data => {
            setRestartRender(data.data)
            setRenderNewPrix(true)
            getproduits()
        }).catch(err => { console.log(err) })
    }

    function getproduits(){
        axios({
            method: 'get',
            withCredentials: true,
            url: '/apikey/getproduit'
        }).then(data => {
            setState(data.data)
            getproduits()
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
      getproduits()
    }, [restartRender])
    return (
        <div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExampleAdd" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title"
                        id="offcanvasExampleLabel">Ajouter Produits</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">
                    <form className="card card-add" onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="m-3">
                                <label className="form-label">Image du produit</label>
                                <input type="file" className="form-control"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <label className="form-label mt-3">Prix</label>
                                <input
                                    value={prix}
                                    onChange={(e) => setPrix(e.target.value)}
                                    type="number"
                                    className="form-control mt-1" />
                            </div>
                        </div>
                        <div className="mx-4 mb-3">
                            <button type="submit"
                                className="btn btn-dark form-control">Valider</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex">
                {state && state.map((data, key) => {
                    return (
                        <div key={key}>

                            <div className="card my-card m-2">
                                <div className="card-header">
                                    <button onClick={() => deleteProduit(data._id)}>Supprimer</button>
                                </div>
                                <div className="modal fade" id="exampleModalNewPrix" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={(e) => { e.preventDefault(); updatePrix(sendId) }}>
                                                <input
                                                    value={newPrix}
                                                    onChange={(e) => setNewPrix(e.target.value)}
                                                    className="form-control"
                                                    type="number" required />
                                                <button
                                                    className="form-control mt-1 btn btn-dark"
                                                    type="submit"
                                                >Valider</button>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="card-body">
                                    <img src={data.url} className="my-card-img" />
                                    <h4 className="mt-3">Prix: {data.prix} </h4>
                                </div>
                                <div className="card-footer">
                                    <button
                                    value={sendId}
                                    onClick={()=>setSendId(data._id)}     
                                    className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModalNewPrix"
                                    >Modifier le prix</button>


                                </div>
                            </div>
                         
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
