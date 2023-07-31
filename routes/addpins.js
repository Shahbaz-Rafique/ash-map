const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
var multer=require('multer');

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/uploads/");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
  })
  
  var upload = multer({ storage });

router.post('/',upload.single("pinimage"),(req,res,next)=>{
    var x=req.query.xcor; 
    var y=req.query.ycor;
    var label=req.body.label;
    var pintype=req.query.type;
    var post=req.body.post;
    var location=req.body.location;
    let color="";
    if(pintype=="Future Time Lab"){
        color="#C0C0C0";
    }
    else if(pintype=="Future Space Lab"){
        color="#000080";
    }
    else if(pintype=="Future Movement Lab"){
        color="#8B0000";
    }
    else if(pintype=="Future Body Lab"){
        color="#FFFFFF";
    }
    else if(pintype=="Future Image Lab"){
        color="#800080";
    }
    else if(pintype=="Future Cosmos Lab"){
        color="#008000";
    }
    else if(pintype=="Future Thought Lab"){
        color="#FFD700";
    }
    else if(pintype=="Future Illusion Lab"){
        color="#40E0D0";
    }
    else if(pintype=="Future Machine Lab"){
        color="#000000";
    }
    else if(pintype=="Future Power Lab"){
        color="#FF00FF";
    }
    else if(pintype=="Future Prophecy Lab"){
        color="#FFFF00";
    }
    else if(pintype=="Non-Future Lab"){
        color="#FFA500";
    }
    let data=null;
    if(req.file){
        data = {
            Xcord: x,
            Ycord:y,
            Label:label,
            pintype:pintype,
            color:color,
            image:req.file.filename,
            post:post,
            location:location,
        };
    }
    else{
        data = {
            Xcord: x,
            Ycord:y,
            Label:label,
            pintype:pintype,
            color:color,
            image:"",
            post:post,
            location:location,
        };
    }
    connection.query(`INSERT into pins set ?`,data,(err,result)=>{
        if (err) throw err;
        else{
            res.redirect(`https://ash-map.netlify.app/`);
        }
    })
  })
  module.exports = router;


