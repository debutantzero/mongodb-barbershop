import React, { useEffect , useState} from 'react'
import axios from "axios"
export default function Alluser() {

    const [render, setRender]=useState("")
    useEffect(() => {
        axios({
            method:"get",
            url: "/api/allusers",
            withCredentials: true,
        }).then(data=>{
            setRender(data.data)
        }).catch(err=>console.log(err))
        
    }, [])

    const setPostId=(id)=>{
        axios({
            method:"get",
            url:"/api/setid/"+id,
            withCredentials: true,
        }).then(data=>{
            window.location="/produits"
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="flex pt-4 mt-4">
            {render && render.map((data, key)=>{
                return(
                    <div key={key} className="m-3 mt-4 card card-ca">
                        <div className="card-header">
                            {data.entreprise}
                        </div>
                        <div className="card-body card-ca">
                            <img src={data.url} className="card-im mt-4" />
                            <p className="mt-3"><i className="fas fa-map-marker-alt mx-2"></i>{data.country +"-"+ data.city+ "-"+ data.address}</p>
                            <p className=""><i className="fab fa-whatsapp text-success mx-2"></i>{data.phone}</p>
                            <button
                            onClick={()=>setPostId(data._id)}
                            className="btn btn-dark form-control"
                            >Prendre Rv</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
