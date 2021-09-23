"use strict";
const multer = require("multer");
/* const upload = multer({dest: "./uploads/"}); */

const Questionnaire = require("../models/questionnaire");
const Device = require("../models/device");
const Recommendation = require("../models/recommendation");
const Questions = require("../models/question");



const getQuestions = async (req, res) => {
  try {
      let questions = await Questions.find({}).exec();

      return res.status(200).json(questions);
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          error: "Internal server error",
          message: err.message,
      });
  }
};



var result;
const getResponses = async (req, res, next) => {
  const { results } = req.body;

  try {
    result = req.body;
    console.log(req.body);
    /* return res.status(201).json(req.body);   */
    //toArray(result);
    //console.log(result);
    //return queryPhones(result);
    return res.status(200).json(result) && toArray(result);
  } catch (err) {
    next(err);
  }
};

var priority;
const getPriority = async (req, res, next) => {
  const { priorities } = req.body;

  try {
    priority = req.body;
    console.log(priority.mode);
    /* return res.status(201).json(req.body);   */
    //toArray(result);
    //console.log(result);
    //return queryPhones(result);
    return res.status(200).json(priority) && priorityToOutput(priority);
  } catch (err) {
    next(err);
  }
};

var prio = '';
function priorityToOutput(priority){
  //if priority is being changed
  prio = '';
  if(priority.mode === 'Price')
    prio += "\"price\": 1";
  if(priority.mode === 'Battery Life')
    prio += "\"batteryHours\": 1";
  if(priority.mode === 'Camera')
    prio += "\"camera_MP\": 1";
  if(priority.mode === 'Performance')
    prio += "\"cpuScore\": 1";
  

  if(priority === {} || priority === '')
  prio = '';
  
console.log(prio);
}

function toArray(query) {
/*   var newQuery = JSON.stringify(query);
  //console.log(query);
  /* newQuery =  newQuery.slice(0, 10) */
  /* newQuery =  newQuery.slice(newQuery.length-1) */
  //query = JSON.parse(query); 
  //console.log(query);
  /* newQuery =  newQuery.replace('{','');*/
  /* newQuery =  newQuery.replace('}','');*/
  /* newQuery =  newQuery.split(','); */

  /* console.log(newQuery.slice(13, newQuery.length - 1).replace('{','').replace('}','').split('')); */ 
 
  /* for(let i = 0; i < newQuery.length; i++) {
    console.log('we are already here'+newQuery[i])
  } */

 /* for(let i=0, j = 0; i<query.length; i++) {
    if(query[i] === '{')
      start = i
    if(query[i] === '}')
      end = i
    else{
      finalResult[j] = query.slice(start, end)
      j++
    }
  }  */ 
  /* for(let i = 0; i < finalResult.length; i++){
    console.log(finalResult[i])
  } */
  /* for(let i=0;i<query.results.length;i++){
    query.results.q[i]=i+1
  } */
  console.log(query)
  var output;
  if(query.results.length === 10){
    output = JSON.stringify(query);

    output = output.slice(11, output.length - 1).split(",{").join("").split("{").join("").split('"q":"About how much money would you like to spend on the phone ?","a":').join("").split('"q":"Are there some phone brands that you specially like ?","a":').join("").split('"q":"Are there some phone brands that you specially dislike ?","a":').join("").split('"q":"Will you use your phone for work ?","a":').join("").split('"q":"How much do you want to play games on your phone ?","a":').join("").split('"q":"Do you often connect devices via Bluetooth ?","a":').join("").split('"q":"How often do you plan to watch videos or movies on your phone (for example on YouTube or Netflix) ?","a":').join("")
    .split('"q":"How critical is the quality of the pictures which you will take with your phone camera?","a":').join("").split('"q":"Are you planning to have more than one phone number on the same phone (e.g. one work number, one personal number)?","a":').join("").split('"q":"Which of these features are really important for you ?","a":').join("").split('[').join('').split(']').join('').split("}").join(",").slice(0, -1).split('"').join('')
  }
  else{
    output = JSON.stringify(query)


    output = output.slice(11, output.length - 1).split(",{").join("").split("{").join("").split('"q":"Are there some phone brands that you specially like ?","a":').join("").split('"q":"How much do you want to play games on your phone ?","a":').join("").split('"q":"Do you often connect devices via Bluetooth ?","a":').join("").split('"q":"How critical is the quality of the pictures you will take with your phone camera?","a":').join("").split('"q":"Which of these features are really important for you ?","a":').join("").split('[').join('').split(']').join('').split("}").join(",").slice(0, -1).split('"').join('')
  }
 

output = output.split(',')

console.log('hier ist der output'+output);

return queryPhones(output);

}

