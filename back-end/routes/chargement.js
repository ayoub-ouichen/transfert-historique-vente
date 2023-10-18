const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/getData', async (req,res)=>{
  
  const agence_src = req.body.source_id;
  const agence_dst = req.body.destination_id;
  const date_debut = req.body.date_debut;
  const date_fin = req.body.date_fin;
  
  try {
    let request = new connection.Request();
    request.input('param1', connection.VarChar, agence_src);
    request.input('param2', connection.DateTime, date_debut);
    request.input('param3', connection.DateTime, date_fin);

    let result = await request.query('SELECT * FROM ' + agence_src + '.dbo.T_CHARGEMENT WHERE DATE_CHARGEMENT BETWEEN @param2 and @param3;');
    const chargement = result.recordset;
    const secteurs = [];
    const vendeurs = [];
    const superviseurs = [];

    let p = chargement.forEach((value, index, array) => {
      secteurs.indexOf(value.CODE_SECTEUR) != -1 ? '' : secteurs.push(value.CODE_SECTEUR) 
      vendeurs.indexOf(value.CODE_VENDEUR) != -1 ? '' : vendeurs.push(value.CODE_VENDEUR) 
      superviseurs.indexOf(value.CODE_SUPERVISEUR) != -1 ? '' : superviseurs.push(value.CODE_SUPERVISEUR) 
    })
    
    // Rchercher les noms des (Secteurs, Vendeurs, Superviseurs)
    let request2 = new connection.Request();
    let result2 = await request2.query('SELECT code_secteur,nom_secteur FROM ' + agence_src + '.dbo.T_SECTEUR WHERE code_secteur in(' + secteurs + ');');
    const nom_secteur = result2.recordset;
    console.log(nom_secteur);

    if (result.recordset != 0) {
      return res.status(200).json({secteur: secteurs, names: nom_secteur});
      //return res.status(200).json({message: 'Great'});
    }
    else{
        return res.status(500).json({ success: false, message: 'Une erreur s° est produite' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;


