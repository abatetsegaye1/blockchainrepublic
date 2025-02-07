const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 70,
    trim: true,
    
  },
  cityName: {
    type: String,
    required: true,
    
  },
  zipCode: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
    
  },

 
 
});

const QuestionarieData = mongoose.model("questionaries", questionSchema);
module.exports = QuestionarieData;
