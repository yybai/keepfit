const express = require('express');
const router = express.Router();
const Students = require('../models/students');


//handle update student
router.post('/update/:id', (req, res, next) => {
  Students.update({_id:req.params.id}, { $set: req.body }, err =>{
    if(err){
      res.send(err)
    }
    else{
      res.redirect('/profile')
    }
  })
})



module.exports = router;