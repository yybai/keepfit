const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const StudentsSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  age: Number,
  height: Number,
  weight:Number,
  gender:String,


  // calory:[
  //   {createdAt: { type: Date, default: new Date() }},
  //   {calories:Number}
  // ],

  
  createdAt: { type: Date, default: new Date() },
  

  
  // createdAt: { type: Date, default: new Date() },
  // studentType: { type: String, enum:['international', 'domestic'] }
})

StudentsSchema.plugin(passportLocalMongoose);

const Students = mongoose.model('keepfitUsers', StudentsSchema);

module.exports = Students;