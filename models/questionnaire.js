
/* In this file we define our schemas, which are a description of the structure of the document */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;//We instantiate a Schema with the constructor function

const questionnaireSchema = new Schema({

  questionMoney: {
    type: Number,
    required: true,
  },

  questionBrandLike: {
    type: String,
    required: true,
  },

  questionBrandDislike: {
    type: String,
    required: true,
  },

  questionWork: {
    type: Boolean,
    required: true,
  },

  questionGames: {
    type: String,
    required: true,
  },

  questionBlueooth: {
    type: String,
    required: true,
  },

  questionVideos: {
    type: String,
    required: true,
  },

  questionPictures: {
    type: String,
    required: true,
  },

  questionDualSIM: {
    type: Boolean,
    required: true,
  },

  questionExtraFeatures: {
    type: String,
    required: true,
  },

  customerID:{
    type:String,
    required: true
  },
}, { timestamps: true });//we add a timestamp for each new record of this schema (optional)



/* We will now create a model that is based on this schema. A model defines an interface in order to communicate with
the type of documents defined by the schema. Note that the name of the model has normally a capital letter first,
and it must be the singular of the collection's name in order for mongoose to look up the collection automatically */

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

const greet = function(myString){
  console.log(myString);
}

const questionGamesToQuery = function(answer){
  let neededRAM = 2;
  if (answer === "ManyGames"){
    neededRAM = 6;
  }
  if (answer === "SomeGames"){
    neededRAM = 4;
  }
  if (answer === "NoGames"){
    neededRAM = 1;
  }
  return neededRAM;
}

module.exports = {Questionnaire, greet, questionGamesToQuery};
