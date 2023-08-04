const express=require('express');
const router=express.Router();
const {connection}=require('../database/sql');
const {transporter}=require('../nodemailer/mailer');

router.get('/',(req,response)=>{
    const id=req.query.id;
    const status=req.query.status;
    connection.query(`SELECT name,email from users where id=${id}`,(err,res)=>{
        if (err) throw err;
        else{
            connection.query(`UPDATE users SET status='approved' where id=${id}`,(err,resl)=>{
                if(err) throw err;
                else{
                    const mailOptions = {
                        from: `MAP ADMIN <shahbazrafique122@gmail.com>`,
                        to: res[0].email,
                        subject: `Your Account has been ${status}`,
                        html: `<p>Dear ${res[0].name}!</p><p>Thank you for registering on our website! We're excited to have you on board and look forward to providing you with the best possible experience. Your Account has been ${status}.</p>`,
                    };
                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err) throw err;
                        else {
                            const responseData = { message: 'done'};
                            response.status(200).json(responseData);
                        }
                      }); 
                    
                }
            })
        }
    })
})
module.exports=router;