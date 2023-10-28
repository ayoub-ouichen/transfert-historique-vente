import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CoupleClasse from '../classes/CoupleClasse'
import { 
    fetchVendeurs, 
    getChargementRubrique, 
    getChrgRbqStatus, 
    getNewVendeurs, 
    getOldVendeurs, 
    getParameters 
} from '../featuers/dataFlowSlice'

export default function Vendeur() {
    const [vendeurList, setVendeurList] = useState([])
    const oldVendeurs = useSelector(getOldVendeurs)
    const newVendeurs = useSelector(getNewVendeurs)
    const parameters = useSelector(getParameters)
    const [wrongLines, setWrongLines] = useState([])
    const chargementRubrique = useSelector(getChargementRubrique)
    const cr_status = useSelector(getChrgRbqStatus)
    const dispatch = useDispatch()
    let tab = []
    for (let index = 0; index < 5; index++) {
        let vendeur = new CoupleClasse()
        tab.push(vendeur)
    }
    const [tableData, setTableData] = useState(tab);
    

    
    useEffect(() => {
        if (parameters.source_id != '' || parameters.destination_id != '') {
            if (oldVendeurs.length == 0 || newVendeurs.length == 0) {
                dispatch(fetchVendeurs(parameters))
            }
        }

        if (cr_status === 'succeeded') {
            let tmp_table = []
            let a = chargementRubrique.source_data.vendeur.length
            let b = chargementRubrique.destination_data.vendeur.length
            let i = a >= b ? a : b
            for (let index = 0; index < i; index++) {
                let vendeur = new CoupleClasse()
                vendeur.new_code = chargementRubrique.destination_data.vendeur[index] ?? ''
                vendeur.old_code = chargementRubrique.source_data.vendeur[index] ?? ''
                vendeur.new_nom = vendeurList.find(predicate => predicate['new_code'] == vendeur.new_code).new_nom ?? ''
                vendeur.old_nom = vendeurList.find(predicate => predicate['old_code'] == vendeur.old_code).old_nom ?? ''
                tmp_table.push(vendeur)
            }
            setTableData(tmp_table)
        }

    //   return () => {
    //   }

    }, [parameters.source_id, parameters.destination_id, cr_status])


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
          let vendeurs = column.substring(0,3) == 'new' ? newVendeurs.slice() : oldVendeurs.slice()
          if(vendeurList.find(predicate => predicate[column] == e)){
              let antiColumn = getAntiColumn(column)
              let tableDataCopy = tableData.slice()
              tableDataCopy[index2][column] = vendeurList.find(predicate => predicate[column] == e)[column]
              tableDataCopy[index2][antiColumn] = vendeurList.find(predicate => predicate[column] == e)[antiColumn]
              setTableData(tableDataCopy)
              setVendeurList(tab)
          } else {
              setVendeurList(vendeurs.filter(predicate => predicate[column].toString().includes(e.toUpperCase() || e.toLowerCase())))
          }
          
          let tableDataCopy = tableData.slice()
          tableDataCopy[index2][column] = e
          setTableData(tableDataCopy)
         }

    function addLine(i) {
        let vendeur =  new CoupleClasse()
        if (i == -1) {
            let tableDataCopy = tableData.slice()
            tableDataCopy.pop()
            setTableData(tableDataCopy)
        } else {
            setTableData([...tableData, vendeur])
        }
        
       }
       
  return (
    <>
        <div className="row">
            <div className="table-responsive" style={{borderRadius: '5px'}}> 
                <table className="table table-hover table-bordered table-light border-dark" key={1}>
                    <thead className='text-center table-secondary border-dark'>
                        <tr>
                            <th colSpan={2} scope={"col"}>Ancienne Vendeur</th>
                            <th colSpan={2} scope={"col"}>Nouveau Vendeur</th>
                        </tr>
                        <tr>
                            <th scope={"col"}>NOM VENDEUR</th>
                            <th scope={"col"}>CODE VENDEUR</th>
                            <th scope={"col"}>CODE VENDEUR</th>
                            <th scope={"col"}>NOM VENDEUR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((value, index, array) => {
                                return (
                                    <tr key={index} className={ (wrongLines.find(predicate => predicate == index) + 1) ? 'table-danger border-dark' : '' }>
                                        <td>
                                            <input key={'#vd_01' + index} onChange={e => handleChanges(e.target.value, 'old_nom', index)} value={value.old_nom} className="form-control border-0" type="text" list={'#vd_001' + index}/>
                                            <datalist id={'#vd_001' + index} key={'#vd_001' + index}>
                                                {
                                                    vendeurList.map((vendeur, s_index) => {
                                                        return <option key={('#vd_0001' + s_index)} value={vendeur.old_nom}>{vendeur.old_nom}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#vd_02' + index} onChange={e => handleChanges(e.target.value, 'old_code', index)} value={value.old_code} className="form-control border-0" type="text" list={'#vd_002' + index} />
                                            <datalist id={'#vd_002' + index} key={'#vd_002' + index}>
                                                {
                                                    vendeurList.map((vendeur, s_index) => {
                                                        return <option key={('#vd_0002' + s_index)} value={vendeur.old_code}>{vendeur.old_code}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#vd_03' + index} onChange={e => handleChanges(e.target.value, 'new_code', index)} value={value.new_code} className="form-control border-0" type="text" list={'#vd_003' + index} />
                                            <datalist id={'#vd_003' + index} key={'#vd_003' + index}>
                                                {
                                                    vendeurList.map((vendeur, s_index) => {
                                                        return <option key={('#vd_0003' + s_index)} value={vendeur.new_code}>{vendeur.new_code}</option>
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input key={'#vd_04' + index} onChange={e => handleChanges(e.target.value, 'new_nom', index)} value={value.new_nom} className="form-control border-0" type="text" list={'#vd_004' + index} />
                                            <datalist id={'#vd_004' + index} key={'#vd_004' + index}>
                                                {
                                                    vendeurList.map((vendeur, s_index) => {
                                                        return <option key={('#vd_0004' + s_index)} value={vendeur.new_nom}>{vendeur.new_nom}</option>
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
