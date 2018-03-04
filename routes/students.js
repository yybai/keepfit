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
router.post('/update/weight/:id/:weight',(req,res,next)=>{
  var uid = req.params.id;
  var uweight = req.params.weight;
  Students.update({_id:uid},{$set:{weight:uweight}},err=>{
    if(err){
      res.send(err)
    }else{
      res.json({ result: 'success' })
    }
  })
})

//handle delete daily total from database
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