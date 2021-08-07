import axios from 'axios'
import React, { useEffect, useState } from 'react'
import app from '../config'

export default function UpdateData() {

    const [restartRender, setRestartRender]=useState("")

    const [boutique, setBoutique]=useState("")
    const [country, setCountry]=useState("")
    const [city, setCity]=useState("")
    const [address, setAddress]=useState("")
    const [file, setFile]=useState("")
    const [phone, setPhone]=useState("")
    const [data, setData]=useState("")

    function restart(){
        axios({
            method:"GET",
            url:"/apikey/getdata",
            withCredentials:true,
        }).then(data=>{
            setData(data.data)
        })
    }

    useEffect(() => {
        restart()
    }, [restartRender])
/////////////////////////////////////////////////////////////////////"
    const updateEntreprise = ()=>{
        console.log("object")
        axios({
            method: "POST",
            withCredentials: true,
            url: "/apikey/update",
            data: {entreprise:boutique}
        }).then(data=>{
            setRestartRender(data.data)
            console.log(data)
            restart()
        }).catch(error=>{
            console.log(error)
        })
    }
    const updateCountry = ()=>{
        axios({
            method: "POST",
            withCredentials: true,
            url: "/apikey/update",
            data: {country}
        }).then(data=>{
            setRestartRender(data.data)
            restart()
        }).catch(error=>{
            console.log(error)
        })
    }
    const updateCity = ()=>{
        axios({
            method: "POST",
            withCredentials: true,
            url: "/apikey/update",
            data: {city}
        }).then(data=>{
            setRestartRender(data.data)
            restart()
        }).catch(error=>{
            console.log(error)
        })
    }
    const updateAddress = ()=>{
        axios({
            method: "POST",
            withCredentials: true,
            url: "/apikey/update",
            data: {address}
        }).then(data=>{
            setRestartRender(data.data)
            restart()
        }).catch(error=>{
            console.log(error)
        })
    }
    const updatePhone = ()=>{
        axios({
            method: "POST",
            withCredentials: true,
            url: "/apikey/update",
            data: {phone}
        }).then(data=>{
            setRestartRender(data.data)
            restart()
        }).catch(error=>{
            console.log(error)
        })
    }
    const storageRef=app.storage().ref()
    const updateProfil= ()=>{
        const fileRef= storageRef.child(file.name)
        fileRef.put(file).then(data=>{
            console.log(data)
            data.ref.getDownloadURL().then(url=>{
                console.log(url)
                axios({
                    method: "POST",
                    withCredentials: true,
                    url: "/apikey/update",
                    data:{url: url}
                }).then(data=>{
                    setRestartRender(data.data)
                    restart()
                }).catch(err=>{ console.log(err) })

            })
        })
    }
///////////////////////////////////////////////////////////////////////////////////"
    return (
        <div>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExampleUpdateData" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <img className="rounded-circle" src={data.url} />
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">
                    <div className="m-3">
                        <label className="form-label">Nom de boutique : <span className="text-success">{data.entreprise}</span></label>
                        <input type="text" className="form-control"
                            value={boutique}
                            onChange={(e)=>setBoutique(e.target.value)}
                        />
                        <button 
                        className="btn btn-dark"
                        onClick={updateEntreprise}
                        >Mettre a jour</button>
                    </div>
                    <div className="m-3">
                        <label className="form-label">Pays : <span className="text-success">{data.country}</span></label>
                        <input type="text" className="form-control"
                            value={country}
                            onChange={(e)=>setCountry(e.target.value)}
                        />
                        <button 
                        className="btn btn-dark"
                        onClick={updateCountry}
                        >Mettre a jour</button>

                    </div>
                    <div className="m-3">
                        <label className="form-label">Ville : <span className="text-success">{data.city}</span></label>
                        <input type="text" className="form-control"
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}
                        />
                        <button 
                        className="btn btn-dark"
                        onClick={updateCity}
                        >Mettre a jour</button>

                    </div>
                    <div className="m-3">
                        <label className="form-label">Addresse <span className="text-success">{data.address}</span></label>
                        <input type="text" className="form-control"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                        />
                        <button 
                        className="btn btn-dark"
                        onClick={updateAddress}
                        >Mettre a jour</button>

                    </div>
                    <div className="m-3">
                        <label className="form-label">Tel <span className="text-success">{data.phone}</span></label>
                        <input type="text" className="form-control"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                        <button 
                        className="btn btn-dark"
                        onClick={updatePhone}
                        >Mettre a jour</button>

                    </div>
                    <div className="m-3">
                        <label className="form-label">Photo de profil</label>
                        <input type="file" className="form-control"
                            onChange={(e)=>setFile(e.target.files[0])}
                        />
                        <button
                        onClick= {updateProfil}
                        className="btn btn-dark">Mettre a jour</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
