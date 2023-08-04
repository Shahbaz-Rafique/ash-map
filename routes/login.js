const express=require('express');
const router=express.Router();
const crypto = require('crypto');
const {connection}=require('../database/sql');

router.get('/',(request,response)=>{
    const email=request.query.email;
    const password=request.query.password;
    const hashcode=crypto.createHash('sha256').update(password).digest('hex') 
    
    connection.query(`SELECT * from users where email='${email}' and password='${hashcode}' and verify='verified' and status='approved'`,(err,res)=>{
        if (err) throw err;
        else{
            if(res.length==0){
                connection.query(`SELECT * from admin where email='${email}' and password='${hashcode}'`,(err,resu)=>{
                    if (err) throw err;
                    else{
                        if(resu.length==0){
                            const responseData = { message: 'incorrect'};
                            response.status(200).json(responseData);
                        }
                        else{
                            const responseData = { message: 'admin',sesh_n:Buffer.from(resu[0].name, 'utf-8').toString('hex'), sesh_e:Buffer.from(resu[0].email, 'utf-8').toString('hex'), sesh_u:Buffer.from(resu[0].uuid, 'utf-8').toString('hex')};
                            response.status(200).json(responseData);
                        }
                    }
                })
            }
            else{
                const responseData = { message: 'loggedin',sesh_n:Buffer.from(res[0].name, 'utf-8').toString('hex'), sesh_e:Buffer.from(res[0].email, 'utf-8').toString('hex'), sesh_u:Buffer.from(res[0].uuid, 'utf-8').toString('hex'),sesh_r:Buffer.from(res[0].role, 'utf-8').toString('hex')};
                response.status(200).json(responseData);
            }
        }
    })
})
module.exports=router;