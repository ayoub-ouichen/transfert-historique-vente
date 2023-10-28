import React, { useEffect, useState } from 'react'
import API from '../services/api'
import Secteur from './secteur';
import Header from './header';
import Vendeur from './vendeur';
import Superviseur from './superviseur';

export default function Home() {
    const [visibelty, setVisibelty] = useState(1)

  return (
    <div className="container">
        <div className="card m-4">
            <div className="card-body">
                <Header />
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={"nav-link" + (visibelty == 1 ? " active" : "")}  style={{cursor: 'pointer'}} onClick={() => setVisibelty(1)}>Secteur</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (visibelty == 2 ? " active" : "")} style={{cursor: 'pointer'}} onClick={() => setVisibelty(2)}>Vendeur</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (visibelty == 3 ? " active" : "")} style={{cursor: 'pointer'}} onClick={() => setVisibelty(3)}>Superviseur</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (visibelty == 4 ? " active" : "")} style={{cursor: 'pointer'}} onClick={() => setVisibelty(4)}>Preview Chargement</a>
                    </li>
                </ul>
                <div className={"card  border-top-0" + (visibelty != 1 ? " visually-hidden" : "")}>
                    <div className="card-body pt-4">
                        <Secteur />
                    </div>
                </div>
                <div className={"card border-top-0" + (visibelty != 2 ? " visually-hidden" : "")}>
                    <div className="card-body">
                        <Vendeur />
                    </div>
                </div>
                <div className={"card border-top-0" + (visibelty != 3 ? " visually-hidden" : "")}>
                    <div className="card-body">
                    <Superviseur />
                    </div>
                </div>
                <div className={"card border-top-0" + (visibelty != 4 ? " visually-hidden" : "")}>
                    <div className="card-body">
                        {/* <MethodeEulerPF /> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
