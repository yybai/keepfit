const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const passport = require('passport');


// var userList = [];
// function remove(array,element){
//   return array.filter(e => e !== element);
// }


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  

  
  res.redirect('/profile');
  
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  Students.register(new Students({ username : req.body.username ,firstname:req.body.firstname,
                                  lastname:req.body.lastname, email:req.body.email,
                                  age:req.body.age,gender:req.body.gender,
                                height:req.body.height,weight:req.body.weight,
                               
                               }), req.body.password, (err, student) => {
    if (err) {
      return(err)
    }else{
      passport.authenticate('local')(req, res, () => {
        

        res.redirect('/profile');
      });
    }
  });
});

//delete user
router.post('/delete', (req, res, next) => {
  Students.remove({ _id: req.body.uid }, err => {
    if (err){
      res.send(err)
    }
    else{
      res.json({ result: 'success' })
    }
  })
})


router.get('/logout', (req, res) => {


  req.logout();

  res.redirect('/'); 
});



module.exports = router