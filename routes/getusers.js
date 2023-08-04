const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    connection.query(`SELECT * from users`,(err,result)=>{
        if (err) throw err;
        else{
            const responseData = { data:result };
            res.status(200).json(responseData);
        }
    })
})
module.exports = router;