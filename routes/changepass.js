const express = require('express');
var router = express.Router();
const crypto = require('crypto');
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    const password=crypto.createHash('sha256').update(req.query.password).digest('hex');
    connection.query(`UPDATE admin SET password='${password}',email=${req.query.email} WHERE Id=1`,(err,result)=>{
        if (err) throw err;
        else{
            const responseData = { message:"updated" };
            res.status(200).json(responseData);
        }
    })
})
module.exports = router;