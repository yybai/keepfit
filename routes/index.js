const express = require('express');
const router = express.Router();
const Students = require('../models/students');




router.get('/', (req, res) => {
  res.render('login')

})



module.exports = router;