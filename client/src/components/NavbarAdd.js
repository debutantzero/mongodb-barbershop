import axios from 'axios'
import React from 'react'
import UpdateData from './UpdateData'

export default function NavbarAdd() {

    const logout=() =>{
        axios({
            method:"get",
            withCredentials: true,
            url: "/apikey/logout"
        }).then(data=>{
            console.log("logout")
            window.location= "/service"
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div>
            <div className="navbar bg-dark text-light">
                <div className="navbar-brand mx-4">
                    BarberShop
                </div>
                <div className="mx-4">
                    <ul className="navbar-nav d-f">
                        <li className="btn text-light mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExampleUpdateData" aria-controls="offcanvasExample">
                            Mes données
                        </li>
                        <li onClick={logout} className="btn text-light mx-3">
                            Deconnexion
                        </li>
                    </ul>
                </div>
            </div>

            <UpdateData/>
        </div>
    )
}
