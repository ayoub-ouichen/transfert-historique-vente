import React, { useState } from 'react'
import API from '../services/api'
import { Secteur } from '../classes/secteur';

export default function Home() {
    const URL = 'http://localhost:6523/';
    let p = {
        source_id : '',
        destination_id : '',
        date_debut : '',
        date_fin : ''
    }
    let tab = []
    for (let index = 0; index < 5; index++) {
       let secteur = new Secteur()
        tab.push(secteur)
    }
    const [tableData, setTableData] = useState(tab);
    const [parametres, setParametres] = useState(p)
    const [db_destination, setDB_destination] = useState([]);
    const [db_source, setDB_source] = useState([]);
    const [secteurList, setSecteurList] = useState([]);
    const [oldSecteurList, setOldSecteurList] = useState([]);
    const [newSecteurList, setNewSecteurList] = useState([]);

    function getOldSecteur() {
        if(oldSecteurList.length == 0) {
            API.post(URL + 'agence/getSecteur', parametres)
            .then(function (response) {
            // handle success
            setOldSecteurList(response.data.secteurs);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
        }
    }

    function getNewSecteur() {
        if(newSecteurList.length == 0) {
            API.post(URL + 'agence/getSecteur', parametres)
            .then(function (response) {
            // handle success
            setNewSecteurList(response.data.secteurs);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
        }
    }

    if(db_destination.length == 0) {
        API.get(URL + 'agence/getAgences')
        .then(function (response) {
        // handle success
        setDB_destination(response.data);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
    }

    if (db_source.length == 0) {
        API.get(URL + 'agence/getAgences')
        .then(function (response) {
            // handle success
            setDB_source(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

  function handleSelectClick(value, index) {
      let parametresCopy = parametres
      parametresCopy[index] = value
      setParametres(parametresCopy)
      index == 'source_id' ? getOldSecteur() : getNewSecteur()
  }

  function handleAppliquer() {
    API.post(URL + 'chargement/getData', parametres)
    .then(function (response) {
        // handle success
        console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
  }
 
  function handleChanges(e, column, index2) {
    if (column == 'id' || column == 'name') {
        if(secteurList.find(predicate => predicate[column] == e)){
            let antiColumn = (column == 'id' ? 'name' : 'id')
            let tableDataCopy = tableData.slice()
            tableDataCopy[index2][column] = secteurList.find(predicate => predicate[column] == e)[column]
            tableDataCopy[index2][antiColumn] = secteurList.find(predicate => predicate[column] == e)[antiColumn]
            setTableData(tableDataCopy)
            setSecteurList(tab)
        } else {
            setSecteurList(PRODUCTS.filter(predicate => predicate[column].includes(e.toUpperCase() || e.toLowerCase())))
        }
    }
    let tableDataCopy = tableData.slice()
    tableDataCopy[index2][column] = e
    tableDataCopy[index2]['valeur'] = tableDataCopy[index2]['prix'] * tableDataCopy[index2]['quantite']
    setTableData(tableDataCopy)
   }

  function addLine(i) {
    let secteur =  new Secteur()
    if (i == -1) {
        let tableDataCopy = tableData.slice()
        tableDataCopy.pop()
        setTableData(tableDataCopy)
    } else {
        setTableData([...tableData, secteur])
    }
    
   }

  return (
    <div className="container">
        <div className="card m-4">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Source : </label>
                            <select onChange={(e) => handleSelectClick(e.target.value, 'source_id')} className="form-select" id="inputGroupSelect01">
                                <option key={1111} value={''}>--- Vide ---</option>
                                {
                                    db_source.map(db_src => {
                                        return <option key={db_src.id} value={db_src.name}>{db_src.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect02">Destination : </label>
                            <select onChange={(e) => handleSelectClick(e.target.value, 'destination_id')} className="form-select" id="inputGroupSelect02">
                                <option key={1111} value={''}>--- Vide ---</option>
                                {
                                    db_destination.map(db_dst => {
                                        return <option key={db_dst.id} value={db_dst.name}>{db_dst.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive" style={{borderRadius: '5px'}}> 
                        <table className="table table-hover table-bordered table-light border-dark" key={1}>
                            <thead className='text-center table-secondary border-dark'>
                                <tr>
                                    <th colSpan={2} scope={"col"}>Ancienne Secteur</th>
                                    <th colSpan={2} scope={"col"}>Nouveau Secteur</th>
                                </tr>
                                <tr>
                                    <th scope={"col"}>NOM SECTEUR</th>
                                    <th scope={"col"}>CODE SECTEUR</th>
                                    <th scope={"col"}>CODE SECTEUR</th>
                                    <th scope={"col"}>NOM SECTEUR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData.map((value, index, array) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <input key={index} onChange={e => handleChanges(e.target.value, 'old_nom_secteur', index)} value={value.old_nom_secteur} className="form-control border-0" type="text" list={'#01' + index}/>
                                                    <datalist id={'#01' + index}>
                                                        {
                                                            secteurList.map(secteur => {
                                                                return <option key={secteur.old_nom_secteur} value={secteur.old_nom_secteur}>{secteur.old_nom_secteur}</option>
                                                            })
                                                        }
                                                    </datalist>
                                                </td>
                                                <td>
                                                    <input key={index} onChange={e => handleChanges(e.target.value, 'old_code_secteur', index)} value={value.old_code_secteur} className="form-control border-0" type="text" list={'#02' + index} />
                                                    <datalist id={'#02' + index}>
                                                        {
                                                            secteurList.map(secteur => {
                                                                return <option key={secteur.old_code_secteur} value={secteur.old_code_secteur}>{secteur.old_code_secteur}</option>
                                                            })
                                                        }
                                                    </datalist>
                                                </td>
                                                <td><input key={index} onChange={e => handleChanges(e.target.value, 'new_code_secteur', index)} value={value.new_code_secteur} className="form-control border-0" type="text" /></td>
                                                <td><input key={index} onChange={e => handleChanges(e.target.value, 'new_nom_secteur', index)} value={value.new_nom_secteur} className="form-control border-0" type="text" /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => addLine(-1)} type="button" className="btn btn-light">
                            <i className="fa fa-minus" aria-hidden="true"></i>
                        </button>
                        <button onClick={() => addLine(1)} type="button" className="btn btn-light">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="from-date">Date Début : </label>
                            <input onChange={(e) => handleSelectClick(e.target.value, 'date_debut')} type="date" className="form-control" id="from-date" aria-describedby="date-design-prepend" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="from-date">Date Fin : </label>
                            <input onChange={(e) => handleSelectClick(e.target.value, 'date_fin')} type="date" className="form-control" id="from-date" aria-describedby="date-design-prepend" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <input type="button" onClick={() => handleAppliquer(parametres)} className="form-control btn btn-secondary" value={'Appliquer'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}