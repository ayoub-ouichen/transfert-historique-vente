const express = require('express');
const connection = require('../connection');
const router = express.Router();

const request = new connection.Request();

router.get('/getDatabases', (req, res) => {
  connection.query('SELECT database_id as id,name FROM sys.databases', (err, result) => {
      if (err) console.log(err);
      else res.send(result.recordset);
  });
});

// Get Secteurs
router.post('/getSecteur', async (req,res)=>{
  
  const agence_src = req.body.source_id;
  const agence_dst = req.body.destination_id;
  
  try {
    //let request = new connection.Request();

    let result = await request.query('SELECT code_secteur as old_code , nom_secteur as old_nom FROM ' + agence_src + '.dbo.T_SECTEUR WHERE len(nom_secteur) >= 3 AND code_secteur <> 0 AND (nom_secteur is not null AND code_secteur is not null);');
    const oldSecteur = result.recordset;

    let result2 = await request.query('SELECT code_secteur as new_code , nom_secteur as new_nom FROM ' + agence_dst + '.dbo.T_SECTEUR WHERE len(nom_secteur) >= 3 AND code_secteur <> 0 AND (nom_secteur is not null AND code_secteur is not null);');
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

// Get Vendeurs
router.post('/getVendeur', async (req,res)=>{
  
  const agence_src = req.body.source_id;
  const agence_dst = req.body.destination_id;
  
  try {
    //let request = new connection.Request();

    let result = agence_src === '' ? {recordset:[]} : await request.query('SELECT code_operateur as old_code , nom_operateur as old_nom FROM ' + agence_src + '.dbo.T_OPERATEUR WHERE len(nom_operateur) >= 3 AND code_operateur <> 0 AND (nom_operateur is not null AND code_operateur is not null) AND fonction in(1,2,4,5);');
    const oldVendeur =  result.recordset;

    let result2 = agence_dst === '' ? {recordset:[]} : await request.query('SELECT code_operateur as new_code , nom_operateur as new_nom FROM ' + agence_dst + '.dbo.T_OPERATEUR WHERE len(nom_operateur) >= 3 AND code_operateur <> 0 AND (nom_operateur is not null AND code_operateur is not null) AND fonction in(1,2,4,5);');
    const newVendeur = result2.recordset;
    
    if ( result.recordset.length != 0 || result2.recordset.length != 0 ) {
        return res.status(200).json({old_vendeurs: oldVendeur, new_vendeurs: newVendeur});
    } else {
        return res.status(500).json({ success: false, message: 'Une erreur s° est produite' });
    }
  }
  catch (error) {
    console.log(error);
    //return res.status(200).json({ success: false, message: error });
  }
});

// Get Superviseurs
router.post('/getSuperviseur', async (req,res)=>{
  
  const agence_src = req.body.source_id;
  const agence_dst = req.body.destination_id;
  
  try {
    //let request = new connection.Request();

    let result = agence_src === '' ? {recordset:[]} : await request.query('SELECT code_operateur as old_code , nom_operateur as old_nom FROM ' + agence_src + '.dbo.T_OPERATEUR WHERE len(nom_operateur) >= 3 AND code_operateur <> 0 AND (nom_operateur is not null AND code_operateur is not null) AND fonction = 8;');
    const oldSuperviseur =  result.recordset;

    let result2 = agence_dst === '' ? {recordset:[]} : await request.query('SELECT code_operateur as new_code , nom_operateur as new_nom FROM ' + agence_dst + '.dbo.T_OPERATEUR WHERE len(nom_operateur) >= 3 AND code_operateur <> 0 AND (nom_operateur is not null AND code_operateur is not null) AND fonction = 8;');
    const newSuperviseur = result2.recordset;
    
    if ( result.recordset.length != 0 || result2.recordset.length != 0 ) {
        return res.status(200).json({old_superviseurs: oldSuperviseur, new_superviseurs: newSuperviseur});
    } else {
        return res.status(500).json({ success: false, message: 'Une erreur s° est produite' });
    }
  }
  catch (error) {
    console.log(error);
    //return res.status(200).json({ success: false, message: error });
  }
});

module.exports = router;


