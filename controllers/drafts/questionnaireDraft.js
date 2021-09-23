const returnRecommendedPhones = async (req, res) => {

    const questionnaire = new Questionnaire.Questionnaire(req.body);
   
     const questionMoney = questionnaire.questionMoney;
     const neededRAM = Questionnaire.questionGamesToQuery(questionnaire.questionGames);
   
   console.log("Needed RAM: "+neededRAM); 
   
   Device.findOne({
    price: {$lt: questionMoney},
     ram: {$gte: neededRAM}}) 
     .then(result =>{
     res.send(result);
   })
   .catch(err => {
     console.log(err);
   }); 
   
   
}
module.exports = {
    returnRecommendedPhones,
};
