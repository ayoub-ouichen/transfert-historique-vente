const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/getVendeurSuperviseur', async (req,res)=>{
  
  const agence_src = req.body.params.source_id;
  const agence_dst = req.body.params.destination_id;
  const date_debut = req.body.params.date_debut;
  const date_fin = req.body.params.date_fin;
  const tableData = req.body.data
  
  try {
    let request = new connection.Request();
    request.input('param1', connection.VarChar, agence_src);
    request.input('param2', connection.DateTime, date_debut);
    request.input('param3', connection.DateTime, date_fin);

    let result1 = await request.query('SELECT * FROM ' + agence_src + '.dbo.T_CHARGEMENT WHERE code_secteur in(' + tableData.map(value => {return value.old_code} ) + ') AND DATE_CHARGEMENT BETWEEN @param2 and @param3;');
    let result2 = await request.query('SELECT * FROM ' + agence_dst + '.dbo.T_CHARGEMENT WHERE code_secteur in(' + tableData.map(value => {return value.new_code} ) + ') AND DATE_CHARGEMENT BETWEEN @param2 and @param3;');
    
    const chargement_src = result1.recordset;
    const chargement_dst = result2.recordset;
    const secteurs_src = [];
    const vendeurs_src = [];
    const superviseurs_src = [];
    const secteurs_dst = [];
    const vendeurs_dst = [];
    const superviseurs_dst = [];
    
    chargement_src.forEach((value, index, array) => {
      secteurs_src.indexOf(value.CODE_SECTEUR) != -1 ? '' : secteurs_src.push(value.CODE_SECTEUR) 
      vendeurs_src.indexOf(value.CODE_VENDEUR) != -1 ? '' : vendeurs_src.push(value.CODE_VENDEUR) 
      superviseurs_src.indexOf(value.CODE_SUPERVISEUR) != -1 ? '' : superviseurs_src.push(value.CODE_SUPERVISEUR) 
    })

    chargement_dst.forEach((value, index, array) => {
      secteurs_dst.indexOf(value.CODE_SECTEUR) != -1 ? '' : secteurs_dst.push(value.CODE_SECTEUR) 
      vendeurs_dst.indexOf(value.CODE_VENDEUR) != -1 ? '' : vendeurs_dst.push(value.CODE_VENDEUR) 
      superviseurs_dst.indexOf(value.CODE_SUPERVISEUR) != -1 ? '' : superviseurs_dst.push(value.CODE_SUPERVISEUR) 
    })
    
    if (chargement_src.length != 0 && chargement_dst.length != 0) {
      return res.status(200).json({src: {secteur: secteurs_src, vendeur: vendeurs_src, superviseur: superviseurs_src}, dst: {secteur: secteurs_dst, vendeur: vendeurs_dst, superviseur: superviseurs_dst}});
    }
    else{
        return res.status(500).json({ success: false, message: 'Une erreur s° est produite' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;


