import React, { useEffect, useState } from 'react'
import CoupleClasse from '../classes/CoupleClasse'
import { useDispatch, useSelector } from 'react-redux'
import API from '../services/api'
import {
    fetchSecteurs,
    getNewSecteurs,
    getOldSecteurs,
    getParameters,
    handleSelectClick,
    setChargementRubrique
} from '../featuers/dataFlowSlice'

export default function Secteur() {
    const [secteurList, setSecteurList] = useState([])
    const [wrongLines, setWrongLines] = useState([])
    const oldSecteurs = useSelector(getOldSecteurs)
    const newSecteurs = useSelector(getNewSecteurs)
    const parameters = useSelector(getParameters)
    const dispatch = useDispatch()
    
    let tab = []
    for (let index = 0; index < 5; index++) {
        let secteur = new CoupleClasse()
        tab.push(secteur)
    }
    const [tableData, setTableData] = useState(tab)

    useEffect(() => {
        if (parameters.source_id != '' || parameters.destination_id != '') {
            if (oldSecteurs.length == 0 || newSecteurs.length == 0) {
                dispatch(fetchSecteurs(parameters))
            }
        }

    //   return () => {
    //   }

    }, [parameters.source_id, parameters.destination_id])

    function handleAppliquer() {
        let indexs = tableData.map((value, index, array) => {
            let count = 0
            array[index].old_code === '' && count++;
            array[index].old_nom === '' && count++;
            array[index].new_code === '' && count++;
            array[index].new_nom === '' && count++;
            return count > 0 ? index : null;
        }).filter(predicate => predicate != null)

        setWrongLines(indexs)
        
        if (indexs.length == 0) {
            API.post('http://localhost:6523/chargement/getVendeurSuperviseur', {params: parameters, data: tableData})
            .then(function (response) {
                dispatch(setChargementRubrique(response.data))
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
   
    function getAntiColumn(column) {
      switch (column) {
          case 'old_code':
              return 'old_nom';
          case 'old_nom':
              return 'old_code';
          case 'new_code':
              return 'new_nom';
          case 'new_nom':
              return 'new_code';
          default:
              break;
      }
    }
  
    // function getColumnOposee(column) {
    //   switch (column) {
    //       case 'old_code':
    //           return 'new_code';
    //       case 'old_nom':
    //           return 'new_nom';
    //       case 'new_code':
    //           return 'old_code';
    //       case 'new_nom':
    //           return 'old_nom';
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
        let secteur =  new CoupleClasse()
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
                                    <tr key={index} className={ (wrongLines.find(predicate => predicate == index) + 1) ? 'table-danger border-dark' : '' }>
                                        <td>
                                            <input key={'#sc_01' + index} onChange={e => handleChanges(e.target.value, 'old_nom', index)} value={value.old_nom} className="form-control border-0" type="text" list={'#sc_001' + index}/>
                                            <datalist id={'#sc_001' + index} key={'#sc_001' + index}>
                                                {
                                                    secteurList.map((secteur, s_index) => {
                                                        return <option key={('#sc_0001' + s_index)} value={secteur.old_nom}>{secteur.old_nom}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#sc_02' + index} onChange={e => handleChanges(e.target.value, 'old_code', index)} value={value.old_code} className="form-control border-0" type="text" list={'#sc_002' + index} />
                                            <datalist id={'#sc_002' + index} key={'#sc_002' + index}>
                                                {
                                                    secteurList.map((secteur, s_index) => {
                                                        return <option key={('#sc_0002' + s_index)} value={secteur.old_code}>{secteur.old_code}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#sc_03' + index} onChange={e => handleChanges(e.target.value, 'new_code', index)} value={value.new_code} className="form-control border-0" type="text" list={'#sc_003' + index} />
                                            <datalist id={'#sc_003' + index} key={'#sc_003' + index}>
                                                {
                                                    secteurList.map((secteur, s_index) => {
                                                        return <option key={('#sc_0003' + s_index)} value={secteur.new_code}>{secteur.new_code}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#sc_04' + index} onChange={e => handleChanges(e.target.value, 'new_nom', index)} value={value.new_nom} className="form-control border-0" type="text" list={'#sc_004' + index} />
                                            <datalist id={'#sc_004' + index} key={'#sc_004' + index}>
                                                {
                                                    secteurList.map((secteur, s_index) => {
                                                        return <option key={('#sc_0004' + s_index)} value={secteur.new_nom}>{secteur.new_nom}</option>
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
