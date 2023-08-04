const express=require('express');
const router=express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,response)=>{
    const id=req.query.id;
    const uuid=req.query.uuid;
    connection.query(`SELECT role from users where uuid='${uuid}'`,(err,resl)=>{
        if(err) throw err;
        else{
            if(resl.length!=0){
                if(resl[0].role=="professor"){
                    connection.query(`DELETE from pins where Id=${id}`,(err,result)=>{
                        if(err) throw err;
                        else{
                            const responseData = { message: 'deleted'};
                            response.status(200).json(responseData);
                        }
                    })
                }
                else if(resl[0].role=="Student"){
                    connection.query(`SELECT uuid from pins where Id=${id}`,(err,resu)=>{
                        if(err) throw err;
                        else{
                            if(resu[0].uuid==uuid){
                                connection.query(`DELETE from pins where Id=${id}`,(err,result)=>{
                                    if(err) throw err;
                                    else{
                                        const responseData = { message: 'deleted'};
                                        response.status(200).json(responseData);
                                    }
                                })
                            }
                        }
                    })
                }
                else{
                    const responseData = { message: 'unauth'};
                    response.status(200).json(responseData);
                }
            }
            else{
                connection.query(`SELECT uuid from admin where Id=1`,(err,resu)=>{
                    if(err) throw err;
                    else{
                        if(resu[0].uuid==uuid){
                            connection.query(`DELETE from pins where Id=${id}`,(err,result)=>{
                                if(err) throw err;
                                else{
                                    const responseData = { message: 'deleted'};
                                    response.status(200).json(responseData);
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})
module.exports=router;