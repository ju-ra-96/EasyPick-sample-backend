"use strict";

const multer = require("multer");
const upload = multer({dest: "./uploads/"});
const express = require("express");
const router = express.Router();

//const middlewares = require("../middlewares");
const QuestionnaireController = require("../controllers/questionnaire");

//We query the db --> we want to "get" phones we don't send anything
//req --> response
//router.post("/returnRecommendedPhones", upload.none(), QuestionnaireController.returnRecommendedPhones);

router.get("/returnPhones", QuestionnaireController.returnRecommendedPhones);

router.get("/getQuestions", QuestionnaireController.getQuestions);
/* router.post("/receiveAnswers", QuestionnaireController.receiveAnswers); */
router.post("/createAnswers", QuestionnaireController.createAnswers); 
router.post("/getPrio", QuestionnaireController.getPriority); 
router.post("/getAnswers", QuestionnaireController.getResponses);


module.exports = router;
