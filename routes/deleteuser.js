const express=require('express');
const router=express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,response)=>{
    const id=req.query.id;
    connection.query(`DELETE from users where id=${id}`,(err,resl)=>{
        if(err) throw err;
        else{
            const responseData = { message: 'deleted'};
            response.status(200).json(responseData);
        }
    })
})
module.exports=router;