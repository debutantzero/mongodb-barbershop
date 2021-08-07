import React from 'react'
import homeimg from "../undraw_barber.svg"
export default function Home() {
    return (
        <div className="home">
            <div className="home-img">
                <img src={homeimg} />
            </div>
            <div className="home-btn">
             <button
             className="btn btn-outline-dark px-4"
             onClick={()=>window.location="/service"}>je suis un coiffeur</button>
             <button 
             className="btn btn-dark px-4"
             onClick={()=>window.location="/shop"} >je veux me coiffer</button>
            </div>
        </div>
    )
}