var sort = "";
var query = "";
function queryPhones(result) {
  //reset both variables
  sort = "";
  query = "";

  //start String json form
  sort += "{";
  query += "{";
    console.log(result);
  if(result.length === 10){
    for (var i = 0; i < result.length; i++) {
      switch (i) {
        case 0:
          if(result[0] === 'Less than 200€')
            query += "\"price\": {\"$lte\": 200}" + ", " /* + '\n' */
          if(result[0] === 'Less than 400€')
            query += "\"price\": {\"$lte\": 400}" + ", " /* + '\n' */
          if(result[0] === 'Less than 600€')
            query += "\"price\": {\"$lte\": 600}" + ", " /* + '\n' */
            if(result[0] === 'More than 600€')
            query += "\"price\": {\"$gt\": 600}" + ", " /* + '\n' */
            break;
        case 1:
          if(result[1] === 'Apple')
            query += "\"brand\": {\"$eq\": \"Apple\"}" + ", " /* + '\n' */
          if(result[1] === 'Samsung')
            query += "\"brand\": {\"$eq\": \"Samsung\"}" + ", " /* + '\n' */
          if(result[1] === 'Blackberry')
            query += "\"brand\": {\"$eq\": \"Blackberry\"}" + ", " /* + '\n' */
          if(result[1] === 'Huawei')
            query  += "\"brand\": {\"$eq\": \"Huawei\"}" + ", " /* + '\n' */ 
          if(result[1] === 'Motorola')
            query += "\"brand\": {\"$eq\": \"Motorola\"}" + ", " /* + '\n' */
          if(result[1] === 'Sony Ericsson')
            query += "\"brand\": {\"$eq\": \"Sony Ericsson\"}" + ", " /* + '\n' */
          if(result[1] === 'Xiaomi')
            query += "\"brand\": {\"$eq\": \"Xiaomi\"}" + ", " /* + '\n' */
          if(result[1] === 'ZTE')
            query += "\"brand\": {\"$eq\": \"ZTE\"}" + ", " /* + '\n' */
          if(result[1] === 'Other') 
            query += "\"operatingSystem\": {\"$ne\": \"iOS\"}"+", " 
          break;
        case 2:
          if(result[2] === 'Apple')
            query += "\"brand\": {\"$ne\": \"Apple\"}" + ", " /* + '\n' */
          if(result[2] === 'Samsung')
            query += "\"brand\": {\"$ne\": \"Samsung\"}" + ", " /* + '\n' */
          if(result[2] === 'Blackberry')
            query += "\"brand\": {\"$ne\": \"Blackberry\"}" + ", " /* + '\n' */
          if(result[2] === 'Huawei')
            query  += "\"brand\": {\"$ne\": \"Huawei\"}" + ", "/* + '\n' */ 
          if(result[2] === 'Motorola')
            query += "\"brand\": {\"$ne\": \"Motorola\"}" + ", " /* + '\n' */
          if(result[2] === 'Sony Ericsson')
            query += "\"brand\": {\"$ne\": \"Sony Ericsson\"}" + ", " /* + '\n' */
          if(result[2] === 'Xiaomi')
            query += "\"brand\": {\"$ne\": \"Xiaomi\"}" + ", " /* + '\n' */
          if(result[2] === 'ZTE')
            query += "\"brand\": {\"$ne\": \"ZTE\"}" + ", " /* + '\n' */
          else
            /* query += '\"brand\": {\"$all\": \"Apple\", \"Samsung\", \"Blackberry\", \"Huawei\", \"Motorola\", \"Sony Ericsson\", \"Xiaomi\", \"ZTE\"}'+", "  */
          break;
        case 3:
          if(result[3] === 'Yes')
            sort += "\"batteryHours\":1, \"bluetoothVersion\":1"+", "
          else if(result[3] === 'No')
            sort += "\"batteryHours\":-1, \"bluetoothVersion\":-1"+", "
          break;
        case 4:
          if(result[4] === 'For many hours a day')
            sort += "\"batteryHours\":1, \"ram\":1, \"cpuScore\":1"+','
          if(result[4] === 'I want to play casually')
          sort += "\"batteryHours\":1, \"ram\":1"+", "
          //no Games at all
          else
          sort += "\"ram\":-1, \"cpuScore\":-1"+','
          break;
        case 5:
          if(result[5] === 'Yes often')
            sort += "\"bluetoothVersion\":1"+", "
          if(result[5] === 'I never turn on Bluetooth')
            sort += "\"bluetoothVersion\":-1"+", "
          if(result[5] === 'What  is Bluetooth ?')
            sort += "\"bluetoothVersion\":-1"+", "
          break;
        case 6:
          if(result[6] === 'I want to watch videos or movies every day')
            query += "\"batteryHours\": {\"$gte\": 30}"+", "/* +'\n' */
         if(result[6] === 'I occasionally want to watch videos or movies') 
            query += "\"batteryHours\": {\"$gte\": 25}"+", "/* +'\n' */
          if(result[6] === 'I almost never watch videos on my phone')
          sort += "\"batteryHours\":-1"+", "
          break;
        case 7:
          if(result[7] === 'I will use the pictures of my phone for professional purposes')
            query += "\"camera_MP\": {\"$gte\": 12}"+", "/* +'\n' */
          if(result[7] === 'I want to have a very good camera so I can upload and save high quality pictures')
            query += "\"camera_MP\": {\"$gte\": 10}"+", "/* +'\n' */
          if(result[7] === 'I want to have a good camera so I can share my pictures with my friends')
            query += "\"camera_MP\": {\"$gte\": 7}"+", "/* +'\n' */
          if(result[7] === 'I don’t care about camera quality')
            sort += "\"camera_MP\":-1"+", "
            break;
        case 8:
          if(result[8] === 'Yes')
            query += "\"dualSIM\": {\"$eq\": \"yes\"}"+", "/* +'\n' */
          if(result[8] === 'No')
            query += "\"dualSIM\": {\"$ne\": \"yes\"}"+", "/* +'\n' */
          break;
        case 9:
          if(result[9] === 'The phone should be extremely lightweight')
            sort += "\"weight\":-1"/* +',' */
          if(result[9] === 'The phone should be able to recognize my face')
            query += "\"faceRecognition\": {\"$eq\": \"yes\"}"/*+','+'\n' */
          if(result[9] === 'The phone should be able to recognize my fingerprints')
            query += "\"fingerprint\": {\"$eq\": \"yes\"}"/*+','+'\n' */
          break;
      }
    }
  }
  else{
    for (var i = 0; i < result.length; i++) {
      switch (i) {
        case 0:
          if(result[i] === 'Apple')
            query += "\"brand\": {\"$eq\": \"Apple\"}" + ", " /* + '\n' */
          if(result[i] === 'Samsung')
            query += "\"brand\": {\"$eq\": \"Samsung\"}" + ", " /* + '\n' */
          if(result[i] === 'Blackberry')
            query += "\"brand\": {\"$eq\": \"Blackberry\"}" + ", " /* + '\n' */
          if(result[i] === 'Huawei')
            query  += "\"brand\": {\"$eq\": \"Huawei\"}" + ", " /* + '\n' */ 
          if(result[i] === 'Motorola')
            query += "\"brand\": {\"$eq\": \"Motorola\"}" + ", " /* + '\n' */
          if(result[i] === 'Sony Ericsson')
            query += "\"brand\": {\"$eq\": \"Sony Ericsson\"}" + ", " /* + '\n' */
          if(result[i] === 'Xiaomi')
            query += "\"brand\": {\"$eq\": \"Xiaomi\"}" + ", " /* + '\n' */
          if(result[i] === 'ZTE')
            query += "\"brand\": {\"$eq\": \"ZTE\"}" + ", " /* + '\n' */
          if(result[i] === 'Other')
            /* query += "\"brand\": {\"$ne\": \"Apple\", \"$ne\": \"Samsung\", \"$ne\": \"Blackberry\", \"$ne\": \"Huawei\", \"$ne\": \"Motorola\", \"$ne\": \"Sony Ericsson\", \"$ne\": \"Xiaomi\", \"$ne\": \"ZTE\"}"+", " */
          break;
        case 1:
          if(result[i] === 'For many hours a day')
            sort += "\"batteryHours\":1, \"ram\":1, \"cpuScore\":1"+','
          if(result[i] === 'I want to play casually')
          sort += "\"batteryHours\":1, \"ram\":1"+", "
          //no Games at all
          else
          sort += "\"ram\":-1, \"cpuScore\":-1"+','
          break;
        case 2:
          if(result[i] === 'Yes often')
            sort += "\"bluetoothVersion\":1"+", "
          if(result[i] === 'I never turn on Bluetooth')
            sort += "\"bluetoothVersion\":-1"+", "
          if(result[i] === 'What  is Bluetooth ?')
            sort += "\"bluetoothVersion\":-1"+", "
          break;
        case 3:
          if(result[i] === 'I will use the pictures of my phone for professional purposes')
            query += "\"camera_MP\": {\"$gte\": 12}"+", "/* +'\n' */
          if(result[i] === 'I want to have a very good camera so I can upload and save high quality pictures')
            query += "\"camera_MP\": {\"$gte\": 10}"+", "/* +'\n' */
          if(result[i] === 'I want to have a good camera so I can share my pictures with my friends')
            query += "\"camera_MP\": {\"$gte\": 7}"+", "/* +'\n' */
          if(result[i] === 'I don’t care about camera quality')
            sort += "\"camera_MP\":-1"+", "
            break;
        case 4:
          if(result[i] === 'The phone should be extremely lightweight')
            sort += "\"weight\":-1"/* +',' */
          if(result[i] === 'The phone should be able to recognize my face')
            query += "\"faceRecognition\": {\"$eq\": \"yes\"}"/*+','+'\n' */
          if(result[i] === 'The phone should be able to recognize my fingerprints')
            query += "\"fingerprint\": {\"$eq\": \"yes\"}"/*+','+'\n' */
          break;
      }
    }
  }
if(sort.charAt(sort.length-1) === ',')
sort = sort.substring(0, sort.length - 1);
else if(prio != {} && prio != '' && prio != '{' && result.length === 10 && prio != '{}'){
    sort += ', '+prio;
  } 
/*
else{
    sort += ', '+prio;
  } */
sort = sort.split(", ,").join(",") 



  query += "}";
  sort += "}";
  /* var priority = result[10]; */

  /* query = JSON.stringify(query);
  sort = JSON.stringify(sort);  */
  /* console.log(query);
  console.log(sort); */
  
 /*  console.log(query); */
  //console.log(sort);

  /* query = query.split("'").join("").split('"').join('').split(', }').join('}'); */
  /* sort = sort.split("'").join("").split('"').join('').split(', }').join('}'); */

  /* query = query.split(', }').join('}'); */
  sort = sort.split(", }").join("}").split(",}").join("}").split("1, }").join("1 }");
  query = query.split(", }").join("}").split(",}").join("}");

  console.log('hier der error? '+sort);
  console.log('hier der error? '+query);
  /* query = query.substring(1, query.length-1);
  sort = sort.substring(1, sort.length-1); */

  /* query = JSON.stringify(query);
  sort = JSON.stringify(sort);  */

  /* query = JSON.parse(query); */

  //JSON format as prep for returnRecommendedPhones function call
  sort = JSON.parse(sort);
  query = JSON.parse(query);
  /* query = JSON.stringify(query); */
  /* query = query.replace("true", Boolean(true));
  query = query.replace("false", Boolean(false)); */
  /* query = query.replace("'","");
  query = JSON.parse(query);
 */
 /*  query = JSON.stringify(query)
  query = query.replace(/"/gi, " "); */
  /* str = JSON.parse(str); */

  console.log(query);
  console.log(sort);
  console.log('call async');
  /* returnRecommendedPhones(sort);   */
  /* console.log(query); */

}



