
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

  questionBluetooth: {
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

  questionLightweight:{
    type: Boolean,
    required:true
  },

  questionFaceRecognition:{
    type: Boolean,
    required: true
  },

  questionFingerprints:{
    type: Boolean,
    required: true
  },

  customerID:{
    type:String,
    required: true
  },
}, { timestamps: true });//we add a timestamp for each new record of this schema (optional)




/* This method creates a new object that calls all the methods below in order to use this object for the MongoDB-query */

questionnaireSchema.methods.mapToHardware = function(){

  let queryPrice = this.questionMoney;
  let queryBrandLike = this.questionBrandLike;
  let queryBrandDislike = this.questionBrandDislike;
  let queryRAM = Math.max(questionGamesToRAM(this.questionGames), questionVideosToRAM(this.questionVideos));
  let queryFaceRecognition = this.questionFaceRecognition;
  let queryFingerprint = this.questionFingerprints;
  let queryCameraMP = questionsPicturesToMP(this.questionPictures);
  let queryDualSIM = this.questionDualSIM;
  //let queryBluetoothVersion = 5.0;
  let queryBluetoothVersion = questionBluetooth(this.questionBlueooth);
  let queryBatteryHours = Math.max(questionVideosToBattery(this.questionVideos), questionWorkBattery(this.questionWork));
  let queryWeight = questionLightweight(this.questionLightweight);


  let neededHardware = new NeededHardware(queryPrice, queryBrandLike, queryBrandDislike, queryRAM, 
    queryFaceRecognition, queryFingerprint, queryCameraMP, queryDualSIM, queryBluetoothVersion, queryBatteryHours, queryWeight);
  return neededHardware;
}
/* We will now create a model that is based on this schema. A model defines an interface in order to communicate with
the type of documents defined by the schema. Note that the name of the model has normally a capital letter first,
and it must be the singular of the collection's name in order for mongoose to look up the collection automatically */

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);


/* Here are the initial algorithm methods (will be improved) */


function questionGamesToRAM(answer){

  let neededRAM = 2;
  if (answer === "ManyGames"){
    neededRAM = 6;
  }
  if (answer === "SomeGames"){
    neededRAM = 4;
  }
  return neededRAM;

}

function questionWorkBattery(workAnswer){
  let batteryHours = 25;
  if (workAnswer){ //workAnswer is boolean
    batteryHours = 33;
  }
  return batteryHours;
}


function questionBluetooth(btQuestion){
  let btVersion = 5;
  if (btQuestion === "Never" || btQuestion ==="DontKnow"){
    btVersion = 4;
  }
  return btVersion;
}


function questionVideosToRAM(videoQuestion){
  let ram = 2;
  if(videoQuestion==="EveryDay"){
    ram = 6;
  } 
  if(videoQuestion==="Occasionally"){
    ram = 4;
  }
  return ram;
}

function questionVideosToBattery(videoQuestion){
  let batteryHours = 20;
  if(videoQuestion==="EveryDay"){
    batteryHours = 33;
  } 
  if(videoQuestion==="Occasionally"){
    batteryHours = 28;
  }
  return batteryHours;
}


function questionsPicturesToMP(pictureQuestion){
  let camera_MP = 3;
  if(pictureQuestion = "Professional"){
    camera_MP = 12;
  }
  if(pictureQuestion = "VeryGood"){
    camera_MP = 10;
  }
  if(pictureQuestion = "Good"){
    camera_MP = 6;
  }
  return camera_MP;
}


function dualSIMquestion(dualSIMquestion){
  return dualSIMquestion;
}


function questionLightweight(lightweightNeeded){
  let weight = 250;
  if(lightweightNeeded){
    weight = 175;
  }
  return weight;
}



class NeededHardware{
  queryPrice;
  queryBrandLike;
  queryBrandDislike;
  queryRAM;
  queryFaceRecognition;
  queryFingerprint;
  queryCameraMP;
  queryDualSIM;
  queryBluetoothVersion;
  queryBatteryHours;
  queryWeight;
  //queryIsUsed = false;

  constructor(queryPrice, queryBrandLike, queryBrandDislike, queryRAM, queryFaceRecognition, queryFingerprint, queryCameraMP, queryDualSIM, queryBluetoothVersion, queryBatteryHours, queryWeight){
    this.queryPrice = queryPrice;
    this.queryBrandLike = queryBrandLike;
    this.queryBrandDislike = queryBrandDislike;
    this.queryRAM = queryRAM;
    this.queryFaceRecognition = queryFaceRecognition;
    this.queryFingerprint = queryFingerprint;
    this.queryCameraMP = queryCameraMP;
    this.queryDualSIM = queryDualSIM;
    this.queryBluetoothVersion = queryBluetoothVersion;
    this.queryBatteryHours = queryBatteryHours;
    this.queryWeight = queryWeight;
  }
}


module.exports = {Questionnaire, questionGamesToRAM, questionVideosToRAM, NeededHardware, };
