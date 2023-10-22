import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDatabases, getDatabasesList, getDatabasesListStatus, getParameters, handleSelectClick } from '../featuers/dataFlowSlice'

export default function Header() {
    const databases = useSelector(getDatabasesList)
    const db_status = useSelector(getDatabasesListStatus)
    const dispatch = useDispatch()
    
    useEffect( () => {
        if (db_status === 'idle') {
            dispatch(fetchDatabases())
        }
        // return () => {
        // }
    }, [db_status, dispatch])


    return (
        <div className="row">
            <div className="col">
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Source : </label>
                    <select onChange={(e) => dispatch(handleSelectClick([e.target.value, 'source_id']))} className="form-select" id="inputGroupSelect01">
                        <option key={1111} value={''}>--- Vide ---</option>
                        {
                            databases.map((db_src, index) => {
                                return <option key={index} value={db_src.name}>{db_src.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="col">
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect02">Destination : </label>
                    <select onChange={(e) => dispatch(handleSelectClick([e.target.value, 'destination_id']))} className="form-select" id="inputGroupSelect02">
                        <option key={1112} value={''}>--- Vide ---</option>
                        {
                            databases.map((db_dst, index) => {
                                return <option key={index} value={db_dst.name}>{db_dst.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}
