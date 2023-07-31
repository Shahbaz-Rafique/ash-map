const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    connection.query(`SELECT COUNT(*) AS count,pintype,color,image,post from pins GROUP BY pintype`,(err,result)=>{
        if (err) throw err;
        else{
            res.send(result);
        }
    })
})
module.exports = router;