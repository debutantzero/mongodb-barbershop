import React from 'react'

export default function Navbar() {
    return (
        <div>
            <div className="navbar bg-dark text-light fixed-top ">
                <div className="navbar-brand mx-4">
                    BarberShop
                </div>
                <form className="d-flex mx-4">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}
