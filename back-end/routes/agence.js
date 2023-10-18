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

    let result = await request.query('SELECT code_secteur, nom_secteur FROM ' + agence_src + '.dbo.T_SECTEUR;');
    const oldSecteur = result.recordset;

    let result2 = await request.query('SELECT code_secteur, nom_secteur FROM ' + agence_dst + '.dbo.T_SECTEUR;');
    const newSecteur = result2.recordset;

    if ( result.recordset != 0 ) {
      return res.status(200).json({secteurs: oldSecteur});
    } else{
      if (result2.recordset != 0 ) {
        return res.status(200).json({secteurs: newSecteur});
      } else {
        return res.status(500).json({ success: false, message: 'Une erreur s° est produite' });
      }
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;