const createAnswers = async (req, res) => {
  
  if (Object.keys(req.body).length === 0)
      return res.status(400).json({
          error: "Bad Request",
          message: "The request body is empty",
      });

  
  try {
      let answer = await Questions.create(req.body);

      return res.status(201).json(answer);
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          error: "Internal server error",
          message: err.message,
      });
  }
};

const returnRecommendedPhones = async (req, res) => {

  console.log(sort);
  /*  const questionnaire = new Questionnaire.Questionnaire(req.body);
 
   const questionMoney = questionnaire.questionMoney;
   const neededRAM = Questionnaire.questionGamesToQuery(questionnaire.questionGames);
 
 console.log("Needed RAM: "+neededRAM); */
 
 /* Device.findOne({
  price: {$lt: questionMoney},
   ram: {$gte: neededRAM}}) */
   /* .then(result =>{
   res.send(result);
 })
 .catch(err => {
   console.log(err);
 }); */
 
 
 /* if(priority === 'Battery Life')
   priority = 'batteryHours: -1'
 if(priority === 'Good Camera')
   priority = 'camera_MP: -1'
 if(priority === 'Low Price')
   priority = 'price: +1'  */
  /* const { query } = req.body; */
 /* try {  */
   /* let results = await Device.find({query}).limit(3).exec(); *//* .sort( { priority } ) */
 /*   let results = await Device.find({}).exec();
   console.log(results);
 } 
 catch (err) {
   console.log(err);
   return res.status(500).json({
       error: "Internal server error",
       message: err.message,
   });
 } 
 }; */
 
 
 
 /* const find = query;
 const sort = sort; */
 
 try {
  let devices; 
  //no priority selected
  /*  if(prio === '') */
  /* devices = await Device.find(query).sort(sort).limit(3).exec(); */
   //priority has been selected
   /* else */
   devices = await Device.find(query).sort(sort).limit(3).exec();
   //devices = JSON.parse(devices);
   console.log(devices);
   console.log('check'+sort);
   return res.status(200).json(devices);
 } catch (err) {
   console.log(err);
   return res.status(500).json({
       error: "Internal server error",
       message: err.message,
   });
 }
 };


module.exports = {
    returnRecommendedPhones,
    getQuestions,
    createAnswers,
   getResponses, 
   queryPhones,
   getPriority
};
