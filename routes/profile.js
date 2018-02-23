const express = require('express');
const router = express.Router();
// const Students = require('../models/students');
const Calories = require('../models/calory');

router.get('/', (req, res, next) => {




    

    if(req.user){
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
        // console.log(req.user.calory)
        // res.render('profile', { x: req.user,
        //                         calories,
        //                         result })
    } else {
        res.redirect('/user/login')
    }

});


router.get('/edit',(req,res,next) =>{
    res.render('edit',{x:req.user})
})


router.post('/save',(req,res,next) =>{

})






module.exports = router;