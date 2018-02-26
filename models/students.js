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



  //想在Database每个用户里面存一个list，然后每天都可以往里面存卡路里值，最后我想实现的是，calory[0].createdAt = 2018/2/21 然后calory[0].calories = 516， calory[1]=2018/2/22 ………
  //之后我就可以在HTML里面展示出一周或者一个月来calory的变化
  //现在问题是，我这么写，然后user sign up的时候，我不知道如何给calory list数据，不知道怎么declare它，所以在HTML里都显示空的 而且calory.createdAt都是undefined
  calory:[
    {createdAt: { type: Date, default: new Date() }},
    {calories:Number}
  ],

  
  createdAt: { type: Date, default: new Date() },
  

  
  // createdAt: { type: Date, default: new Date() },
  // studentType: { type: String, enum:['international', 'domestic'] }
})

StudentsSchema.plugin(passportLocalMongoose);

const Students = mongoose.model('keepfitUsers', StudentsSchema);

module.exports = Students;