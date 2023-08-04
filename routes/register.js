const express=require('express');
const router=express.Router();
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const {connection}=require('../database/sql');
const {transporter}=require('../nodemailer/mailer');

  function verificationcode() {
    const min = 100000;
    const max = 999999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/',(request,response)=>{
    const name=request.query.name;
    const email=request.query.email;
    const role=request.query.role;
    const password=crypto.createHash('sha256').update(request.query.password).digest('hex');
    const uuid=uuidv4();
    const verificationCode=verificationcode().toString();
    const code=crypto.createHash('sha256').update(verificationCode).digest('hex') 

    const data={
      name:name,
      email:email,
      password:password,
      uuid:uuid,
      verify:"unverified",
      role:role,
      status:"not-approved",
    }
    connection.query(`SELECT Id from users where email='${email}'`,(err,resl)=>{
      if(err) throw err;
      else{
        if(resl.length==0){
          connection.query('INSERT INTO users SET ?',data,(err,res)=>{
          if (err) throw err;
          else{
              const mailOptions = {
                  from: `MAP <shahbazrafique122@gmail.com>`,
                  to: email,
                  subject: 'Welcome to MAP - Confirm Your Registration',
                  html: `<p>Dear ${name}!</p><p>Thank you for registering on our website! We're excited to have you on board and look forward to providing you with the best possible experience. You Verification Code is <br/> <center><h1>${verificationCode}</h1></center>`,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      const responseData = { message: 'incorrect email', data: "none"};
                      response.status(200).json(responseData);
                  } else {
                      const responseData = { message: 'Registration successful', email: email, code:code };
                      response.status(200).json(responseData);
                  }
                }); 
              }
            })
          }
          else{
            const responseData = { message: 'email already' };
            response.status(200).json(responseData);
          }
        }
    })
})
module.exports=router;