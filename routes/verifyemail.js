const express=require('express');
const router=express.Router();
const crypto = require('crypto');
const {connection}=require('../database/sql');
const {transporter}=require('../nodemailer/mailer');

router.get('/',(req,response)=>{
    const email=req.query.email;
    const code=req.query.verifycode;
    const vcode=crypto.createHash('sha256').update(req.query.code).digest('hex');

    if(code==vcode){
        connection.query(`UPDATE users SET verify='verified' where email='${email}'`,(err,res)=>{
            if (err) throw err;
            else{
                const mailOptions = {
                    from: `MAP <shahbazrafique122@gmail.com>`,
                    to: email,
                    subject: 'Your Email has been Verified',
                    html: `<p>Dear User!</p><p>Thank you for registering on our website! We're excited to have you on board and look forward to providing you with the best possible experience. Your email has been verified. We'll Inform you once admin approve your account.</p>`,
                };
                const mailOptions1 = {
                    from: `MAP <shahbazrafique122@gmail.com>`,
                    to: "shahbazrafique122@gmail.com",
                    subject: 'MAP Account Approval',
                    html: `<p>Dear Admin!</p><p>${email} created account on Map. To approve or disapprove visit admin panel.</p>`,
                };
    
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error");
                    } else {
                        transporter.sendMail(mailOptions1, (error, info) => {
                            if (error) {
                                console.log("error");
                            } else {
                                const responseData = { message: 'verify'};
                                response.status(200).json(responseData);
                            }
                          }); 
                    }
                  }); 
            }
        })
    }
    else{
        const responseData = { message: 'incorrect code'};
        response.status(200).json(responseData);
    }
})
module.exports=router;