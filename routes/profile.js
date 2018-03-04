const express = require('express');
const router = express.Router();
const Users = require('../models/students');
const Calories = require('../models/calory');
var nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secureConnection:true,
    auth:{
        user:'leo.test.no.reply@gmail.com',
        pass:'1992taozi'
    }
})




router.get('/send/:uname/:email/:msg',function(req,res,next){
    var username = req.params.uname;
    var userEmail = req.params.email;
    var msg = req.params.msg;

    var options = {
        from :' "Keepfit Admin" <leo.test.no.reply@gmail.com> ',
        to :`"${username}" <${userEmail}>`,
        subject:'KEEPFIT REPLY',
        text:'reply',
        html:`<p>DO NOT REPLY</p><br><p>${msg}</p>`
    };
    mailTransport.sendMail(options,function(err,msg){
        if(err){
            console.log(err);

            res.redirect('/profile');
        }else{
            console.log(msg);
            
            res.redirect('/profile?stat=ok');
        }
    });
});



router.get('/', (req, res, next) => {


    if(req.user){
        if(req.user.username === "admin"){


            Users.find({},(err,allusers)=>{
                
                res.render('admin',{allusers,adm:req.user})
            })
    
    
        }else{

            var u = req.user.username;
            if(req.user.gender === "Female"){
                var result = 10 * req.user.weight + 6.25 * req.user.height - 5 * req.user.age - 161;
            }else{
                var result = 10 * req.user.weight + 6.25 * req.user.height - 5 * req.user.age + 5;
            }
            Calories.find({
                
                "user":u
                
    
    
            },(err,calories) =>{
                res.render('profile', { x: req.user,
                    calories,
                    result })
            })






        }
    } else {
        res.redirect('/user/login')
    }




});


router.get('/edit',(req,res,next) =>{
    res.render('edit',{x:req.user})
})








module.exports = router;