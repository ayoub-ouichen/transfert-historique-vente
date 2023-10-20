import React from 'react'

export default function Header() {
    // add this function to store
    function handleSelectClick(value, index) {
        let parametresCopy = parametres
        parametresCopy[index] = value
        setParametres(parametresCopy)
        index === 'source_id' ? getOldSecteur() : getNewSecteur()
    }

  return (
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
                    <option key={1112} value={''}>--- Vide ---</option>
                    {
                        db_destination.map(db_dst => {
                            return <option key={db_dst.id} value={db_dst.name}>{db_dst.name}</option>
                        })
                    }
                </select>
            </div>
        </div>
    </div>
  )
}
