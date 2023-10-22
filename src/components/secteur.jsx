import React, { useEffect, useState } from 'react'
import SecteurClasse from '../classes/secteurClasse'
import { fetchSecteurs, getNewSecteurs, getOldSecteurs, getParameters, handleSelectClick } from '../featuers/dataFlowSlice'
import { useDispatch, useSelector } from 'react-redux'
import API from '../services/api'

export default function Secteur() {

    let tab = []
    for (let index = 0; index < 5; index++) {
        let secteur = new SecteurClasse()
        tab.push(secteur)
    }
    const dispatch = useDispatch()
    const [tableData, setTableData] = useState(tab);
    const [secteurList, setSecteurList] = useState([]);
    const oldSecteurs = useSelector(getOldSecteurs)
    const newSecteurs = useSelector(getNewSecteurs)
    const parameters = useSelector(getParameters)

    useEffect(() => {
        if (parameters.source_id != '' || parameters.destination_id != '') {
            dispatch(fetchSecteurs(parameters))
            console.log('good');
        }
    //   return () => {
    //   }

    }, [parameters.source_id, parameters.destination_id])
  
    function handleAppliquer() {
        //Verifier que tableData est remplier  
        API.post('http://localhost:6523/agence/getSecteur', parameters)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }
   
    function getAntiColumn(column) {
      switch (column) {
          case 'old_code_secteur':
              return 'old_nom_secteur';
          case 'old_nom_secteur':
              return 'old_code_secteur';
          case 'new_code_secteur':
              return 'new_nom_secteur';
          case 'new_nom_secteur':
              return 'new_code_secteur';
          default:
              break;
      }
    }
  
    // function getColumnOposee(column) {
    //   switch (column) {
    //       case 'old_code_secteur':
    //           return 'new_code_secteur';
    //       case 'old_nom_secteur':
    //           return 'new_nom_secteur';
    //       case 'new_code_secteur':
    //           return 'old_code_secteur';
    //       case 'new_nom_secteur':
    //           return 'old_nom_secteur';
    //       default:
    //           break;
    //   }
    // }

    function handleChanges(e, column, index2) {
        let secteurs = column.substring(0,3) == 'new' ? newSecteurs.slice() : oldSecteurs.slice()
        if(secteurList.find(predicate => predicate[column] == e)){
            let antiColumn = getAntiColumn(column)
            let tableDataCopy = tableData.slice()
            tableDataCopy[index2][column] = secteurList.find(predicate => predicate[column] == e)[column]
            tableDataCopy[index2][antiColumn] = secteurList.find(predicate => predicate[column] == e)[antiColumn]
            setTableData(tableDataCopy)
            setSecteurList(tab)
        } else {
            setSecteurList(secteurs.filter(predicate => predicate[column].toString().includes(e.toUpperCase() || e.toLowerCase())))
        }
        
        let tableDataCopy = tableData.slice()
        tableDataCopy[index2][column] = e
        setTableData(tableDataCopy)
       }
    
      function addLine(i) {
        let secteur =  new SecteurClasse()
        if (i == -1) {
            let tableDataCopy = tableData.slice()
            tableDataCopy.pop()
            setTableData(tableDataCopy)
        } else {
            setTableData([...tableData, secteur])
        }
        
       }

  return (
    <>
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
                                            <input key={'#01' + index} onChange={e => handleChanges(e.target.value, 'old_nom_secteur', index)} value={value.old_nom_secteur} className="form-control border-0" type="text" list={'#001' + index}/>
                                            <datalist id={'#001' + index} key={'#001' + index}>
                                                {
                                                    secteurList.map((secteur, s_index) => {
                                                        return <option key={('#0001' + s_index)} value={secteur.old_nom_secteur}>{secteur.old_nom_secteur}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#02' + index} onChange={e => handleChanges(e.target.value, 'old_code_secteur', index)} value={value.old_code_secteur} className="form-control border-0" type="text" list={'#002' + index} />
                                            <datalist id={'#002' + index} key={'#002' + index}>
                                                {
                                                    secteurList.map((secteur, s_index) => {
                                                        return <option key={('#0002' + s_index)} value={secteur.old_code_secteur}>{secteur.old_code_secteur}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#03' + index} onChange={e => handleChanges(e.target.value, 'new_code_secteur', index)} value={value.new_code_secteur} className="form-control border-0" type="text" list={'#003' + index} />
                                            <datalist id={'#003' + index} key={'#003' + index}>
                                                {
                                                    secteurList.map((secteur, s_index) => {
                                                        return <option key={('#0003' + s_index)} value={secteur.new_code_secteur}>{secteur.new_code_secteur}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#04' + index} onChange={e => handleChanges(e.target.value, 'new_nom_secteur', index)} value={value.new_nom_secteur} className="form-control border-0" type="text" list={'#004' + index} />
                                            <datalist id={'#004' + index} key={'#004' + index}>
                                                {
                                                    secteurList.map((secteur, s_index) => {
                                                        return <option key={('#0004' + s_index)} value={secteur.new_nom_secteur}>{secteur.new_nom_secteur}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
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
                    <input onChange={(e) => dispatch(handleSelectClick([e.target.value, 'date_debut']))} type="date" className="form-control" id="from-date" aria-describedby="date-design-prepend" />
                </div>
            </div>
            <div className="col">
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="from-date">Date Fin : </label>
                    <input onChange={(e) => dispatch(handleSelectClick([e.target.value, 'date_fin']))} type="date" className="form-control" id="from-date" aria-describedby="date-design-prepend" />
                </div>
            </div>
            <div className="col">
                <div className="input-group mb-3">
                    <input type="button" onClick={() => handleAppliquer()} className="form-control btn btn-secondary" value={'Appliquer'} />
                </div>
            </div>
        </div>
    </>
  )
}
