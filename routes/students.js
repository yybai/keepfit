const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const Calories = require('../models/calory');

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

router.post('/delete', (req, res, next) => {
  Calories.remove({ _id: req.body.tid }, err => {
    if (err){
      res.send(err)
    }
    else{
      res.json({ result: 'success' })
    }
  })
})

module.exports = router;