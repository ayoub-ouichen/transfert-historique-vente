import React, { useEffect, useState } from 'react'
import API from '../services/api'
import Secteur from './secteur';
import Header from './header';

export default function Home() {
    const [visibelty, setVisibelty] = useState(true)
    // const [db_destination, setDB_destination] = useState([])
    // const [db_source, setDB_source] = useState([])

    useEffect(() => {
      first
    
      return () => {
        second
      }
    }, [third])
    

    // if(db_destination.length == 0) {
    //     API.get(URL + 'agence/getAgences')
    //     .then(function (response) {
    //     // handle success
    //     setDB_destination(response.data);
    //     })
    //     .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //     })
    //     .finally(function () {
    //     // always executed
    //     });
    // }

    // if (db_source.length == 0) {
    //     API.get(URL + 'agence/getAgences')
    //     .then(function (response) {
    //         // handle success
    //         setDB_source(response.data);
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    //     .finally(function () {
    //         // always executed
    //     });
    // }

  return (
    <div className="container">
        <div className="card m-4">
            <div className="card-body">
                <Header />
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={"nav-link" + (visibelty ? " active" : "")}  style={{cursor: 'pointer'}} onClick={() => setVisibelty(!visibelty)}>Nouveau</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (!visibelty ? " active" : "")} style={{cursor: 'pointer'}} onClick={() => setVisibelty(!visibelty)}>Historique</a>
                    </li>
                </ul>
                <div className={"card  border-top-0" + (!visibelty ? " visually-hidden" : "")}>
                    <div className="card-body pt-4">
                        <Secteur />
                    </div>
                </div>
                <div className={"card border-top-0" + (visibelty ? " visually-hidden" : "")}>
                    <div className="card-body">
                        <Secteur />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
