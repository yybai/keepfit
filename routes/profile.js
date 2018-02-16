const express = require('express');
const router = express.Router();
const Students = require('../models/students');

// router.get('/', (req, res) => {
//   Students.find({}, (err, students) => {
//     res.render('index', { title: 'Welcome to Full-stack !', name: 'Michael', students })
//   });
// });


// router.get('/', (req, res) => {
//   res.render('profile')

// })
router.get('/', (req, res, next) => {

    

    if(req.user){
        if(req.user.gender === "Female"){
            var result = 10 * req.user.weight + 6.25 * req.user.height - 5 * req.user.age - 161;
        }else{
            var result = 10 * req.user.weight + 6.25 * req.user.height - 5 * req.user.age + 5;
        }
        res.render('profile', { x: req.user,

                                result })
    } else {
        res.redirect('/user/login')
    }

});


router.get('/edit',(req,res,next) =>{
    res.render('edit',{x:req.user})
})









module.exports = router;