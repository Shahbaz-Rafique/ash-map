const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    connection.query(`SELECT * from pins`,(err,result)=>{
        if (err) throw err;
        else{
            res.send(result);
        }
    })
})
module.exports = router;