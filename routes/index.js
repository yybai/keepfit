const express = require('express');
const router = express.Router();
const Students = require('../models/students');




router.get('/', (req, res) => {
  res.render('login')

})
router.get('/intro',(req,res) =>{
  res.render('intro')
})


module.exports = router;