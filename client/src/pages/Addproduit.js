import React from 'react'
import Add from '../components/Add'
import NavbarAdd from '../components/NavbarAdd'

export default function Addproduit() {
    return (
        <div>
            <NavbarAdd/>
            <div>
                <button className="btn btn-outline-dark m-3"
                data-bs-toggle="offcanvas" 
                data-bs-target="#offcanvasExampleAdd" 
                aria-controls="offcanvasExample"
                >Ajouter un produit</button>
            </div>
            <Add/>
        </div>
    )
}
