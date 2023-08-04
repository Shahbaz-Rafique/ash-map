const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const e = require('express');

router.get('/',(req,res,next)=>{
    const uid=req.query.uuid;
    connection.query(`SELECT Id from admin where uuid='${uid}'`,(err,result)=>{
        if (err) throw err;
        else{
            if(result.length!=0){
                const responseData = { message:"valid" };
                res.status(200).json(responseData);
            }
            else{
                const responseData = { message:"invalid" };
                res.status(200).json(responseData);   
            }
        }
    })
})
module.exports = router;