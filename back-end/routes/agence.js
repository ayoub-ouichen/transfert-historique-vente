const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.get('/getAgences', (req, res) => {
  connection.query('SELECT database_id as id,name FROM sys.databases', (err, result) => {
      if (err) console.log(err);
      else res.send(result.recordset);
  });
});

router.post('/getSecteur', async (req,res)=>{
  
  const agence_src = req.body.source_id;
  const agence_dst = req.body.destination_id;
  
  try {
    let request = new connection.Request();
    request.input('param1', connection.VarChar, '');

    let result = await request.query('SELECT code_secteur as old_code_secteur , nom_secteur as old_nom_secteur FROM ' + agence_src + '.dbo.T_SECTEUR WHERE len(nom_secteur) >= 3 AND code_secteur <> 0 AND (nom_secteur is not null AND code_secteur is not null);');
    const oldSecteur = result.recordset;

    let result2 = await request.query('SELECT code_secteur as new_code_secteur , nom_secteur as new_nom_secteur FROM ' + agence_dst + '.dbo.T_SECTEUR WHERE len(nom_secteur) >= 3 AND code_secteur <> 0 AND (nom_secteur is not null AND code_secteur is not null);');
    const newSecteur = result2.recordset;
    
    if ( result.recordset.length != 0 || result2.recordset.length != 0 ) {
        return res.status(200).json({old_secteurs: oldSecteur, new_secteurs: newSecteur});
    } else {
        return res.status(500).json({ success: false, message: 'Une erreur s° est produite' });
    }
  }
  catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;


