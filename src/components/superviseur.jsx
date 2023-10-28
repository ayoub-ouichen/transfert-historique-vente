import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CoupleClasse from '../classes/CoupleClasse'
import { fetchSuperviseurs, getNewSuperviseurs, getOldSuperviseurs, getParameters } from '../featuers/dataFlowSlice'

export default function Superviseur() {
    const [superviseurList, setSuperviseurList] = useState([])
    const oldSuperviseurs = useSelector(getOldSuperviseurs)
    const newSuperviseurs = useSelector(getNewSuperviseurs)
    const parameters = useSelector(getParameters)
    const [wrongLines, setWrongLines] = useState([])
    const dispatch = useDispatch()
    let tab = []
    for (let index = 0; index < 5; index++) {
        let superviseur = new CoupleClasse()
        tab.push(superviseur)
    }
    const [tableData, setTableData] = useState(tab);

    useEffect(() => {
        if (parameters.source_id != '' || parameters.destination_id != '') {
            if (oldSuperviseurs.length == 0 || newSuperviseurs.length == 0) {
                dispatch(fetchSuperviseurs(parameters))
            }
        }

    //   return () => {
    //   }

    }, [parameters.source_id, parameters.destination_id])


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
  
      function handleChanges(e, column, index2) {
          let superviseurs = column.substring(0,3) == 'new' ? newSuperviseurs.slice() : oldSuperviseurs.slice()
          if(superviseurList.find(predicate => predicate[column] == e)){
              let antiColumn = getAntiColumn(column)
              let tableDataCopy = tableData.slice()
              tableDataCopy[index2][column] = superviseurList.find(predicate => predicate[column] == e)[column]
              tableDataCopy[index2][antiColumn] = superviseurList.find(predicate => predicate[column] == e)[antiColumn]
              setTableData(tableDataCopy)
              setSuperviseurList(tab)
          } else {
              setSuperviseurList(superviseurs.filter(predicate => predicate[column].toString().includes(e.toUpperCase() || e.toLowerCase())))
          }
          
          let tableDataCopy = tableData.slice()
          tableDataCopy[index2][column] = e
          setTableData(tableDataCopy)
         }

    function addLine(i) {
        let superviseur =  new CoupleClasse()
        if (i == -1) {
            let tableDataCopy = tableData.slice()
            tableDataCopy.pop()
            setTableData(tableDataCopy)
        } else {
            setTableData([...tableData, superviseur])
        }
        
       }
       
  return (
    <>
        <div className="row">
            <div className="table-responsive" style={{borderRadius: '5px'}}> 
                <table className="table table-hover table-bordered table-light border-dark" key={1}>
                    <thead className='text-center table-secondary border-dark'>
                        <tr>
                            <th colSpan={2} scope={"col"}>Ancienne Superviseur</th>
                            <th colSpan={2} scope={"col"}>Nouveau Superviseur</th>
                        </tr>
                        <tr>
                            <th scope={"col"}>NOM SUPERVISEUR</th>
                            <th scope={"col"}>CODE SUPERVISEUR</th>
                            <th scope={"col"}>CODE SUPERVISEUR</th>
                            <th scope={"col"}>NOM SUPERVISEUR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((value, index, array) => {
                                return (
                                    <tr key={index} className={ (wrongLines.find(predicate => predicate == index) + 1) ? 'table-danger border-dark' : '' }>
                                        <td>
                                            <input key={'#sp_01' + index} onChange={e => handleChanges(e.target.value, 'old_nom', index)} value={value.old_nom} className="form-control border-0" type="text" list={'#sp_001' + index}/>
                                            <datalist id={'#sp_001' + index} key={'#sp_001' + index}>
                                                {
                                                    superviseurList.map((superviseur, s_index) => {
                                                        return <option key={('#sp_0001' + s_index)} value={superviseur.old_nom}>{superviseur.old_nom}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#sp_02' + index} onChange={e => handleChanges(e.target.value, 'old_code', index)} value={value.old_code} className="form-control border-0" type="text" list={'#sp_002' + index} />
                                            <datalist id={'#sp_002' + index} key={'#sp_002' + index}>
                                                {
                                                    superviseurList.map((superviseur, s_index) => {
                                                        return <option key={('#sp_0002' + s_index)} value={superviseur.old_code}>{superviseur.old_code}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#sp_03' + index} onChange={e => handleChanges(e.target.value, 'new_code', index)} value={value.new_code} className="form-control border-0" type="text" list={'#sp_003' + index} />
                                            <datalist id={'#sp_003' + index} key={'#sp_003' + index}>
                                                {
                                                    superviseurList.map((superviseur, s_index) => {
                                                        return <option key={('#sp_0003' + s_index)} value={superviseur.new_code}>{superviseur.new_code}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#sp_04' + index} onChange={e => handleChanges(e.target.value, 'new_nom', index)} value={value.new_nom} className="form-control border-0" type="text" list={'#sp_004' + index} />
                                            <datalist id={'#sp_004' + index} key={'#sp_004' + index}>
                                                {
                                                    superviseurList.map((superviseur, s_index) => {
                                                        return <option key={('#sp_0004' + s_index)} value={superviseur.new_nom}>{superviseur.new_nom}</option>
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
    </>
  )
}
